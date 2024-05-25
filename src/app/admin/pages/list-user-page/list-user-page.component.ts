import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { firstValueFrom } from 'rxjs';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { DeleteUserComponent } from '../../components/delete-user/delete-user.component';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.css']
})
export class ListUserPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  idFilter = new FormControl();
  emailFilter = new FormControl();
  userNameFilter = new FormControl();
  authorities = new FormControl();

  displayedColumns: string[] = [];
  private filterValues = { id: 0, email: '', useName: '', authorities: ''};

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private overlay: Overlay,
    private router: Router,
    private matPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    const RESPONSE =  await firstValueFrom(this.userService.findAll());
    console.log(RESPONSE);

    if (RESPONSE) {
      RESPONSE.forEach((user: User) => {
        user.authorities = user.authorities || []; // Aseguramos que authorities sea un array
      });
      this.displayedColumns = ['id', 'email', 'user_name', 'authorities', 'actions'];
      this.dataSource = new MatTableDataSource(RESPONSE as User[]);
      console.log('RESPONSE:', RESPONSE);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  createFilter(): (user: any, filter: string) => boolean {
    const filterFunction = (user: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      return user.id.toString().indexOf(searchTerms.id) !== -1
        && user.email.toString().toLowerCase().indexOf(searchTerms.email) !== -1
        && user.userName.toString().toLowerCase().indexOf(searchTerms.useName) !== -1
    }
    return filterFunction;
  }

  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filterValues.id = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.emailFilter.valueChanges.subscribe((value) => {
      this.filterValues.email = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
    this.userNameFilter.valueChanges.subscribe((value) => {
      this.filterValues.useName = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  async addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(async (result: User) => {
      if (result) {
        // Comprueba que la respuesta es del tipo User
        if (result as User) {
          // Añade el nuevo usuario a la lista y actualiza la tabla
          this.dataSource.data.push(result);
          this.dataSource.data = [...this.dataSource.data]; // Trigger change detection
          this.getAllUsers();
        } else {
          console.error('La respuesta no es del tipo User', result);
        }
      }
    });
  }

  async editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllUsers();
      }
    });
  }

  /**
   * @xavivi8
   * @description abre el modal para eliminar un usuario
   * @param {User} user
   */
  async deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // Esperar hasta que se cierre el diálogo y obtener la respuesta
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.ok) {
        // Si la eliminación fue exitosa, recargar los datos
        await this.getAllUsers();
      }
    });
  }


  reloadPage(): void {
    location.reload();
  }
}
