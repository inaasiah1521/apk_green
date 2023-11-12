import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HLainnyaPage } from './h-lainnya.page';

describe('HLainnyaPage', () => {
  let component: HLainnyaPage;
  let fixture: ComponentFixture<HLainnyaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HLainnyaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
