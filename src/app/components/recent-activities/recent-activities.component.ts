import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent {
  activities = [
    { user: 'John Doe', action: 'añadió un nuevo producto', time: 'hace 2 horas' },
    { user: 'Anna Smith', action: 'completó una orden', time: 'hace 4 horas' },
    { user: 'Michael Brown', action: 'creó un nuevo cliente', time: 'Ayer' },
    { user: 'Lisa Ray', action: 'actualizó un producto', time: 'hace 2 días' },
  ];
}
