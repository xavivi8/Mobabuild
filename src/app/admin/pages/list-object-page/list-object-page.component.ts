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

@Component({
  selector: 'app-list-object-page',
  templateUrl: './list-object-page.component.html',
  styles: [
  ]
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

}
