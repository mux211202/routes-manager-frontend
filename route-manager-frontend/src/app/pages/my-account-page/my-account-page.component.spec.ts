import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountPageComponent } from './my-account-page.component';

describe('MyRoutesPageComponent', () => {
  let component: MyAccountPageComponent;
  let fixture: ComponentFixture<MyAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
