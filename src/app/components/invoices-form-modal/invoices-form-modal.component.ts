import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice, InvoiceDetail } from '../../model/invoice.model';

@Component({
  selector: 'app-invoices-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices-form-modal.component.html',
})
export class InvoicesFormModalComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() invoice: Invoice | null = null;
  @Input() clients: any[] = [];
  @Input() products: any[] = [];
  @Output() close = new EventEmitter<any>();
  @Output() saveEvent = new EventEmitter<Invoice>();

  showContent = false;

  formData = {
    clientId: null as number | null,
    issueDate: '',
    details: [] as InvoiceDetail[]
  };

  selectedProductId: number | null = null;
  quantity: number = 1;

  ngOnInit() {
    this.setFormDataFromInvoice();
    setTimeout(() => { this.showContent = true; }, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['invoice'] && this.visible) || (changes['visible'] && this.visible)) {
      this.setFormDataFromInvoice();
      setTimeout(() => { this.showContent = true; }, 10);
    }
    if (changes['visible'] && !this.visible) {
      this.showContent = false;
    }
  }

  setFormDataFromInvoice() {
    this.formData = {
      clientId: null,
      issueDate: '',
      details: []
    };
    this.selectedProductId = null;
    this.quantity = 1;
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

  addDetail() {
    if (!this.selectedProductId || this.quantity <= 0) return;
    const product = this.products.find(p => p.id === this.selectedProductId);
    if (!product) return;
    const existing = this.formData.details.find(d => d.productId === product.id);
    if (existing) {
      existing.quantity += this.quantity;
    } else {
      this.formData.details.push({
        productId: product.id,
        quantity: this.quantity,
        unitPrice: product.price
      });
    }
    this.selectedProductId = null;
    this.quantity = 1;
  }

  removeDetail(index: number) {
    this.formData.details.splice(index, 1);
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : '';
  }

  getTotal(): number {
    return this.formData.details.reduce(
      (sum, d) => sum + (d.unitPrice * d.quantity),
      0
    );
  }

  save() {
    if (!this.formData.clientId || !this.formData.issueDate || this.formData.details.length === 0) {
      return;
    }
    const invoice: Invoice = {
      clientId: this.formData.clientId,
      issueDate: this.formData.issueDate,
      total: this.getTotal(),
      details: this.formData.details.map(d => ({ ...d }))
    };
    this.saveEvent.emit(invoice);
  }

  closeModal() {
    this.showContent = false;
    setTimeout(() => this.close.emit(false), 200);
  }
}