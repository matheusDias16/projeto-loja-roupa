import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoupaComponent } from './create-roupa.component';

describe('CreateRoupaComponent', () => {
  let component: CreateRoupaComponent;
  let fixture: ComponentFixture<CreateRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoupaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
