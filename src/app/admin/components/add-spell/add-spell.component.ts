import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SpellService } from '../../services/spell.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';

@Component({
  selector: 'app-add-spell',
  templateUrl: './add-spell.component.html',
  styleUrls: ['./add-spell.component.css']
})
export class AddSpellComponent implements OnInit{
  spellForm: FormGroup = new FormGroup({});

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<AddSpellComponent>} dialogRef
   * @param {SpellService} spellService
   * @param {MatSnackBar} snackBar
   */
  constructor(
    public dialogRef: MatDialogRef<AddSpellComponent>,
    private spellService: SpellService,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @xavivi8
   * @description inicializa el formulario
   */
  ngOnInit(): void {
    this.spellForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      champion_level: new FormControl(null, [Validators.required]),
      game_mode: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      cooldown: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    })
  }

  /**
   * @xavivi8
   * @description añade el objeto
   */
  async confirmAdd() {
    try {
      debugger
      if (this.spellForm.valid) {
        const SPELL = this.spellForm.value;
        const RESPONSE = await firstValueFrom(this.spellService.create(SPELL));
        if (RESPONSE) {
          this.snackBar.open('El objeto se añadio correctamente.', CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE });
        } else {
          this.snackBar.open('No se pudo añadir el objeto.', CLOSE, { duration: 5000 });
        }
      }
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
      this.snackBar.open('Ocurrió un error al añadir el objeto.', CLOSE, { duration: 5000 });
    }
  };

  /**
   * @xavivi8
   * @description cierra el dialog
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
