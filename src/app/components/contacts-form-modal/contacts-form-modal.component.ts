import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts-form-modal.component.html',
})
export class ContactsFormModalComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() initialData: any = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  showContent = false;

  form = {
    name: '',
    email: '',
    phone: '',
    position: ''
  };

  ngOnInit(): void {
    if (this.visible) {
      setTimeout(() => {
        this.showContent = true;
      }, 10);
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
      this.form = {
        name: this.initialData.name || '',
        email: this.initialData.email || '',
        phone: this.initialData.phone || '',
        position: this.initialData.position || ''
      };
    }
    if (changes['initialData'] && !this.initialData) {
      this.form = { name: '', email: '', phone: '', position: '' };
    }
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => this.onClose.emit(), 200);
  }

  submit() {
    if (!this.form.name || !this.form.email || !this.form.phone || !this.form.position) {
      return;
    }
    this.onSubmit.emit({ ...this.form });
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}