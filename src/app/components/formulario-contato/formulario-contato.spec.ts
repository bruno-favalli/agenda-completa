import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContato } from './formulario-contato';

describe('FormularioContato', () => {
  let component: FormularioContato;
  let fixture: ComponentFixture<FormularioContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
