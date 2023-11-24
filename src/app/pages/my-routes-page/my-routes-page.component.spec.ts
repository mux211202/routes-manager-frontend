import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoutesPageComponent } from './my-routes-page.component';

describe('MyRoutesPageComponent', () => {
  let component: MyRoutesPageComponent;
  let fixture: ComponentFixture<MyRoutesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRoutesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRoutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
