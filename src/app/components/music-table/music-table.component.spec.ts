import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTableComponent } from './music-table.component';

describe('MusicTableComponent', () => {
  let component: MusicTableComponent;
  let fixture: ComponentFixture<MusicTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MusicTableComponent]
    });
    fixture = TestBed.createComponent(MusicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
