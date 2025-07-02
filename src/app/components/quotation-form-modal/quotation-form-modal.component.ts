import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, Product, QuotationDetail } from '../../model/quotation.model';

@Component({
  selector: 'app-quotation-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotation-form-modal.component.html',
})
export class QuotationFormModalComponent implements OnInit {
  @Input() clients: Client[] = [];
  @Input() products: Product[] = [];

  @Input() quotationId: number | null = null;
  @Input() isEdit: boolean = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  visible = false;
  showContent = false;

  clientId: number | null = null;
  issueDate: string = '';
  status: string = 'Sent';
  details: QuotationDetail[] = [];

  selectedProductId: number | null = null;
  quantity: number = 1;

  ngOnInit() {
    const today = new Date();
    this.issueDate = today.toISOString().split('T')[0];

    setTimeout(() => {
      this.visible = true;
      setTimeout(() => {
        this.showContent = true;
      }, 10);
    }, 10);
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => {
      this.visible = false;
      this.onClose.emit();
    }, 300);
  }

  addDetail() {
    if (this.selectedProductId && this.quantity > 0) {
      const product = this.products.find(p => p.id === this.selectedProductId);
      if (product) {
        const detail: QuotationDetail = {
          productId: product.id,
          quantity: this.quantity,
          unitPrice: product.price
        };
        this.details.push(detail);
        this.selectedProductId = null;
        this.quantity = 1;
      }
    }
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  getTotal(): number {
    return this.details.reduce((total, detail) =>
      total + (detail.quantity * detail.unitPrice), 0
    );
  }

  submit() {
    if (this.clientId && this.issueDate && this.details.length > 0) {
      const quotationData = {
        clientId: this.clientId,
        issueDate: this.issueDate,
        status: this.status,
        total: this.getTotal(),
        details: this.details 
      };

      this.onSubmit.emit(quotationData);
      this.handleClose();
    }
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Desconocido';
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}