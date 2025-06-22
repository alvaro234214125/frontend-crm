import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-table.component.html',
})
export class RolesTableComponent {
  @Input() roles: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<number>();
}
