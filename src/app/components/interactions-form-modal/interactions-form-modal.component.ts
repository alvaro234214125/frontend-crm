import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interactions-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interactions-form-modal.component.html',
})
export class InteractionsFormModalComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() clients: any[] = [];
  @Input() initialData: any = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  showContent = false;

  form = {
    clientId: null,
    type: '',
    description: '',
    date: ''
  };

  ngOnInit(): void {
    if (this.visible) {
      setTimeout(() => { this.showContent = true; }, 10);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (this.visible) {
        setTimeout(() => { this.showContent = true; }, 10);
      } else {
        this.showContent = false;
      }
    }
    if (changes['initialData'] && this.initialData) {
      let formattedDate = '';
      if (this.initialData.date) {
        const d = new Date(this.initialData.date);
        formattedDate = d.toISOString().split('T')[0];
      }
      this.form = {
        clientId: this.initialData.clientId || null,
        type: this.initialData.type || '',
        description: this.initialData.description || '',
        date: formattedDate
      };
    }
    if (changes['initialData'] && !this.initialData) {
      this.form = { clientId: null, type: '', description: '', date: '' };
    }
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => this.onClose.emit(), 200);
  }

  submit() {
    if (!this.form.clientId || !this.form.type || !this.form.description || !this.form.date) {
      return;
    }
    this.onSubmit.emit({ ...this.form });
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}