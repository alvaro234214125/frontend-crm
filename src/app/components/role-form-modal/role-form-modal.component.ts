import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-form-modal.component.html',
})
export class RoleFormModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() initialData: any = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  name = '';
  showContent = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        setTimeout(() => (this.showContent = true), 10);
      } else {
        this.showContent = false;
      }
    }

    if (changes['initialData']) {
      this.name = this.initialData?.name || '';
    }
  }

  handleClose(): void {
    this.showContent = false;
    setTimeout(() => this.onClose.emit(), 200);
  }

  submit(): void {
    if (!this.name.trim()) return;
    this.onSubmit.emit({
      id: this.initialData?.id || null,
      name: this.name,
    });
  }
}
