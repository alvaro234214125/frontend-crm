import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-form-modal.component.html',
})
export class PaymentFormModalComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  visible = false;
  showContent = false;

  invoiceId: number | null = null;
  amount: number | null = null;
  paymentDate: string = '';
  paymentMethod: string = 'Cash';

  ngOnInit() {
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

  submit() {
    if (this.invoiceId && this.amount && this.paymentDate) {
      const paymentData = {
        invoiceId: this.invoiceId,
        amount: this.amount,
        paymentDate: this.paymentDate,
        paymentMethod: this.paymentMethod
      };
      
      this.onSubmit.emit(paymentData);
      this.handleClose();
    }
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}