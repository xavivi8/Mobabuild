import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/shared/interfaces/build';
import { BuildService } from '../../service/build.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Champions } from 'src/app/shared/interfaces/champions';
import { SpellSet } from 'src/app/shared/interfaces/spell';
import { ObjectSet } from 'src/app/shared/interfaces/object';
import { RuneSet } from 'src/app/shared/interfaces/rune';

@Component({
  selector: 'app-view-build-page',
  templateUrl: './view-build-page.component.html',
  styleUrls: ['./view-build-page.component.css']
})
export class ViewBuildPageComponent implements OnInit{
  public build!: Build;
  public champion!: Champions;
  public spellSet: SpellSet[] = [];
  public objectSet: ObjectSet[] = [];
  public ruenSet: RuneSet[] = [];

  constructor(
    private buildService: BuildService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.buildService.findById(id))
    ).subscribe((build) => {
      if(!build) return this.router.navigate(['/mobabuild/search_build'])

      this.build = build
      this.getData(this.build);
      return;
    })

  }

  getData(build: Build) {
    this.champion = build.champions
    this.spellSet = build.spellSets
    this.objectSet = build.objectSet
    this.ruenSet = build.runeSet
  }
}
