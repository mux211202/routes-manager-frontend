import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailsCardComponent } from './place-details-card.component';

describe('PlaceDetailsCardComponent', () => {
  let component: PlaceDetailsCardComponent;
  let fixture: ComponentFixture<PlaceDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceDetailsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
