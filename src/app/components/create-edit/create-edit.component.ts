import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar'; 

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MusicService } from 'src/app/services/music.service';
import { CreateMusic, Music } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Operation } from 'src/app/shared/operations/default-operations';

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
   
})

export class CreateEditComponent {
  profileForm: FormGroup;
  OperationToDO :  string = "";
  MusicToUpdate: Music | null = null;
  FormTitle:string|null = null;
  TitleInput : string ="";
  GenreInput : string = "";

  constructor(private formBuilder: FormBuilder,
    private _musicService: MusicService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, 
    ) 
    {
      this.profileForm = this.formBuilder.group({
        title: '',
        genre: ''
      });

      this.profileForm = this.formBuilder.group({
        title: new FormControl('', [
          Validators.required, 
          Validators.maxLength(50), 
          Validators.minLength(3),
          Validators.pattern(/^$|^[a-zA-Z0-9_ ]*$/),
        ]),
        genre: new FormControl('', [
          Validators.required, 
          Validators.minLength(2),
          Validators.maxLength(10), 
          Validators.pattern(/^$|^[a-zA-Z0-9]+$/),
        ])
      });
    }

    ngOnInit(): void {
      if (this.data.operation == Operation.Create) {
        this.OperationToDO = "Create";
        this.FormTitle = "Add Music";
      } else if (this.data.operation == Operation.Update) {
        this.OperationToDO = "Update";
        this.FormTitle = "Update Music";
        this.TitleInput = this.data.title;
        this.GenreInput = this.data.genre;
      }
      else{
        
      }
    }

    saveMusicForm() {
      if (this.profileForm.invalid) {
        return;
      }
    
      const snackbarConfig = new MatSnackBarConfig();
      const formData = this.profileForm.value;
    
      snackbarConfig.duration = 5000;
      snackbarConfig.horizontalPosition = 'left';
      snackbarConfig.verticalPosition = 'bottom';
    
      if (this.OperationToDO === 'Create') 
      {
        const newMusic: CreateMusic = {
          title: formData.title,
          genre: formData.genre,
        }
    
        this._musicService.createMusic(newMusic).subscribe(
          () => {
            this._snackBar.open('Music created!', '', snackbarConfig);
            this.dialogRef.close();
          },
          error => {
            this._snackBar.open(error, '', snackbarConfig);
          }
        );
      } 
      else if (this.OperationToDO === 'Update') 
      {
        const updatedMusic: Music = {
          id: this.data.id,
          title: formData.title,
          genre: formData.genre,
        }
    
        this._musicService.updateMusic(updatedMusic).subscribe(
          () => {
            this._snackBar.open('Music updated!', '', snackbarConfig);
            this.dialogRef.close();
          },
          error => {
            this._snackBar.open(error, '', snackbarConfig);
          }
        );
      }
    }
    

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
}