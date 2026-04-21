import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equipamentos } from './equipamentos';

describe('Equipamentos', () => {
  let component: Equipamentos;
  let fixture: ComponentFixture<Equipamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipamentos],
    }).compileComponents();

    fixture = TestBed.createComponent(Equipamentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
