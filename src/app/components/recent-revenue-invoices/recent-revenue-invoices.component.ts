import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../auth/invoice.service';
import { Invoice } from '../../model/invoice.model';

@Component({
  selector: 'app-recent-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-invoices.component.html'
})
export class RecentInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  page = 0;
  totalPages = 0;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
  console.log('Solicitando página:', this.page);
  this.invoiceService.getAll(this.page, 4, 'issueDate', 'desc').subscribe({
    next: (res) => {
      console.log('Respuesta página:', res.number, 'Total páginas:', res.totalPages, 'Facturas:', res.content);
      this.invoices = res.content;
      //s.page = res.number;
      this.totalPages = res.totalPages;
    },
    error: (err) => console.error('Error loading invoices', err)
  });
}

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchInvoices();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchInvoices();
    }
  }
}