import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotationService } from '../../auth/quotation.service';
import { ClientService } from '../../auth/client.service';
import { ProductService } from '../../auth/product.service';
import { Client, Product, Quotation, QuotationStats } from '../../model/quotation.model';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { QuotationTableComponent } from '../quotation-table/quotation-table.component';
import { QuotationDetailModalComponent } from '../quotation-detail-modal/quotation-detail-modal.component';
import { QuotationFormModalComponent } from '../quotation-form-modal/quotation-form-modal.component';
import Swal from 'sweetalert2';
import { faFileText, faDollarSign, faPaperPlane, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quotation-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TopbarComponent,
    StatsCardsComponent,
    QuotationTableComponent,
    QuotationDetailModalComponent,
    QuotationFormModalComponent
  ],
  templateUrl: './quotation-page.component.html',
})
export class QuotationPageComponent implements OnInit {
  private quotationService = inject(QuotationService);
  private clientService = inject(ClientService);
  private productService = inject(ProductService);

  quotations: Quotation[] = [];
  stats: { label: string; value: number | string; icon: any; color: string }[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  showForm = false;
  showDetail = false;
  selectedQuotationId: number | null = null;

  ngOnInit() {
    this.fetchQuotations();
    this.fetchQuotationStats();
    this.fetchClients();
    this.fetchProducts();
  }

  fetchQuotations(page = 0) {
    this.quotationService.getQuotations(page, this.size).subscribe(res => {
      this.quotations = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
    });
  }

  fetchQuotationStats() {
    this.quotationService.getQuotationStats().subscribe(stats => {
      this.stats = [
        { label: 'Cotizaciones Totales', value: stats.total ?? 0, icon: faFileText, color: 'text-blue-500' },
        { label: 'Aceptadas', value: stats.accepted ?? 0, icon: faCheck, color: 'text-green-600' },
        { label: 'Rechazadas', value: stats.rejected ?? 0, icon: faTimes, color: 'text-red-500' }
      ];
    });
  }

  fetchClients() {
    this.clientService.getClients(0, 100).subscribe(res => {
      this.clients = res.content ? res.content : res;
    });
  }

  fetchProducts() {
    this.productService.getProducts(0, 100).subscribe(res => {
      this.products = res.content ? res.content : res;
    });
  }

  handleSubmit(quotationData: any) {
    this.quotationService.createQuotation(quotationData).subscribe({
      next: () => {
        Swal.fire('Registrado', 'La cotización ha sido registrada correctamente.', 'success');
        this.showForm = false;
        this.fetchQuotations(this.page);
        this.fetchQuotationStats();
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo guardar la cotización. Verifique los datos.', 'error');
        console.error(error);
      }
    });
  }

  handleViewDetail(id: number) {
    this.selectedQuotationId = id;
    this.showDetail = true;
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará la cotización permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.quotationService.deleteQuotation(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Cotización eliminada correctamente', 'success');
            this.fetchQuotations();
            this.fetchQuotationStats();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la cotización', 'error');
            console.error(error);
          }
        });
      }
    });
  }

  openCreateForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  closeDetail() {
    this.showDetail = false;
    this.selectedQuotationId = null;
  }
}