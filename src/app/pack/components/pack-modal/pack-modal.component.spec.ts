import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackModalComponent } from './pack-modal.component';

describe('PackModalComponent', () => {
  let component: PackModalComponent;
  let fixture: ComponentFixture<PackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
