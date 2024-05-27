import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildService } from '../../service/build.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { firstValueFrom } from 'rxjs';
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

@Component({
  selector: 'app-add-build-page',
  templateUrl: './add-build-page.component.html',
  styleUrls: ['./add-build-page.component.css']
})
export class AddBuildPageComponent implements OnInit{
  buildForm: FormGroup = new FormGroup({});
  spellSetForm: FormGroup = new FormGroup({});
  objectSetForm: FormGroup = new FormGroup({});
  runeSetForm: FormGroup = new FormGroup({});


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
    private userService: UserService,
    private spellService: SpellService,
    private championService: ChampionService,
    private runeService: RuneService,
    private objectService: ObjectService,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
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

  filterMainRunes() {
    this.filterMainSubRunes();
    this.filterRune1();
    this.filterRune2();
    this.filterRune3();
    this.filterRune4();
  }

  filterSubRunes(){
    this.filterSubRune1();
    this.filterSubRune2();
    this.filterSubRune3();
  }

  filterMainSubRunes() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue = mainRuneControl.value;
      this.filteredMainSubRunes = this.rune0.filter(rune => rune.id !== mainRuneValue.id);
    }
  }

  filterRune1() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune1 = this.rune1.filter(rune => rune.rowType === "1" && rune.group_name === mainRuneValue.group_name);
    }
  }


  filterRune2() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune2 = this.rune2.filter(rune => rune.rowType === "2" && rune.group_name === mainRuneValue.group_name);
    }
  }

  filterRune3() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune3 = this.rune3.filter(rune => rune.rowType === "3" && rune.group_name === mainRuneValue.group_name);
    }
  }

  filterRune4() {
    const mainRuneControl = this.runeSetForm.get('mainRune');
    if (mainRuneControl !== null && mainRuneControl.value !== null) {
      const mainRuneValue: Rune = mainRuneControl.value;
      this.filteredRune4 = this.rune4.filter(rune => rune.rowType === "4" && rune.group_name === mainRuneValue.group_name);
    }
  }

  filterSubRune1() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune1 = this.rune2.filter(rune => rune.rowType === "2" && rune.group_name === mainSubRuneValue.group_name);
    }
  }

  filterSubRune2() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune2 = this.rune3.filter(rune => rune.rowType === "3" && rune.group_name === mainSubRuneValue.group_name);
    }
  }

  filterSubRune3() {
    const mainSubRuneControl = this.runeSetForm.get('mainSubRune');
    if (mainSubRuneControl !== null && mainSubRuneControl.value !== null) {
      const mainSubRuneValue: Rune = mainSubRuneControl.value;
      this.filteredSubRune3 = this.rune4.filter(rune => rune.rowType === "4" && rune.group_name === mainSubRuneValue.group_name);


    }
  }


  async getUser(): Promise<User> {
    return await firstValueFrom(this.userService.findById(1));
  }

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

  checkGroupName(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.name === rune.group_name) {
        this.rune0.push(rune);
      }
    });
  }

  checkRowType1(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "1") {
        this.rune1.push(rune);
      }
    });
  }
  checkRowType2(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "2") {
        this.rune2.push(rune);
      }
    });
  }
  checkRowType3(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "3") {
        this.rune3.push(rune);
      }
    });
  }
  checkRowType4(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.rowType === "4") {
        this.rune4.push(rune);

      }
    });
  }

  checkAdditionalAdvantages1(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "1") {
        this.additionalAdvantages1.push(rune);
      }
    });
  }

  checkAdditionalAdvantages2(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "2") {
        this.additionalAdvantages2.push(rune);
      }
    });
  }

  checkAdditionalAdvantages3(runes: Rune[]): void {
    runes.forEach(rune => {
      if (rune.group_name === "additional_advantages" && rune.rowType === "3") {
        this.additionalAdvantages3.push(rune);
      }
    });
  }


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

  onSubmit(): void {
    debugger
    console.log(this.buildForm.value);
    console.log(this.spellSetForm.value);
    console.log(this.objectSetForm.value);
    console.log(this.runeSetForm.value);

    if(this.buildFormValid() && this.spellSetFormValid() && this.objectSetFormValid() && this.runeSetFormValid()) {
      const newRuneSet: RuneSet = {
        id: null,
        name: this.runeSetForm.value.name,
        main_rune: this.runeSetForm.value.mainRune.id,
        main_sub_rune: this.runeSetForm.value.mainSubRune.id,
        secondary_rune: this.runeSetForm.value.secondaryRune1.id+','+this.runeSetForm.value.secondaryRune2.id+','+this.runeSetForm.value.secondaryRune3.id+','+this.runeSetForm.value.secondaryRune4.id,
        secondary_sub_rune: this.runeSetForm.value.secondarySubRune1.id+','+this.runeSetForm.value.secondarySubRune2.id+','+this.runeSetForm.value.secondarySubRune3.id,
        additional_advantages: this.runeSetForm.value.additionalAdvantages1.id+','+this.runeSetForm.value.additionalAdvantages2.id+','+this.runeSetForm.value.additionalAdvantages3.id,
        build: null,
      };
      console.log(newRuneSet);

      const newSpellSet: SpellSet = {
        id: null,
        name: this.spellSetForm.value.name,
        spells: this.spellSetForm.value.spells,
        build: null,
      }

      const newObjectSet: ObjectSet = {
        id: null,
        name: this.objectSetForm.value.name,
        objects: this.objectSetForm.value.objects,
        build: null,
      }


      if (newSpellSet as SpellSet && newObjectSet as ObjectSet && newRuneSet as RuneSet) {
        const newBuild: Build = {
          id: null,
          buildName: this.buildForm.value.buildName,
          user: this.buildForm.value.user,
          champions: this.buildForm.value.champions,
          spellSets: [newSpellSet],
          objectSet: [newObjectSet],
          runeSet: [newRuneSet]
        };

        if (newBuild as unknown as Build) {
          console.log(newBuild);
          this.buildService.create(newBuild).subscribe({
            next: (build) => {
              console.log(build);
            },
            error: (error) => {
              console.error('Error creating build', error);
            }
          })
          this.snackBar.open('Bien', CLOSE, {
            duration: 3000
          });
        }


      }

    }

  }

  buildFormValid(): boolean {
    if (!this.buildForm.valid) {
      console.error('Form is not valid');
      this.snackBar.open('La build no puede estar vacia.', CLOSE, {
        duration: 3000
      });
    }
    return this.buildForm.valid;
  }

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
      this.snackBar.open('El conjunto de hechizos no puede estar vacios.', CLOSE, {duration: 3000});
      return false;
    }
    return this.spellSetForm.valid;

  }

  objectSetFormValid(): boolean {
    if (!this.objectSetForm.valid) {
      console.error('Form is not valid');
      this.snackBar.open('El conjunto de objetos no puede estar vacia.', CLOSE, {
        duration: 3000
      });
    }
    return this.objectSetForm.valid;
  }

  runeSetFormValid(): boolean {
    if (!this.runeSetForm.valid) {
      console.error('Form is not valid');
      this.snackBar.open('Las runas no pueden estar vacias.', CLOSE, {
        duration: 3000
      });
    }
    return this.runeSetForm.valid;
  }

}
