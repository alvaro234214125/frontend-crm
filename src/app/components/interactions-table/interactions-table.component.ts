import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interaction } from '../../model/interaction.model';

@Component({
  selector: 'app-interactions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactions-table.component.html',
})
export class InteractionsTableComponent {
  @Input() interactions: Interaction[] = [];
  @Input() clients: any[] = [];
  @Output() onEdit = new EventEmitter<Interaction>();
  @Output() onDelete = new EventEmitter<number>();

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : clientId?.toString();
  }
}