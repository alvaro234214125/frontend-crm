import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  @Input() products: any[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  emitEdit(product: any) {
    this.onEdit.emit(product);
  }

  emitDelete(productId: number) {
    this.onDelete.emit(productId);
  }
}
