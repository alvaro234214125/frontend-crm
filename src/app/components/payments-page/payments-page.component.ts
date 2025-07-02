import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../auth/payment.service';
import { Payment } from '../../model/payment.model';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';
import Swal from 'sweetalert2';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { PaymentFormModalComponent } from '../payment-form-modal/payment-form-modal.component';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TopbarComponent, 
    StatsCardsComponent, 
    PaymentsTableComponent,
    PaymentFormModalComponent 
  ],
  templateUrl: './payments-page.component.html',
})
export class PaymentsPageComponent implements OnInit {
  private paymentService = inject(PaymentService);

  payments: Payment[] = [];
  stats: { label: string; value: number | string; icon: any; color: string }[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  showForm = false;

  ngOnInit() {
    this.fetchPayments();
    this.fetchPaymentStats();
  }

  fetchPayments(page = 0) {
    this.paymentService.getPayments(page, this.size).subscribe(res => {
      this.payments = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
    });
  }

  fetchPaymentStats() {
    this.paymentService.getPaymentStats().subscribe(stats => {
      this.stats = [
        { label: 'Pagos Totales', value: stats.totalPayments, icon: faCreditCard, color: 'text-blue-500' },
        { label: 'Monto Total', value: `S/ ${stats.totalAmount.toFixed(2)}`, icon: faCreditCard, color: 'text-green-500' },
      ];
    });
  }

  handleSubmit(paymentData: any) {
    this.paymentService.createPayment(paymentData).subscribe({
      next: () => {
        Swal.fire('Registrado', 'El pago ha sido registrado correctamente.', 'success');
        this.showForm = false;
        this.fetchPayments(this.page);
        this.fetchPaymentStats();
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo guardar el pago. Verifique los datos.', 'error');
        console.error(error);
      }
    });
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el pago permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.paymentService.deletePayment(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Pago eliminado correctamente', 'success');
            this.fetchPayments();
            this.fetchPaymentStats();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el pago', 'error');
            console.error(error);
          }
        });
      }
    });
  }
}