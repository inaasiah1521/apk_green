import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TahunanPage } from './tahunan.page';

describe('TahunanPage', () => {
  let component: TahunanPage;
  let fixture: ComponentFixture<TahunanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TahunanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
