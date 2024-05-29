import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Build } from 'src/app/shared/interfaces/build';
import { BuildService } from '../../service/build.service';
import { ChampionService } from '../../service/champion.service';
import { Champions } from 'src/app/shared/interfaces/champions';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-build',
  templateUrl: './search-build.component.html',
  styleUrls: ['./search-build.component.css']
})
export class SearchBuildComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<Build> = new MatTableDataSource();

  public searchInput = new FormControl('');
  public build: Build[] = [];
  public champions: Champions[] = [];
  public filteredChampions: Observable<string[]> = new Observable<string[]>();

  constructor(
    private buildService: BuildService,
    private championService: ChampionService,
  ) { }

  ngOnInit(): void {
    this.getAllChampions();
    this.filteredChampions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.dataSource.paginator = this.paginator;
  }

  searchBuild() {
    const value: string = this.searchInput.value || '';
    const selectedChampion = this.champions.find(champion => champion.name.toLowerCase() === value.toLowerCase());

    if (selectedChampion) {
      this.buildService.findByChampion(selectedChampion).subscribe({
        next: (builds) => {
          this.build = builds;
          this.dataSource.data = this.build as Build[];
          // Si hay paginación, resetea a la primera página después de cambiar los datos
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        },
        error: (error) => {
          console.error('Error fetching builds', error);
        }
      });
    } else {
      this.build = [];
      this.dataSource.data = [];
    }
  }

  getAllChampions() {
    this.championService.findAll().subscribe({
      next: (champions) => {
        this.champions = champions;
      },
      error: (error) => {
        console.error('Error fetching champions', error);
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.champions
      .map(champion => champion.name)
      .filter(name => name.toLowerCase().includes(filterValue));
  }
}
