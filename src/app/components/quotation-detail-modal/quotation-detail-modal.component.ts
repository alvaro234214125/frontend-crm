import { Component, Output, EventEmitter, OnInit, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quotation, Client, Product } from '../../model/quotation.model';
import { QuotationService } from '../../auth/quotation.service';

@Component({
  selector: 'app-quotation-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-detail-modal.component.html',
})
export class QuotationDetailModalComponent implements OnInit, OnChanges {
  @Input() quotationId: number | null = null;
  @Input() clients: Client[] = [];
  @Input() products: Product[] = [];
  @Output() onClose = new EventEmitter<void>();

  quotation: Quotation | null = null;

  visible = false;
  showContent = false;

  private quotationService = inject(QuotationService);

  ngOnInit() {
    setTimeout(() => {
      this.visible = true;
      setTimeout(() => {
        this.showContent = true;
      }, 10);
    }, 10);

    this.loadQuotation();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['quotationId'] && !changes['quotationId'].firstChange) {
      this.loadQuotation();
    }
  }

  loadQuotation() {
    if (this.quotationId != null) {
      this.quotationService.getQuotationById(this.quotationId).subscribe(q => {
        this.quotation = q;
      });
    } else {
      this.quotation = null;
    }
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => {
      this.visible = false;
      this.onClose.emit();
    }, 300);
  }

  getStatusClass(status: string): string {
    const classes = {
      'Sent': 'bg-blue-100 text-blue-700',
      'Accepted': 'bg-green-100 text-green-700', 
      'Rejected': 'bg-red-100 text-red-700'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-700';
  }
  
  getStatusLabel(status: string): string {
    const labels = {
      'Sent': 'Enviado',
      'Accepted': 'Aceptado',
      'Rejected': 'Rechazado'
    };
    return labels[status as keyof typeof labels] || status;
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Desconocido';
  }

  getClientEmail(clientId: number): string | null {
    const client = this.clients.find(c => c.id === clientId);
    return client?.email || null;
  }

  getClientPhone(clientId: number): string | null {
    const client = this.clients.find(c => c.id === clientId);
    return client?.phone || null;
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Desconocido';
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}