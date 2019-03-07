import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthentifiedComponent } from './not-authentified.component';

describe('NotAuthentifiedComponent', () => {
  let component: NotAuthentifiedComponent;
  let fixture: ComponentFixture<NotAuthentifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAuthentifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthentifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
