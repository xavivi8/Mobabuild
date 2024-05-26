import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildService } from '../../service/build.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { firstValueFrom } from 'rxjs';
import { Spell } from 'src/app/shared/interfaces/spell';
import { Rune } from 'src/app/shared/interfaces/rune';
import { ObjectD } from 'src/app/shared/interfaces/object';
import { SpellService } from '../../service/spell.service';
import { Champions } from 'src/app/shared/interfaces/champions';
import { ChampionService } from '../../service/champion.service';

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
  rune: Rune[] = [];
  object: ObjectD[] = [];
  champions: Champions[] = [];

  constructor(
    private buildService: BuildService,
    private userService: UserService,
    private spellService: SpellService,
    private championService: ChampionService,
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
      name: new FormControl(null, [Validators.required]),
      spell: new FormControl(null, [Validators.required]),
    });

    this.objectSetForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      objects: new FormControl(null, [Validators.required]),
    });

    this.runeSetForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mainRune: new FormControl(null, [Validators.required]),
      mainSubRune: new FormControl(null, [Validators.required]),
      secondaryRune: new FormControl(null, [Validators.required]),
      secondarySubRune: new FormControl(null, [Validators.required]),
      additionalAdvantages: new FormControl(null, [Validators.required]),
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

  onSubmit(): void {
    if (this.buildForm.valid) {
      const buildData = this.buildForm.value;
      console.log('Build Data:', buildData);
      this.snackBar.open('Build data logged to console!', 'Close', {
        duration: 3000
      });
    } else {
      console.error('Form is not valid');
      this.snackBar.open('Form is not valid. Please check the inputs.', 'Close', {
        duration: 3000
      });
    }
  }
}
