import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StatsCardsComponent } from '../components/stats-cards/stats-cards.component';
import { RevenueChartComponent } from '../components/revenue-chart/revenue-chart.component';
import { RecentActivitiesComponent } from '../components/recent-activities/recent-activities.component';
import { QuickOverviewTableComponent } from '../components/quick-overview-table/quick-overview-table.component';
import { IconDefinition, faDollarSign, faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TopbarComponent,
    StatsCardsComponent,
    RevenueChartComponent,
    RecentActivitiesComponent,
    QuickOverviewTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats: { label: string; value: string; change: string; icon: IconDefinition; color: string }[] = [
    { label: 'Ingresos Totales', value: '$75,900', change: '+8.2% este mes', icon: faDollarSign, color: 'text-green-500' },
    { label: 'Nuevos Clientes', value: '1,205', change: '+4.5% este mes', icon: faUsers, color: 'text-blue-500' },
    { label: 'Ordenes', value: '984', change: '-1.2% este mes', icon: faShoppingCart, color: 'text-purple-500' }
  ];
}