import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rune } from 'src/app/shared/interfaces/rune';
import { RuneService } from '../../services/rune.service';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-list-rune-page',
  templateUrl: './list-rune-page.component.html',
  styleUrls: ['./list-rune-page.component.css']
})
export class ListRunePageComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<Rune> = new MatTableDataSource();

  idFilter = new FormControl();
  nameFilter = new FormControl();
  rowTypeFilter = new FormControl();
  groupNameFilter = new FormControl();
  descriptionFilter = new FormControl();
  longDescriptionFilter = new FormControl();
  imageFilter = new FormControl();

  hasData: boolean = false;

  displayedColumns: string[] = [];
  private filterValues = { id: 0, name: '', rowType: '', groupName: '', description: '', longDescription: ''};

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialog} dialog
   * @param {RuneService} runeService
   * @param {Overlay} overlay
   * @param {Router} router
   * @param {MatPaginatorIntl} matPaginatorIntl
   */
  constructor(
    public dialog: MatDialog,
    private runeService: RuneService,
    private overlay: Overlay,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {
    this.getAllRunes();
  }

  /**
   * @xavivi8
   * @description coge todas las runas
   */
  async getAllRunes() {
    const RESPONSE =await firstValueFrom(this.runeService.findAll());
    if (RESPONSE && RESPONSE.length > 0) {
      this.displayedColumns = ['id', 'name', 'rowType', 'groupName', 'description', 'longDescription', 'actions'];
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
   * @returns {Function}
   */
  createFilter(): (rune: any, filter: string) => boolean {
    const filterFunction = (rune: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return rune.id.toString().indexOf(searchTerms.id) !== -1
        && rune.name.toString().toLowerCase().indexOf(searchTerms.name) !== -1
        && rune.rowType.toString().indexOf(searchTerms.rowType) !== -1
        && rune.groupName.toString().indexOf(searchTerms.groupName) !== -1
        && rune.description.toString().indexOf(searchTerms.description) !== -1
        && rune.longDescription.toString().indexOf(searchTerms.longDescription) !== -1
    }
    return filterFunction;
  }

  /**
   * @xavivi8
   * @description crea el filtro de busqueda
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
    this.rowTypeFilter.valueChanges.subscribe((value) => {
      this.filterValues.rowType = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.groupNameFilter.valueChanges.subscribe((value) => {
      this.filterValues.groupName = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.descriptionFilter.valueChanges.subscribe((value) => {
      this.filterValues.description = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.longDescriptionFilter.valueChanges.subscribe((value) => {
      this.filterValues.longDescription = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  /**
   * @xavivi8
   * @description recarga la pagina
   */
  reloadPage(): void {
    location.reload();
  }
}
