import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertIuranPage } from './insert-iuran.page';

describe('InsertIuranPage', () => {
  let component: InsertIuranPage;
  let fixture: ComponentFixture<InsertIuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsertIuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
