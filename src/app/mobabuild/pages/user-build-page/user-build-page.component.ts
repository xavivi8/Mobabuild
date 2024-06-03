import { Component, OnInit, ViewChild } from '@angular/core';
import { BuildService } from '../../service/build.service';
import { Build } from 'src/app/shared/interfaces/build';
import { User } from 'src/app/shared/interfaces/user';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-build-page',
  templateUrl: './user-build-page.component.html',
  styleUrls: ['./user-build-page.component.css']
})
export class UserBuildPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  builds: Build[] = [];
  public user: User = {
    id: 0,
    email: '',
    user_name: '',
    pass: '',
    image: "",
    builds: [],
    favoriteBuild: null,
    authorities: [],
  }

  idFilter = new FormControl();
  buildNameFilter = new FormControl();
  championsNameFilter = new FormControl();

  private filterValues = { id: 0, buildName: '', useNchampionsNameame: '' };
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Build> = new MatTableDataSource();

  constructor(
    private router: Router,
    private buildService: BuildService,
    private userService: UserService,
    private sharedService: SharedService,
  ) { }
  async ngOnInit(): Promise<void> {

    if (!this.isLogged()) {
      this.router.navigate(['/mobabuild/search_build']);
    } else {
      this.getAllBuilds();
    }


  }

  async getAllBuilds() {
    const RESPONSEUSER = await this.getUser();

    if (RESPONSEUSER) {
      this.user = RESPONSEUSER;
      const RESPONSEBUILD = await firstValueFrom(this.buildService.findByUser(RESPONSEUSER));

      if (RESPONSEBUILD) {

        this.displayedColumns = ['id', 'buildName', 'championsName', 'actions'];
        this.dataSource = new MatTableDataSource(RESPONSEBUILD as Build[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        this.onChanges();
      }

    }
  }


  /**
   * @xavivi8
   * @description obtiene el usuario por el id en el localStorage
   * @returns {Promise<User | null>}
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

  createFilter(): (build: any, filter: string) => boolean {
    const filterFunction = (build: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return build.id.toString().indexOf(searchTerms.id) !== -1
        && build.buildName.toString().toLowerCase().indexOf(searchTerms.buildName) !== -1
        && build.championsName.toString().toLowerCase().indexOf(searchTerms.championsName) !== -1
    }
    return filterFunction;
  }

  /**
   * @xavivi8
   * @description filtra los datos de la tabla
   */
  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filterValues.id = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.buildNameFilter.valueChanges.subscribe((value) => {
      this.filterValues.buildName = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.championsNameFilter.valueChanges.subscribe((value) => {
      this.filterValues.useNchampionsNameame = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  /**
   * @xavivi8
   * @description redirige al login
   * @returns {boolean}
   */
  isLogged(): boolean {
    return this.sharedService.isLoggedIn();
  }

}
