import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CreateEditComponent, MusicTableComponent } from 'src/app/components';
import { MusicService } from 'src/app/services/music.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  providers: [
    MusicService
  ],
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MusicTableComponent,
    //CreateEditComponent,
    HttpClientModule,
  ]
})
export class HomeModule { }
