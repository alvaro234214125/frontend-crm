import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form-modal.component.html',
})
export class UserFormModalComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() initialData: any = null;
  @Input() roles: any[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<any>();

  showContent = false;
  private firstInit = true;

  form = {
    name: '',
    email: '',
    password: '',
    roleId: '',
    status: true,
  };

  ngOnInit() {
    // Si el modal se abre por primera vez, hacemos animación de entrada
    if (this.visible) {
      setTimeout(() => {
        this.showContent = true;
      }, 10);
    }
    this.firstInit = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Manejo de animación de entrada/salida
    if (changes['visible']) {
      if (this.visible) {
        // Mostrar con animación
        setTimeout(() => {
          this.showContent = true;
        }, 10);
      } else {
        // Ocultar inmediatamente
        this.showContent = false;
      }
    }

    if (changes['initialData'] || changes['roles']) {
      if (this.initialData) {
        this.form = {
          name: this.initialData.name || '',
          email: this.initialData.email || '',
          password: '',
          roleId: this.initialData.role?.id || '',
          status: this.initialData.status ?? true,
        };
      } else {
        this.form = {
          name: '',
          email: '',
          password: '',
          roleId: this.roles[0]?.id || '',
          status: true,
        };
      }
    }
  }

  handleClose() {
    this.showContent = false;
    setTimeout(() => this.onClose.emit(), 200);
  }

  submit() {
    if (!this.form.name || !this.form.email || !this.form.roleId) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Por favor, completa todos los campos requeridos',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    Swal.fire({
      title: this.initialData ? '¿Guardar cambios?' : '¿Crear nuevo usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.initialData ? 'Actualizar' : 'Crear',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#9ca3af',
    }).then(result => {
      if (result.isConfirmed) {
        this.onSubmit.emit({
          id: this.initialData?.id || null,
          name: this.form.name,
          email: this.form.email,
          password: this.form.password || null,
          status: this.form.status,
          role: { id: parseInt(this.form.roleId) },
        });
      }
    });
  }
}