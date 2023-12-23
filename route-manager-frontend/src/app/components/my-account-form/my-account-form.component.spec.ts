import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountFormComponent } from './my-account-form.component';

describe('HeaderComponent', () => {
  let component: MyAccountFormComponent;
  let fixture: ComponentFixture<MyAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
