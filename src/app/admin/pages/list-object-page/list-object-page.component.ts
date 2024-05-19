import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';
import { firstValueFrom } from 'rxjs';
import { ObjectService } from '../../services/object.service';
import { ObjectD } from 'src/app/shared/interfaces/object';
import { DeleteObjectComponent } from '../../components/delete-object/delete-object.component';
import { AddObjectComponent } from '../../components/add-object/add-object.component';
import { EditObjectComponent } from '../../components/edit-object/edit-object.component';

@Component({
  selector: 'app-list-object-page',
  templateUrl: './list-object-page.component.html',
  styleUrls: ['./list-object-page.component.css']
})
export class ListObjectPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<ObjectD> = new MatTableDataSource();
  permises: Permises = { edit: false, delete: false, add: false };

  idFilter = new FormControl();
  nameFilter = new FormControl();
  objectSetsFilter = new FormControl();

  displayedColumns: string[] = [];
  private filterValues = { id: 0, name: '', objectSets: ''};


  constructor(
    public dialog: MatDialog,
    private objectService: ObjectService,
    private overlay: Overlay,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl // Agregar MatPaginatorIntl al constructor
  ) { }

  ngOnInit() {
    this.getAllObjects();
  }

  async getAllObjects() {
    const RESPONSE = await firstValueFrom(this.objectService.getAllObjects());
    if (RESPONSE) {
      this.displayedColumns = ['id', 'name', 'actions'];
      this.dataSource = new MatTableDataSource(RESPONSE as ObjectD[]);
      console.log('RESPONSE:', RESPONSE);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  createFilter(): (object: any, filter: string) => boolean {
    const filterFunction = (object: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return object.id.toString().indexOf(searchTerms.id) !== -1
        && object.name.toString().toLowerCase().indexOf(searchTerms.name) !== -1
        && object.objectSets.toString().toLowerCase().indexOf(searchTerms.objectSets) !== -1
    }
    return filterFunction;
  }

  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filterValues.id = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.nameFilter.valueChanges.subscribe((value) => {
      this.filterValues.name = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.objectSetsFilter.valueChanges.subscribe((value) => {
      this.filterValues.objectSets = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

  }

  async deleteObject(objectd: ObjectD) {
    const dialogRef = this.dialog.open(DeleteObjectComponent, {
      data: objectd,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // Esperar hasta que se cierre el diálogo y obtener la respuesta
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllObjects();
      }
    });
  }

  async addObject() {
    const dialogRef = this.dialog.open(AddObjectComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {

        const newObject = result.data;
        if (newObject) {
          // Si se recibió un objeto válido
          this.dataSource.data.push(newObject); // Agregar el objeto a los datos de la tabla
          this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
        }
      }
    });
  }

  async editObject(objectd: ObjectD) {
    const dialogRef = this.dialog.open(EditObjectComponent, {
      data: objectd,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result === 1) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllObjects();
      }
    });
  }


  /**
   * Recarga la página actual.
   * @returns {void}
   */
  reloadPage(): void {
    location.reload();
  }
}
