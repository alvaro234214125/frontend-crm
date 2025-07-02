import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../model/invoice.model';

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices-table.component.html',
})
export class InvoicesTableComponent {
  @Input() invoices: Invoice[] = [];
  @Input() clients: any[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() downloadPdf = new EventEmitter<number>();

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : clientId?.toString();
  }

  
onDownloadPdf(id: number) {
  this.downloadPdf.emit(id);
}
}