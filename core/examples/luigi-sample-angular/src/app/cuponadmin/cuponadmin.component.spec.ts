import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponadminComponent } from './cuponadmin.component';

describe('CuponadminComponent', () => {
  let component: CuponadminComponent;
  let fixture: ComponentFixture<CuponadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
