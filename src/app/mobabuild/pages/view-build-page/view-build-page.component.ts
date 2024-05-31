import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/shared/interfaces/build';
import { BuildService } from '../../service/build.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Champions } from 'src/app/shared/interfaces/champions';
import { SpellSet } from 'src/app/shared/interfaces/spell';
import { ObjectD, ObjectSet } from 'src/app/shared/interfaces/object';
import { RuneSet } from 'src/app/shared/interfaces/rune';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-view-build-page',
  templateUrl: './view-build-page.component.html',
  styleUrls: ['./view-build-page.component.css']
})
export class ViewBuildPageComponent implements OnInit{
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


  public spellSet: SpellSet[] = [];
  public objectSet: ObjectSet[] = [];
  public ruenSet: RuneSet[] = [];

  constructor(
    private buildService: BuildService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.buildService.findById(id))
    ).subscribe((build) => {
      if(!build) return this.router.navigate(['/mobabuild/search_build'])

      this.build = build
      this.getData(this.build);
      this.takeLenghtRuneSet();
      this.initBuild();
      return;
    })

  }
  initBuild() {
    this.useRuneSet(0);
  }

  getData(build: Build) {
    debugger
    this.champion = build.champions
    this.spellSet = build.spellSets
    this.objectSet = build.objectSet
    this.ruenSet = build.runeSet
    this.firstObject = this.objectSet[0]
  }

  previousRune(){
    if(this.indexRuneSet >= 0){
      this.indexRuneSet -= 1
    } else {
      this.snackBar.open('Esta es la última runa', CLOSE, {
        duration: 3000
      });
    }
  }

  nextRune(){
    if(this.indexRuneSet < this.ruenSet.length - 1){
      this.indexRuneSet += 1
    } else {
      this.snackBar.open('Esta es la última runa', CLOSE, {
        duration: 3000
      });
    }
  }

  takeLenghtRuneSet(){
    const lenghtRune = this.ruenSet.length

    for(let i = 0; i < lenghtRune; i++){
      this.lenghtRuneSet.push(i)
    }
  }

  takeLenghtSpellSet(){
    this.lenghtSpellSet = this.spellSet.length
  }

  takeLenghtObjectSet(){
    this.lenghtObjectSet = this.objectSet.length
  }

  useRuneSet(pos: number){
    debugger
    this.usingRuneSet = this.ruenSet[pos]
    debugger
  }
}
