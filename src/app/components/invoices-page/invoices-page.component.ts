import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InvoiceService } from '../../auth/invoice.service';
import { ClientService } from '../../auth/client.service';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../auth/product.service';
import { Invoice, InvoiceStats } from '../../model/invoice.model';
import { PageResponse } from '../../model/page-response.model';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { InvoicesTableComponent } from '../invoices-table/invoices-table.component';
import { InvoicesFormModalComponent } from '../invoices-form-modal/invoices-form-modal.component';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopbarComponent,
    StatsCardsComponent,
    InvoicesTableComponent,
    InvoicesFormModalComponent
  ],
  templateUrl: './invoices-page.component.html'
})
export class InvoicesPageComponent implements OnInit {
  invoices: Invoice[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 1;
  totalInvoices = 0;
  stats: { label: string; value: string | number; icon: any; color: string }[] = [];
  currentUser: any;
  clients: any[] = [];
  products: any[] = [];
  showModal = false;
  editingInvoice: Invoice | null = null;

  totalIncome: number = 0;
  clientsWithInvoices: number = 0;

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadClients();
    this.loadProducts();
    this.fetchInvoices(0);
    this.loadStats();
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : String(clientId);
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(res => {
      this.clients = res.content || [];
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(res => {
      this.products = res.content || [];
    });
  }

  fetchInvoices(page: number) {
    this.invoiceService.getAll(page, this.pageSize).subscribe({
      next: (res: any) => {
        this.invoices = Array.isArray(res.content) ? res.content : [];
        
        this.currentPage = res.page ?? res.number ?? res.currentPage ?? 0;
        
        this.totalPages = typeof res.totalPages === 'number' && res.totalPages > 0 ? res.totalPages : 1;
        this.totalInvoices = typeof res.totalElements === 'number' ? res.totalElements : 0;
      }
    });
  }

  loadStats(): void {
    this.invoiceService.getStats().subscribe((stats: InvoiceStats) => {
      const income = Number(stats.totalIncome ?? (stats as any).totalRevenue ?? 0);
      this.totalIncome = income;
      this.clientsWithInvoices = stats.clientsWithInvoices ?? 0;
      this.stats = [
        {
          label: 'Facturas',
          value: stats.totalInvoices ?? (stats as any).total ?? 0,
          icon: faFileInvoice,
          color: 'text-blue-600'
        },
        {
          label: 'Ingresos',
          value: 'S/ ' + income.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
          icon: faFileInvoice,
          color: 'text-green-600'
        },
        {
          label: 'Clientes con Facturas',
          value: stats.clientsWithInvoices ?? 0,
          icon: faFileInvoice,
          color: 'text-purple-600'
        }
      ];
    });
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.fetchInvoices(page);
  }

  onNewInvoice() {
    this.editingInvoice = null;
    this.showModal = true;
  }

  onSaveInvoice(invoice: Invoice) {
    this.invoiceService.create(invoice).subscribe({
      next: () => {
        this.showModal = false;
        this.editingInvoice = null;
        this.fetchInvoices(0);
        this.loadStats();
      },
      error: (err) => {
        console.error('Error al crear la factura:', err);
      }
    });
  }

  onEditInvoice(invoice: Invoice) {
    this.editingInvoice = invoice;
    this.showModal = true;
  }

  onDeleteInvoice(id: number) {
    this.invoiceService.delete(id).subscribe(() => {
      let goToPage = this.currentPage;
      if (this.invoices.length === 1 && this.currentPage > 0) {
        goToPage = this.currentPage - 1;
      }
      this.fetchInvoices(goToPage);
      this.loadStats();
    });
  }

  onModalClose(saved: boolean) {
    this.showModal = false;
    this.editingInvoice = null;
    if (saved) {
      this.fetchInvoices(this.currentPage);
      this.loadStats();
    }
  }

  onDownloadPdf(id: number) {
    this.invoiceService.downloadPdf(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  
}