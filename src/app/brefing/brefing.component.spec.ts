import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrefingComponent } from './brefing.component';

describe('BrefingComponent', () => {
  let component: BrefingComponent;
  let fixture: ComponentFixture<BrefingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrefingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
