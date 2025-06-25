import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-table.component.html',
})
export class ClientsTableComponent {
  @Input() clients: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  emitEdit(client: any) {
    this.onEdit.emit(client);
  }

  emitDelete(id: number) {
    this.onDelete.emit(id);
  }
}
