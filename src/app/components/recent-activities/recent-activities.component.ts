import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogService, PageResponse } from '../../auth/activity-log.service';
import { ActivityLog } from '../../model/activity-log.model';

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activities.component.html',
})
export class RecentActivitiesComponent implements OnInit {
  activities: ActivityLog[] = [];
  page = 0;
  totalPages = 0;

  constructor(private activityLogService: ActivityLogService) {}

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.activityLogService.getRecentActivities(this.page, 4).subscribe({
      next: (res) => {
        this.activities = res.content;
        this.page = res.page;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error('Error loading activities', err)
    });
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchActivities();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchActivities();
    }
  }
}
