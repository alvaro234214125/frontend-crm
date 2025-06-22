import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-overview-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-overview-table.component.html',
  styleUrls: ['./quick-overview-table.component.scss']
})
export class QuickOverviewTableComponent {
  orders = [
    { id: '#001', customer: 'John Doe', status: 'Completado', total: '$120.00' },
    { id: '#002', customer: 'Anna Smith', status: 'Pendiente', total: '$95.00' },
    { id: '#003', customer: 'Michael Brown', status: 'Cancelado', total: '$78.50' },
  ];
}
