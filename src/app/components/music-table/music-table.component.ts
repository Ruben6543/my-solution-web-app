import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { Operation } from 'src/app/shared/operations/default-operations';
import { Music } from '../../models/music.types';
import { MusicService } from '../../services/music.service';
import { CreateEditComponent } from '../create-edit/create-edit.component';
import { DeleteElementComponent } from '../delete-element';

@Component({
  selector: 'app-music-table',
  standalone: true,
  imports: [
    MatPaginatorModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSortModule, 
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './music-table.component.html',
  styleUrls: ['./music-table.component.scss']
})

export class MusicTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'genre', 'actions'];
  musicList: MatTableDataSource<Music> = new MatTableDataSource<Music>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.musicList.sort = sort;
  }

  constructor(private _musicService : MusicService,
    private dialog:MatDialog,) 
  {
    this.musicList = new MatTableDataSource<Music>();
    
  }
  
  ngOnInit(): void 
  {
    this.fetchMusic();
  }

  fetchMusic(): void {
    this._musicService.getAllMusic().subscribe((musicList: Music[]) => {
      this.musicList.data = musicList;
    });
  }

  ngAfterViewInit() {
    this.musicList.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.musicList.filter = filterValue.trim().toLowerCase();

    if (this.musicList.paginator) {
      this.musicList.paginator.firstPage();
    }
  }
  createMusic(): void
  {
    const dialogCreate = this.dialog.open(CreateEditComponent, {
      width: '400px',
      height: '400px',
      data: {'operation': Operation.Create}
    });
        
    dialogCreate.afterClosed().pipe(
      map(() => {
          this.fetchMusic();
      })).subscribe();    
  }

  updateMusic(music: Music): void {
    const dialogCreate = this.dialog.open(CreateEditComponent, {
      width: '400px',
      height: '400px',
      data: {
        'id': music.id,
        'title': music.title,
        'genre': music.genre,
        'operation': Operation.Update
      }
    });
  
    dialogCreate.afterClosed().pipe(
      map(() => {
        this.fetchMusic();
      })).subscribe();
  }
  
  
  deleteMusic(id: number):void
  {
    const dialogCreate = this.dialog.open(DeleteElementComponent, {
      width: '300px',
      height: '200px',
      data: {
        'id': id,
      }
    });
  
    dialogCreate.afterClosed().pipe(
      map(() => {
        this.fetchMusic();
      })).subscribe();
  }
}
