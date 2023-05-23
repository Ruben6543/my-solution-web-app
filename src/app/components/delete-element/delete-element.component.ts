import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button'; 
import { MusicService } from 'src/app/services/music.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-element',
  standalone:true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './delete-element.component.html',
  styleUrls: ['./delete-element.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteElementComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteElementComponent>,
    private _musicService: MusicService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any, 
  )
  {

  }

  deleteMusic(){
    const snackbarConfig = new MatSnackBarConfig();

    this._musicService.deleteMusic(this.data.id).subscribe(
      () => {
        this._snackBar.open('Music Deleted!', '', snackbarConfig);
        this.dialogRef.close();
      },
      error => {
        this._snackBar.open(error, '', snackbarConfig);
      }
    );
  }

  closeForm(){
    this.dialogRef.close();
  }
}
