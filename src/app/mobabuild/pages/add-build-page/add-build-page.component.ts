import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildService } from '../../service/build.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { firstValueFrom, tap } from 'rxjs';
import { Spell, SpellSet } from 'src/app/shared/interfaces/spell';
import { Rune, RuneSet } from 'src/app/shared/interfaces/rune';
import { ObjectD, ObjectSet } from 'src/app/shared/interfaces/object';
import { SpellService } from '../../service/spell.service';
import { Champions } from 'src/app/shared/interfaces/champions';
import { ChampionService } from '../../service/champion.service';
import { RuneService } from '../../service/rune.service';
import { ObjectService } from '../../service/object.service';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { Build } from 'src/app/shared/interfaces/build';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-add-build-page',
  templateUrl: './add-build-page.component.html',
  styleUrls: ['./add-build-page.component.css']
})
export class AddBuildPageComponent implements OnInit {
  buildForm: FormGroup = new FormGroup({});
  spellSetForm: FormGroup = new FormGroup({});
  objectSetForm: FormGroup = new FormGroup({});
  runeSetForm: FormGroup = new FormGroup({});

  runaVacia: Rune = {
    id: -1,
    name: 'Ninguna',
    rowType: '',
    group_name: '',
    description: '',
    long_description: '',
    image: "",
  };

  public mainRuneSelect: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public rune1Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public rune2Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public rune3Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public rune4Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public mainSubRuneSelect: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public subRune1Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public subRune2Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public subRune3Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public additionalAdvantages1Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public additionalAdvantages2Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  public additionalAdvantages3Select: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: "",
  };

  objectSet: ObjectSet[] = [];
  spellSet: SpellSet[] = [];
  runeSet: RuneSet[] = [];

  spells: Spell[] = [];
  runes: Rune[] = [];
  objects: ObjectD[] = [];
  champions: Champions[] = [];

  rune0: Rune[] = [];
  rune1: Rune[] = [];
  rune2: Rune[] = [];
  rune3: Rune[] = [];
  rune4: Rune[] = [];
  additionalAdvantages1: Rune[] = [];
  additionalAdvantages2: Rune[] = [];
  additionalAdvantages3: Rune[] = [];

  filteredMainSubRunes: Rune[] = [];

  filteredRune1: Rune[] = [];
  filteredRune2: Rune[] = [];
  filteredRune3: Rune[] = [];
  filteredRune4: Rune[] = [];

  filteredSubRune1: Rune[] = [];
  filteredSubRune2: Rune[] = [];
  filteredSubRune3: Rune[] = [];


  constructor(
    private fb: FormBuilder,
    private buildService: BuildService,
    private sharedService: SharedService,
    private userService: UserService,
    private spellService: SpellService,
    private championService: ChampionService,
    private runeService: RuneService,
    private objectService: ObjectService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  /**
   * @xavivi8
   * @description Carga los datos iniciales
   */
  async ngOnInit(): Promise<void> {
    if(!this.sharedService.isLoggedIn()){
      this.router.navigate(['/mobabuild/search_build']);
    }
    this.buildForm = new FormGroup({
      buildName: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required]),
      champions: new FormControl(null, [Validators.required]),
    });

    this.spellSetForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      spells: new FormControl(null, [Validators.required]),
    });

    this.objectSetForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      objects: new FormControl(null, [Validators.required]),
    });

    this.runeSetForm = this.fb.group({
      name: ['', Validators.required],
      mainRune: ['', Validators.required],
      mainSubRune: ['', Validators.required],
      secondaryRune1: ['', Validators.required],
      secondaryRune2: ['', Validators.required],
      secondaryRune3: ['', Validators.required],
      secondaryRune4: ['', Validators.required],
      secondarySubRune1: ['', Validators.required],
      secondarySubRune2: ['', Validators.required],
      secondarySubRune3: ['', Validators.required],
      additionalAdvantages1: ['', Validators.required],
      additionalAdvantages2: ['', Validators.required],
      additionalAdvantages3: ['', Validators.required]
    });




    // Obtener el usuario y asignarlo al formulario
    try {
      const user = await this.getUser();
      this.buildForm.patchValue({ user });
    } catch (error) {
      console.error('Error fetching user', error);
    }

    this.getAllChampions();
    this.getAllSpells();
    this.getAllSpells();
    this.getAllRune();
    this.getAllObjects();
  }

  /**
   * @xavivi8
   * @description envia el formulario y si todo esta correcto crea la build
   */
  onSubmit(): void {

    this.snackBar.open('Guardando...', CLOSE, {
      duration: -1, // Duración infinita, hasta que se cierre manualmente
    });

    if (this.buildFormValid() && this.spellSetFormValid() && this.objectSetFormValid() && this.runeSetFormValid()) {
      this.addRuneSet();
      this.addSpellSet();
      this.addObjectSet();


      if (this.spellSet.length > 0 && this.objectSet.length > 0 && this.runeSet.length > 0) {
        const newBuild: Build = {
          id: null,
          buildName: this.buildForm.value.buildName,
          user: this.buildForm.value.user,
          champions: this.buildForm.value.champions,
          spellSets: this.spellSet,
          objectSet: this.objectSet,
          runeSet: this.runeSet
        };

        if (newBuild as unknown as Build) {
          console.log(newBuild);
        this.buildService.create(newBuild).pipe(
          tap((build) => {
            console.log(build);
            // Cierre del mensaje de guardado
            this.snackBar.dismiss();
            // Mensaje de éxito
            this.snackBar.open('¡Guardado exitoso!', CLOSE, {
              duration: 3000
            });
            // Redireccionar después de completar la creación
            this.router.navigate(['/mobabuild/search_build']);
          })
        ).subscribe({
          error: (error) => {
            console.error('Error creating build', error);
            // Cierre del mensaje de guardado
            this.snackBar.dismiss();
            // Mensaje de error
            this.snackBar.open('Error al guardar la construcción', 'Cerrar', {
              duration: 3000
            });
            this.ngOnInit();
          }
        });
        }

      }

    }

  }

  /**
   * @xavivi8
   * @description Comprueba si el formulario es valido
   * @returns {boolean} true si el formulario es valido
   */
  buildFormValid(): boolean {
    if (!this.buildForm.valid) {
      console.error('Form is not valid');
      this.snackBar.open('La build no puede estar vacia.', CLOSE, {
        duration: 3000
      });
    }
    return this.buildForm.valid;
  }

  /**
   * @xavivi8
   * @description Comprueba si el conjunto de hechizos es valido
   * @returns {boolean} true si el conjunto de hechizos es valido
   */
  spellSetFormValid(): boolean {
    if (this.spellSetForm.valid) {
      const selectedSpells: Spell[] = this.spellSetForm.value.spells;
      console.log(selectedSpells);

      if (selectedSpells.length > 2) {
        console.error('Solo se pueden seleccionar hasta 2 hechizos.');
        this.snackBar.open('Solo se pueden seleccionar hasta 2 hechizos.', CLOSE, {
          duration: 3000
        });
        return false;
      }
    } else {
      this.snackBar.open('El conjunto de hechizos no puede estar vacios.', CLOSE, { duration: 3000 });
      return false;
    }
    return this.spellSetForm.valid;

  }

  /**
   * @xavivi8
   * @description Comprueba si el conjunto de objetos es valido
   * @returns {boolean} true si el conjunto de objetos es valido
   */
  objectSetFormValid(): boolean {
    if (this.objectSetForm.valid) {
      if (this.objectSetForm.value.objects.length > 6) {
        console.error('Solo se pueden seleccionar hasta 6 objetos.');
        this.snackBar.open('Solo se pueden seleccionar hasta 6 objetos.', CLOSE, {
          duration: 3000
        });
        return false;
      } else {
        this.snackBar.open('Conjunto de objetos añadidos.', CLOSE, {
          duration: 3000
        });
        return this.objectSetForm.valid;
      }
    } else {

      console.error('Form is not valid');
      this.snackBar.open('El conjunto de objetos no puede estar vacia.', CLOSE, {
        duration: 3000
      });
      return false;
    }
    return false;
  }

  /**
   * @xavivi8
   * @description Comprueba si el conjunto de runas es valido
   * @returns {boolean} true si el conjunto de runas es valido
   */
  runeSetFormValid(): boolean {
    if (this.runeSetForm.valid) {
      if (this.checkRunaVacia()) {

        return this.runeSetForm.valid;
      } else {
        this.snackBar.open('Hay que seleccionar dos runas secundarias y otra como Ninguna', CLOSE, {
          duration: 3000
        });
        return false
      }
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Las runas no pueden estar vacias.', CLOSE, {
        duration: 3000
      });
      return this.runeSetForm.valid;
    }

  }

  /**
   * @xavivi8
   * @description Comprueba si solo hay una runa vacia, sino esta mal y devolvera false
   * @returns {boolean} true si solo hay una runa vacia
   */
  checkRunaVacia(): boolean {
    const secondarySubRune1 = this.runeSetForm.get('secondarySubRune1')?.value;
    const secondarySubRune2 = this.runeSetForm.get('secondarySubRune2')?.value;
    const secondarySubRune3 = this.runeSetForm.get('secondarySubRune3')?.value;

    if (secondarySubRune1 === null || secondarySubRune2 === null || secondarySubRune3 === null) {
      // Si alguno de los valores es nulo, devolvemos false
      return false;
    }

    const runes = [secondarySubRune1, secondarySubRune2, secondarySubRune3];
    const runaVaciaCount = runes.filter(rune => rune.id === this.runaVacia.id).length;

    return runaVaciaCount === 1;
  }

  /**
   * @xavivi8
   * @description Anade un conjunto de ObjectSet a un array de ObjectSet
   */
  addObjectSet() {
    if (this.objectSetFormValid()) {
      const addObjectSet: ObjectSet = {
        id: null,
        name: this.objectSetForm.value.name,
        objects: this.objectSetForm.value.objects,
        build: null,
      }

      this.objectSet.push(addObjectSet);

      this.objectSetForm.reset({
        id: null,
        name: null,
        objects: null
      });
    }
  }

  /**
   * @xavivi8
   * @description añade un conjunto de SpellSet a un array de SpellSet
   */
  addSpellSet() {
    if (this.spellSetFormValid()) {
      const addSpellSet: SpellSet = {
        id: null,
        name: this.spellSetForm.value.name,
        spells: this.spellSetForm.value.spells,
        build: null,
      }

      this.spellSet.push(addSpellSet);
      this.spellSetForm.reset({
        id: null,
        name: null,
        spells: null
      });
    }
  }

  /**
   * @xavivi8
   * @description añade un objeto RunSet a un array de RunSet
   */
  addRuneSet() {
    if (this.runeSetFormValid()) {
      const addRuneSet: RuneSet = {
        id: null,
        name: this.runeSetForm.value.name,
        main_rune: this.runeSetForm.value.mainRune.id,
        main_sub_rune: this.runeSetForm.value.mainSubRune.id,
        secondary_rune: this.runeSetForm.value.secondaryRune1.id + ',' + this.runeSetForm.value.secondaryRune2.id + ',' + this.runeSetForm.value.secondaryRune3.id + ',' + this.runeSetForm.value.secondaryRune4.id,
        secondary_sub_rune: this.runeSetForm.value.secondarySubRune1.id + ',' + this.runeSetForm.value.secondarySubRune2.id + ',' + this.runeSetForm.value.secondarySubRune3.id,
        additional_advantages: this.runeSetForm.value.additionalAdvantages1.id + ',' + this.runeSetForm.value.additionalAdvantages2.id + ',' + this.runeSetForm.value.additionalAdvantages3.id,
        build: null,
      };

      this.runeSet.push(addRuneSet);
      this.runeSetForm.reset({
        id: null,
        name: null,
        mainRune: null,
        mainSubRune: null,
        secondaryRune1: null,
        secondaryRune2: null,
        secondaryRune3: null,
        secondaryRune4: null,
        secondarySubRune1: null,
        secondarySubRune2: null,
        secondarySubRune3: null,
        additionalAdvantages1: null,
        additionalAdvantages2: null,
        additionalAdvantages3: null
      });
    }
  }

  /**
   * @xavivi8
   * @description Filtra las runas principales haciendo que cuando seleccione el usuario una runa principal, las demás runas princupales sean del mismo grupo y la mainSubRune haga que no puede elegir el mismo tipo de runa
   */
  filterMainRunes() {
    this.mainRuneSelect = this.runeSetForm.get('mainRune')?.value;
    this.filterMainSubRunes();
    this.filterRune1();
    this.filterRune2();
    this.filterRune3();
    this.filterRune4();
  }

  takeRune1() {
    this.rune1Select = this.runeSetForm.get('secondaryRune1')?.value;
  }

  takeRune2() {
    this.rune2Select = this.runeSetForm.get('secondaryRune2')?.value;
  }

  takeRune3() {
    this.rune3Select = this.runeSetForm.get('secondaryRune3')?.value;
  }

  takeRune4() {
    this.rune4Select = this.runeSetForm.get('secondaryRune4')?.value;
  }

  takeAditionalAdvantages1() {
    this.additionalAdvantages1Select = this.runeSetForm.get('additionalAdvantages1')?.value;
  }

  takeAditionalAdvantages2() {
    this.additionalAdvantages2Select = this.runeSetForm.get('additionalAdvantages2')?.value;
  }

  takeAditionalAdvantages3() {
    this.additionalAdvantages3Select = this.runeSetForm.get('additionalAdvantages3')?.value;
  }

  /**
   * @xavivi8
   * @description Filtra las runas secundarias para que el usuario tenga que eleguir dos de las runas del mismo tipo y la otra marcarla como ninguno
   */
  filterSubRunes() {
    this.mainSubRuneSelect = this.runeSetForm.get('mainSubRune')?.value;
    this.filterSubRune1();
    this.checkAndAddRunaVacia1();
    this.filterSubRune2();
    this.checkAndAddRunaVacia2();
    this.filterSubRune3();
    this.checkAndAddRunaVacia3();
  }

  takeSubRune1() {
    this.subRune1Select = this.runeSetForm.get('secondarySubRune1')?.value;
  }

  takeSubRune2() {
    this.subRune2Select = this.runeSetForm.get('secondarySubRune2')?.value;
  }

  takeSubRune3() {
    this.subRune3Select = this.runeSetForm.get('secondarySubRune3')?.value;
  }

  filterMainSubRunes() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue = mainRuneControl.value;
      this.filteredMainSubRunes = this.rune0.filter(rune => rune.id !== mainRuneValue.id);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas principales 1
   */
  filterRune1() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune1 = this.rune1.filter(rune => rune.rowType === "1" && rune.group_name === mainRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas principales 2
   */
  filterRune2() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune2 = this.rune2.filter(rune => rune.rowType === "2" && rune.group_name === mainRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas principales 3
   */
  filterRune3() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune3 = this.rune3.filter(rune => rune.rowType === "3" && rune.group_name === mainRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas principales 4
   */
  filterRune4() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune4 = this.rune4.filter(rune => rune.rowType === "4" && rune.group_name === mainRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas secundarias 1
   */
  filterSubRune1() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune1 = this.rune2.filter(rune => rune.rowType === "2" && rune.group_name === mainSubRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas secundarias 2
   */
  filterSubRune2() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune2 = this.rune3.filter(rune => rune.rowType === "3" && rune.group_name === mainSubRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description filtra las runas secundarias 3
   */
  filterSubRune3() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune3 = this.rune4.filter(rune => rune.rowType === "4" && rune.group_name === mainSubRuneValue.group_name);
    }
  }

  /**
   * @xavivi8
   * @description comprueba que en las runas secundarias haya al menos una runa vacia
   */
  checkAndAddRunaVacia1() {
    debugger
    const exists = this.filteredSubRune1.some(rune => rune.id === this.runaVacia.id);
    if (!exists) {
      this.filteredSubRune1.push(this.runaVacia);
    }
  }

   /**
   * @xavivi8
   * @description comprueba que en las runas secundarias 2 haya al menos una runa vacia
   */
  checkAndAddRunaVacia2() {
    const exists = this.filteredSubRune2.some(rune => rune.id === this.runaVacia.id);
    if (!exists) {
      this.filteredSubRune2.push(this.runaVacia);
    }
  }

   /**
   * @xavivi8
   * @description comprueba que en las runas secundarias 3 haya al menos una runa vacia
   */
  checkAndAddRunaVacia3() {
    const exists = this.filteredSubRune3.some(rune => rune.id === this.runaVacia.id);
    if (!exists) {
      this.filteredSubRune3.push(this.runaVacia);
    }
  }


  /**
   * @xavivi8
   * @description coge el usuario
   * @returns {Promise<User | null>} devuelve el usuario
   */
  async getUser(): Promise<User | null> { // Cambiar el tipo de retorno a `Promise<User | null>`
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: User = JSON.parse(userString);
      try {
        return await firstValueFrom(this.userService.findById(user.id));
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        return null; // Manejar el caso de error devolviendo `null`
      }
    }
    return null; // Devuelve `null` si no hay usuario en `localStorage`
  }

  /**
   * @xavivi8
   * @description coge todos los objetos Spell
   */
  getAllSpells(): void {
    this.spellService.findAll().subscribe({
      next: (spell) => {
        this.spells = spell;
      },
      error: (error) => {
        console.error('Error fetching spells', error);
      }
    });
  }

  /**
   * @xavivi8
   * @description coge todos los objetos Champion
   */
  getAllChampions(): void {
    this.championService.findAll().subscribe({
      next: (champion) => {
        this.champions = champion;
      },
      error: (error) => {
        console.error('Error fetching spells', error);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que tengan el mismo group_name y rowType segun las reglas
   */
  getAllRune(): void {
    this.runeService.findAll().subscribe({
      next: (runes) => {
        this.runes = runes;
        this.checkGroupName(runes);
        this.checkRowType1(runes);
        this.checkRowType2(runes);
        this.checkRowType3(runes);
        this.checkRowType4(runes);
        this.checkAdditionalAdvantages1(runes);
        this.checkAdditionalAdvantages2(runes);
        this.checkAdditionalAdvantages3(runes);
      },
      error: (error) => {
        console.error('Error fetching spells', error);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que tengan el mismo group_name y name
   * @param {Rune[]} runes
   */
  checkGroupName(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.name === rune.group_name) {
        this.rune0.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 1
   * @param {Rune[]} runes
   */
  checkRowType1(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "1") {
        this.rune1.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 2
   * @param {Rune[]} runes
   */
  checkRowType2(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "2") {
        this.rune2.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 3
   * @param {Rune[]} runes
   */
  checkRowType3(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "3") {
        this.rune3.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 4
   * @param {Rune[]} runes
   */
  checkRowType4(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "4") {
        this.rune4.push(rune);

      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 1 y de la categoria "additional_advantages"
   * @param {Rune[]} runes
   */
  checkAdditionalAdvantages1(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "1") {
        this.additionalAdvantages1.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 2 y de la categoria "additional_advantages"
   * @param {Rune[]} runes
   */
  checkAdditionalAdvantages2(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "2") {
        this.additionalAdvantages2.push(rune);
      }
    });
  }

  /**
   * @xavivi8
   * @description filtra los objetos Rune y coger solo los que sean de tipo 3 y de la categoria "additional_advantages"
   * @param {Rune[]} runes
   */
  checkAdditionalAdvantages3(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "3") {
        this.additionalAdvantages3.push(rune);
      }
    });
  }


  /**
   * @xavivi8
   * @description obtiene todos los objetos
   */
  getAllObjects(): void {
    this.objectService.getAllObjects().subscribe({
      next: (object) => {
        this.objects = object;
      },
      error: (error) => {
        console.error('Error fetching spells', error);
      }
    });
  }
}
