import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesContato } from './detalhes-contato';

describe('DetalhesContato', () => {
  let component: DetalhesContato;
  let fixture: ComponentFixture<DetalhesContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
