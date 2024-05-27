import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Spell } from 'src/app/shared/interfaces/spell';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { CLOSE } from 'src/app/shared/interfaces/messages';
import { SpellService } from '../../services/spell.service';

@Component({
  selector: 'app-edit-spell',
  templateUrl: './edit-spell.component.html',
  styleUrls: ['./edit-spell.component.css']
})
export class EditSpellComponent implements OnInit{
  spellForm: FormGroup = new FormGroup({});

  /**
   * @xavivi8
   * @description inicializa el componente
   * @param {MatDialogRef<EditSpellComponent>} dialogRef
   * @param {SpellService} spellService
   * @param {MatSnackBar} snackBar
   * @param {Spell} spell
   */
  constructor(
    public dialogRef: MatDialogRef<EditSpellComponent>,
    private spellService: SpellService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public spell: Spell,
  ) { }

  ngOnInit(): void {
    this.spellForm = new FormGroup({
      id: new FormControl(this.spell.id, [Validators.required]),
      name: new FormControl(this.spell.name, [Validators.required]),
      champion_level: new FormControl(this.spell.champion_level, [Validators.required]),
      game_mode: new FormControl(this.spell.game_mode, [Validators.required]),
      description: new FormControl(this.spell.description, [Validators.required]),
      cooldown: new FormControl(this.spell.cooldown, [Validators.required]),
      image: new FormControl(this.spell.image),
      spellSets: new FormControl(this.spell.spellSets),
    })
  }

  /**
   * @xavivi8
   * @description actualiza el objeto
   */
  async confirmEdit() {
    try {
      if (this.spellForm.valid) {
        const newSpell = this.spellForm.value;
        const RESPONSE = await firstValueFrom(this.spellService.update(newSpell));
        if (RESPONSE && RESPONSE as Spell) {
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
   * @description cierra el componente
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });

  }
}
