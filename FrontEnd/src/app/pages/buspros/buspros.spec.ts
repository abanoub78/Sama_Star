import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buspros } from './buspros';

describe('Buspros', () => {
  let component: Buspros;
  let fixture: ComponentFixture<Buspros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buspros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buspros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
