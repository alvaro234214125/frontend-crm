import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-table.component.html',
})
export class TasksTableComponent {
  @Input() tasks: Task[] = [];
  @Input() clients: { id: number, name: string }[] = [];
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<number>();

  emitEdit(task: Task) {
    this.onEdit.emit(task);
  }

  emitDelete(id: number) {
    this.onDelete.emit(id);
  }

  getClientName(clientId: number): string {
    const client = this.clients?.find(c => c.id === clientId);
    return client ? client.name : clientId?.toString();
  }
}