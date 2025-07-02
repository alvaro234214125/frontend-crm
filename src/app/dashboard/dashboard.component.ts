import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { StatsCardsComponent } from '../components/stats-cards/stats-cards.component';
import { RecentInvoicesComponent } from '../components/recent-revenue-invoices/recent-revenue-invoices.component';
import { RecentActivitiesComponent } from '../components/recent-activities/recent-activities.component';
import { QuickOverviewTableComponent } from '../components/quick-overview-table/quick-overview-table.component';
import { IconDefinition, faDollarSign, faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { InvoiceService } from '../auth/invoice.service';
import { ClientService } from '../auth/client.service';
import { QuotationService } from '../auth/quotation.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TopbarComponent,
    StatsCardsComponent,
    RecentInvoicesComponent,
    RecentActivitiesComponent,
    QuickOverviewTableComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: { label: string; value: string; change: string; icon: IconDefinition; color: string }[] = [
    { label: 'Ingresos Totales', value: '...', change: '', icon: faDollarSign, color: 'text-green-500' },
    { label: 'Nuevos Clientes', value: '...', change: '', icon: faUsers, color: 'text-blue-500' },
    { label: 'Cotizaciones', value: '...', change: '', icon: faShoppingCart, color: 'text-purple-500' }
  ];

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private quotationService: QuotationService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.invoiceService.getStats().subscribe((stats: any) => {
      const income = Number(stats.totalIncome ?? stats.totalRevenue ?? 0);
      this.stats[0].value = 'S/ ' + income.toLocaleString('es-PE', { minimumFractionDigits: 2 });
      this.stats[0].change = '';
    });

    this.clientService.getClientStats().subscribe((data: any) => {
      const total = Number(data.total ?? 0);
      this.stats[1].value = total.toLocaleString('es-PE');
      this.stats[1].change = '';
    });

    this.quotationService.getQuotationStats().subscribe((data: any) => {
      const accepted = Number(data.accepted ?? 0);
      this.stats[2].value = accepted.toLocaleString('es-PE');
      this.stats[2].change = '';
    });
  }
}