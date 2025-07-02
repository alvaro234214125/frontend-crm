import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-profile-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {
  @Input() user!: any;
  form: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.form = {
      name: this.user?.name || '',
      email: this.user?.email || '',
      password: ''
    };
  }

  guardar() {
    const payload = {
      name: this.form.name,
      email: this.form.email,
      ...(this.form.password ? { password: this.form.password } : {})
    };

    this.http.put(`/api/users/${this.user.id}`, payload).subscribe({
      next: () => alert('Actualizado con éxito'),
      error: () => alert('Error al actualizar')
    });
  }
}
