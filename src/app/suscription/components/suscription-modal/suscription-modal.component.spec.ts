import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionModalComponent } from './suscription-modal.component';

describe('SuscriptionModalComponent', () => {
  let component: SuscriptionModalComponent;
  let fixture: ComponentFixture<SuscriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuscriptionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
