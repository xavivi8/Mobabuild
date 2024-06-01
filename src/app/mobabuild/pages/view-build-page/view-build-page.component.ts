import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/shared/interfaces/build';
import { BuildService } from '../../service/build.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { Champions } from 'src/app/shared/interfaces/champions';
import { SpellSet } from 'src/app/shared/interfaces/spell';
import { ObjectD, ObjectSet } from 'src/app/shared/interfaces/object';
import { Rune, RuneSet } from 'src/app/shared/interfaces/rune';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { RuneService } from '../../service/rune.service';

@Component({
  selector: 'app-view-build-page',
  templateUrl: './view-build-page.component.html',
  styleUrls: ['./view-build-page.component.css']
})
export class ViewBuildPageComponent implements OnInit {
  public build!: Build;
  public firstObject: ObjectSet = {
    id: null,
    name: '',
    build: null,
    objects: [],
  }

  public lenghtRuneSet: number[] = [];
  public lenghtSpellSet: number = 0;
  public lenghtObjectSet: number = 0;

  public indexRuneSet: number = 0;
  public indexSpellSet: number = 0;
  public indexObjectSet: number = 0;

  public usingRuneSet: RuneSet = {
    id: null,
    name: 'No hay runas',
    main_rune: '',
    main_sub_rune: '',
    secondary_rune: '',
    secondary_sub_rune: '',
    additional_advantages: '',
    build: null
  };
  public usingSpellSet!: SpellSet;
  public usingObjectSet!: ObjectD;

  public champion!: Champions;

  public mainRune: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public rune1: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public rune2: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public rune3: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public rune4: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public mainSubRune: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public subRune1: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public subRune2: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public additionalAdvantages1: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public additionalAdvantages2: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public additionalAdvantages3: Rune = {
    id: -1,
    name: "",
    rowType: "",
    group_name: "",
    description: "",
    long_description: "",
    image: new ArrayBuffer(0),
  };

  public spellSet: SpellSet[] = [];
  public objectSet: ObjectSet[] = [];
  public ruenSet: RuneSet[] = [];

  constructor(
    private buildService: BuildService,
    private runeService: RuneService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.buildService.findById(id))
    ).subscribe((build) => {
      if (!build) return this.router.navigate(['/mobabuild/search_build'])

      this.build = build
      this.getData(this.build);
      this.takeLenghtRuneSet();
      this.takeLenghtSpellSet();
      this.takeLenghtObjectSet();
      this.initBuild();
      return;
    })

  }
  initBuild() {
    this.useRuneSet(0);
  }

  getData(build: Build) {
    this.champion = build.champions
    this.spellSet = build.spellSets
    this.objectSet = build.objectSet
    this.ruenSet = build.runeSet
    this.firstObject = this.objectSet[0]
  }

  /**
   * @xavivi8
   * @description coge la longitudad del array de RuneSet
   */
  takeLenghtRuneSet() {
    const lenghtRune = this.ruenSet.length

    for (let i = 0; i < lenghtRune; i++) {
      this.lenghtRuneSet.push(i)
    }
  }

  takeLenghtSpellSet() {
    this.lenghtSpellSet = this.spellSet.length
  }

  takeLenghtObjectSet() {
    this.lenghtObjectSet = this.objectSet.length
  }

  useRuneSet(pos: number) {
    this.usingRuneSet = this.ruenSet[pos]
    this.takeRunes();
  }

  /**
   * @xavivi8
   * @description Coge los Runes de la RuneSet
   */
  async takeRunes() {
    let idMainRune = parseInt(this.usingRuneSet.main_rune, 10);
    let idRune1 = parseInt(this.usingRuneSet.secondary_rune.split(",")[0], 10);
    let idRune2 = parseInt(this.usingRuneSet.secondary_rune.split(",")[1], 10);
    let idRune3 = parseInt(this.usingRuneSet.secondary_rune.split(",")[2], 10);
    let idRune4 = parseInt(this.usingRuneSet.secondary_rune.split(",")[3], 10);
    let idMainSubRune = parseInt(this.usingRuneSet.main_sub_rune, 10);
    let idSubRune1 = parseInt(this.usingRuneSet.secondary_sub_rune.split(",")[0], 10);
    let idSubRune2 = parseInt(this.usingRuneSet.secondary_sub_rune.split(",")[1], 10);
    let idAdditionalAdvantages1 = parseInt(this.usingRuneSet.additional_advantages.split(",")[0], 10);
    let idAdditionalAdvantages2 = parseInt(this.usingRuneSet.additional_advantages.split(",")[1], 10);
    let idAdditionalAdvantages3 = parseInt(this.usingRuneSet.additional_advantages.split(",")[2], 10);

    try {
      let main = await this.getRune(idMainRune);
      if (main as Rune) {
        this.mainRune = main;
      }
      let r1 = await this.getRune(idRune1)
      if ( r1 as Rune) {
        this.rune1 = r1;
      }
      let r2 = await this.getRune(idRune2)
      if ( r2 as Rune) {
        this.rune2 = r2;
      }
      let r3 = await this.getRune(idRune3)
      if ( r3 as Rune) {
        this.rune3 = r3;
      }
      let r4 = await this.getRune(idRune4)
      if ( r4 as Rune) {
        this.rune4 = r4;
      }
      let maunSub = await this.getRune(idMainSubRune)
      if ( maunSub as Rune) {
        this.mainSubRune = maunSub;
      }
      let s1 = await this.getRune(idSubRune1)
      if ( s1 as Rune) {
        this.subRune1 = s1;
      }
      let s2 = await this.getRune(idSubRune2)
      if ( s2 as Rune) {
        this.subRune2 = s2;
      }
      let a1 = await this.getRune(idAdditionalAdvantages1)
      if ( a1 as Rune) {
        this.additionalAdvantages1 = a1;
      }
      let a2 = await this.getRune(idAdditionalAdvantages2)
      if ( a2 as Rune) {
        this.additionalAdvantages2 = a2;
      }
      let a3 = await this.getRune(idAdditionalAdvantages3)
      if ( a3 as Rune) {
        this.additionalAdvantages3 = a3;
      }
    } catch (error) {
      console.error('Error fetching user', error);
    }
  }

  /**
   * @xavivi8
   * @description busca una runa por el id
   * @param {number} id id de la runa a buscar
   * @returns {Promise<Rune>} la runa a devolver
   */
  async getRune(id: number): Promise<Rune> {
    debugger
    return await firstValueFrom(this.runeService.findById(id));
  }
}
