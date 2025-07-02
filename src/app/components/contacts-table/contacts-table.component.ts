import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-table.component.html',
})
export class ContactsTableComponent {
  @Input() contacts: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();

  emitEdit(contact: any) {
    this.onEdit.emit(contact);
  }

  emitDelete(id: number) {
    this.onDelete.emit(id);
  }
}
