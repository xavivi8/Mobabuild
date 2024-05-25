import { Component, Inject, OnInit } from '@angular/core';
import { Rune } from '../../../shared/interfaces/rune';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RuneService } from '../../services/rune.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-rune',
  templateUrl: './edit-rune.component.html',
  styleUrls: ['./edit-rune.component.css']
})
export class EditRuneComponent implements OnInit{
  runeForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<EditRuneComponent>,
    private runeService: RuneService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public rune: Rune,
  ) { }
  ngOnInit(): void {
    this.runeForm = new FormGroup({
      id: new FormControl(this.rune.id, [Validators.required]),
      name: new FormControl(this.rune.name, [Validators.required]),
      rowType: new FormControl(this.rune.rowType, [Validators.required]),
      groupName: new FormControl(this.rune.groupName, [Validators.required]),
      description: new FormControl(this.rune.description, [Validators.required]),
      longDescription: new FormControl(this.rune.longDescription, [Validators.required]),
      image: new FormControl(this.rune.image),
    });
  }
}
