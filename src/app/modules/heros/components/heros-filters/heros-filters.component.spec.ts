import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosFiltersComponent } from './heros-filters.component';

describe('HerosFiltersComponent', () => {
  let component: HerosFiltersComponent;
  let fixture: ComponentFixture<HerosFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
