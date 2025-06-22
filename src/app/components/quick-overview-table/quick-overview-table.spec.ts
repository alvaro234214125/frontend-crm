import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOverviewTable } from './quick-overview-table.component';

describe('QuickOverviewTable', () => {
  let component: QuickOverviewTable;
  let fixture: ComponentFixture<QuickOverviewTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickOverviewTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickOverviewTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
