import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../model/payment.model';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-table.component.html',
})
export class PaymentsTableComponent {
  @Input() payments: Payment[] = [];
  @Output() onDelete = new EventEmitter<number>();

getPaymentMethodClass(method: string): string {
    const classes = {
      'Cash': 'bg-green-100 text-green-700',
      'Card': 'bg-blue-100 text-blue-700', 
      'Transfer': 'bg-purple-100 text-purple-700',
      'Bank': 'bg-orange-100 text-orange-700'
    };
    return classes[method as keyof typeof classes] || 'bg-gray-100 text-gray-700';
  }
  
  getPaymentMethodLabel(method: string): string {
    const labels = {
      'Cash': 'Efectivo',
      'Card': 'Tarjeta',
      'Transfer': 'Transferencia', 
      'Bank': 'Banco'
    };
    return labels[method as keyof typeof labels] || method;
  }
}