import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MusicTableComponent } from 'src/app/components';
import { MusicService } from 'src/app/services/music.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';




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
    HttpClientModule,
  ]
})
export class HomeModule { }
