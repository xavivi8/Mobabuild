import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Authority, User } from 'src/app/shared/interfaces/user';
import { AuthorityService } from '../../services/authority.service';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});
  authorityOptions: Authority[] = []
  selectedFile: File | null = null;
  fileBase64: string | ArrayBuffer | null = null;

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<EditUserComponent>} dialogRef
   * @param {UserService} userService
   * @param {AuthorityService} authoritySercice
   * @param {MatSnackBar} snackBar
   * @param {User} user
   */
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    private authoritySercice: AuthorityService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this,this.getAllAuthority();
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      user_name: new FormControl(this.user.user_name, [Validators.required]),
      pass: new FormControl(this.user.pass, [Validators.required]),
      image: new FormControl(this.user.image),
      favoriteBuild: new FormControl(this.user.favoriteBuild),
      builds: new FormControl(this.user.builds),
      authorities: new FormControl(this.user.authorities.map(auth => auth.name), [Validators.required]),
    })
  }

  /**
   * @xavivi8
   * @description selecciona el archivo
   * @param {any} event
   */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileBase64 = reader.result;
        this.userForm.patchValue({ image: this.fileBase64 });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /**
   * @xavivi8
   * @description obtiene todas las autoridades
   */
  getAllAuthority(){
    this.authoritySercice.findAll().subscribe((authority) => {
      this.authorityOptions = authority
    })
  }

  /**
   * @xavivi8
   * @description actualiza el usuario
   */
  async confirmEdit() {
    try {
      if (this.userForm.valid) {
        const newUser = this.userForm.value;
        if (this.fileBase64) {
          newUser.image = this.fileBase64.toString().split(',')[1]; // Solo la parte base64
        }
        const RESPONSE = await firstValueFrom(this.userService.updateUser(newUser));
        if (RESPONSE && RESPONSE as User) {
          this.snackBar.open('El objeto se actualizo correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo actualizar el objeto.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al actualizar el objeto:', error);
      this.snackBar.open('Ocurre un error al actualizar el objeto.', CLOSE, { duration: 5000 });
    }
  }

  /**
   * @xavivi8
   * @description cierra el dialog
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }

}
