import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Champions } from 'src/app/shared/interfaces/champions';
import { ChampionService } from '../../services/champion.service';
import { firstValueFrom } from 'rxjs';
import { AddChampionComponent } from '../../components/add-champion/add-champion.component';
import { DeleteChampionComponent } from '../../components/delete-champion/delete-champion.component';
import { EditChampionComponent } from '../../components/edit-champion/edit-champion.component';

@Component({
  selector: 'app-list-champion-page',
  templateUrl: './list-champion-page.component.html',
  styleUrls: ['./list-champion-page.component.css']
})
export class ListChampionPageComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<Champions> = new MatTableDataSource();

  idFilter = new FormControl();
  nameFilter = new FormControl();
  buildsFilter = new FormControl();

  hasData: boolean = false;

  displayedColumns: string[] = [];
  private filterValues = { id: 0, name: ''};

  /**
   * @xavivi8
   * @description crea el constructor
   * @param {MatDialog} dialog
   * @param {ChampionService} championService
   * @param {Overlay} overlay
   * @param {Router} router
   * @param {MatPaginatorIntl} matPaginatorIntl
   */
  constructor(
    public dialog: MatDialog,
    private championService: ChampionService,
    private overlay: Overlay,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {
    this.getAllChampions();
  }

  /**
   * @xavivi8
   * @description obtiene todos los campeones
   */
  async getAllChampions() {
    const RESPONSE =  await firstValueFrom(this.championService.findAll());
    console.log(RESPONSE);

    if (RESPONSE && RESPONSE.length > 0) {
      this.displayedColumns = ['id', 'name', 'actions'];
      this.dataSource = new MatTableDataSource(RESPONSE);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
      this.hasData = true;
    } else {
      this.hasData = false;
    }

  }

  /**
   * @xavivi8
   * @description crea el filtro de busqueda
   * @returns {void}
   */
  createFilter(): (champion: any, filter: string) => boolean {
    const filterFunction = (champion: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return champion.id.toString().indexOf(searchTerms.id) !== -1
        && champion.name.toString().toLowerCase().indexOf(searchTerms.name) !== -1
    }
    return filterFunction;
  }

  /**
   * @xavivi8
   * @description cambia los valores de los filtros
   */
  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filterValues.id = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.nameFilter.valueChanges.subscribe((value) => {
      this.filterValues.name = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  /**
   * @xavivi8
   * @description abre el dialogo para anadir un nuevo campeon
   */
  async addChampion() {
    const dialogRef = this.dialog.open(AddChampionComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(async (result: Champions) => {
      if (result) {
        // Comprueba que la respuesta es del tipo User
        if (result as Champions) {
          // Añade el nuevo usuario a la lista y actualiza la tabla
          this.dataSource.data.push(result);
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
          this.getAllChampions();
        } else {
          console.error('La respuesta no es del tipo Champions', result);
        }
      }
    });
  }

  /**
   * @xavivi8
   * @description abre el dialogo para eliminar un campeon
   * @param {Champions} champion
   */
  async deleteChampion(champion: Champions) {
    const dialogRef = this.dialog.open(DeleteChampionComponent, {
      data: champion,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // Esperar hasta que se cierre el diálogo y obtener la respuesta
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllChampions();
      }
    });
  }

  /**
   * @xavivi8
   * @description abre el dialogo para editar un campeon
   * @param {Champions} champion
   */
  async editChampion(champion: Champions) {
    const dialogRef = this.dialog.open(EditChampionComponent, {
      data: champion,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllChampions();
      }
    });
  }

  /**
   * @xavivi8
   * @description recarga la pagina
   */
  reloadPage(): void {
    location.reload();
  }

}
