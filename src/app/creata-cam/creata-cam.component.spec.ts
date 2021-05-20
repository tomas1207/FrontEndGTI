import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreataCamComponent } from './creata-cam.component';

describe('CreataCamComponent', () => {
  let component: CreataCamComponent;
  let fixture: ComponentFixture<CreataCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreataCamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreataCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
