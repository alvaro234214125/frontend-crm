import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quotation, Client, Product } from '../../model/quotation.model';

@Component({
  selector: 'app-quotation-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotation-table.component.html',
})
export class QuotationTableComponent {
  @Input() quotations: Quotation[] = [];
  @Input() clients: Client[] = [];
  @Input() products: Product[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onViewDetail = new EventEmitter<number>();

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

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Desconocido';
  }
}