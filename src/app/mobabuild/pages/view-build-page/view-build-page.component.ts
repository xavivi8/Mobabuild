import { Component, OnInit } from '@angular/core';
import { Build } from 'src/app/shared/interfaces/build';
import { BuildService } from '../../service/build.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-view-build-page',
  templateUrl: './view-build-page.component.html',
  styleUrls: ['./view-build-page.component.css']
})
export class ViewBuildPageComponent implements OnInit{
  public build!: Build;

  constructor(
    private buildService: BuildService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.buildService.findById(id))
    ).subscribe((build) => {
      if(!this.build) return this.router.navigate(['/mobabuild/search_build'])

      this.build = build
      return;
    })
  }
}
