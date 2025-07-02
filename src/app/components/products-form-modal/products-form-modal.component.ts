import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-form-modal.component.html',
})
export class ProductsFormModalComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() initialData: any = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  showContent = false;

  name: string = '';
  description: string = '';
  price: number | null = null;
  type: string = '';

  ngOnInit() {
    if (this.visible) {
      this.initializeForm();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue) {
      this.initializeForm();
      setTimeout(() => {
        this.showContent = true;
      }, 10);
    }
    if (changes['initialData'] && this.visible) {
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.isEdit && this.initialData) {
      this.name = this.initialData.name;
      this.description = this.initialData.description;
      this.price = this.initialData.price;
      this.type = this.initialData.type;
    } else {
      this.name = '';
      this.description = '';
      this.price = null;
      this.type = '';
    }
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => {
      this.onClose.emit();
    }, 300);
  }

  submit() {
    if (!this.name || !this.description || this.price === null || this.price < 0 || !this.type) {
      return;
    }
    this.onSubmit.emit({
      name: this.name,
      description: this.description,
      price: this.price,
      type: this.type,
    });
    this.handleClose();
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }
}