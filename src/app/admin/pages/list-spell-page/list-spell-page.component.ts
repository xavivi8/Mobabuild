import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Spell } from 'src/app/shared/interfaces/spell';
import { SpellService } from '../../services/spell.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AddSpellComponent } from '../../components/add-spell/add-spell.component';
import { DeleteSpellComponent } from '../../components/delete-spell/delete-spell.component';
import { EditSpellComponent } from '../../components/edit-spell/edit-spell.component';

@Component({
  selector: 'app-list-spell-page',
  templateUrl: './list-spell-page.component.html',
  styleUrls: ['./list-spell-page.component.css']
})
export class ListSpellPageComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<Spell> = new MatTableDataSource();

  idFilter = new FormControl();
  nameFilter = new FormControl();
  champion_levelFilter = new FormControl();
  game_modeFilter = new FormControl();
  cooldownFilter = new FormControl();

  hasData: boolean = false;

  displayedColumns: string[] = [];
  private filterValues = { id: 0, name: '', champion_level: 0, game_mode: '', cooldown: ''};

  /**
   * @xavivi8
   * @description crea el constructor
   * @param {MatDialog} dialog
   * @param {SpellService} spellService
   * @param {Overlay} overlay
   * @param {Router} router
   * @param {MatPaginatorIntl} matPaginatorIntl
   */
  constructor(
    public dialog: MatDialog,
    private spellService: SpellService,
    private overlay: Overlay,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl
  ) { }

  /**
   * @xavivi8
   * @description inicializa el componente
   */
  ngOnInit(): void {
    this.getAllSpells();
  }

  /**
   * @xavivi8
   * @description obtiene todos los hechizos
   */
  async getAllSpells() {
    const RESPONSE =  await firstValueFrom(this.spellService.findAll());
    console.log(RESPONSE);

    if (RESPONSE && RESPONSE.length > 0) {
      this.displayedColumns = ['id', 'name','champion_level','game_mode','cooldown','actions'];
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
   * @returns {boolean}
   */
  createFilter(): (data: Spell, filter: string) => boolean {
    const filterFunction = (data: Spell, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return (
        data.id.toString().toLowerCase().includes(searchTerms.id.toString().toLowerCase()) &&
        data.name.toString().toLowerCase().includes(searchTerms.name.toString().toLowerCase()) &&
        data.champion_level.toString().toLowerCase().includes(searchTerms.champion_level.toString().toLowerCase()) &&
        data.game_mode.toString().toLowerCase().includes(searchTerms.game_mode.toString().toLowerCase()) &&
        data.cooldown.toString().toLowerCase().includes(searchTerms.cooldown.toString().toLowerCase())
      );
    };
    return filterFunction;
  }

  /**
   * @xavivi8
   * @description crea el filtro de busqueda
   */
  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
    this.nameFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
    this.champion_levelFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
    this.game_modeFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
    this.cooldownFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
  }

  /**
   * @xavivi8
   * @description abre el dialogo para anadir un hechizo
   */
  addSpell(){
    const dialogRef = this.dialog.open(AddSpellComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(async (result: Spell) => {
      if (result) {
        // Comprueba que la respuesta es del tipo User
        if (result as Spell) {
          // Añade el nuevo usuario a la lista y actualiza la tabla
          this.dataSource.data.push(result);
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
          this.getAllSpells();
        } else {
          console.error('La respuesta no es del tipo Champions', result);
        }
      }
    });
  }

  /**
   * @xavivi8
   * @description abre el dialogo para eliminar un hechizo
   * @param {Spell} spell
   */
  async deleteSpell(spell: Spell) {
    const dialogRef = this.dialog.open(DeleteSpellComponent, {
      data: spell,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // Esperar hasta que se cierre el diálogo y obtener la respuesta
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllSpells();
      }
    });
  }

  /**
   * @xavivi8
   * @description abre el dialogo para editar un hechizo
   * @param {Spell} spell
   */
  async editSpell(spell: Spell) {
    const dialogRef = this.dialog.open(EditSpellComponent, {
      data: spell,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllSpells();
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
