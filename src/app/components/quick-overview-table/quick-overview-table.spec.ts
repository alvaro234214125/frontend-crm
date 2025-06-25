import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOverviewTableComponent } from './quick-overview-table.component';

describe('QuickOverviewTable', () => {
  let component: QuickOverviewTableComponent;
  let fixture: ComponentFixture<QuickOverviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickOverviewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
