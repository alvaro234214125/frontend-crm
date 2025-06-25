import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { UsersTableComponent } from '../users-table/users-table.component';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { UserService } from '../../auth/user.service';
import { RoleService } from '../../auth/role.service';
import Swal from 'sweetalert2';
import { IconDefinition, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-users-page',
  imports: [
    CommonModule,
    TopbarComponent,
    StatsCardsComponent,
    UsersTableComponent,
    UserFormModalComponent,
  ],
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit{
  userService = inject(UserService);
  roleService = inject(RoleService);

  users: any[] = [];
  roles: any[] = [];
  showForm = false;
  editData: any = null;

  stats: { label: string; value: number; icon: IconDefinition; color: string }[] = [];

  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  ngOnInit() {
    this.fetchUsers();
    this.fetchRoles();
    this.fetchUserStats();
  }

  fetchUsers(pageNumber = 0) {
    this.userService.getUsers(pageNumber, this.size).subscribe(res => {
      this.users = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
      this.totalElements = res.totalElements;
    });
  }

  fetchRoles() {
  this.roleService.getRoles().subscribe(res => {
    this.roles = res.content;
  });
}

 fetchUserStats() {
  this.userService.getUserStats().subscribe(stats => {
    console.log('stats:', stats);
    this.stats = [
      { label: 'Usuarios Totales', value: stats.total, icon: faUserShield, color: 'text-blue-500' },
      { label: 'Activos', value: stats.activos, icon: faUserShield, color: 'text-green-500' },
      { label: 'Inactivos', value: stats.inactivos, icon: faUserShield, color: 'text-red-500' }
    ];
  });
}

openNewUserForm() {
  this.editData = null;
  this.showForm = true;
}


  handleSubmit(data: any) {
    const request = data.id
      ? this.userService.updateUser(data.id, data)
      : this.userService.createUser(data);

    request.subscribe({
      next: () => {
        Swal.fire('Éxito', `Usuario ${data.id ? 'actualizado' : 'creado'}`, 'success');
        this.showForm = false;
        this.editData = null;
        this.fetchUsers(this.page);
        this.fetchUserStats();
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
      }
    });
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.fetchUsers(this.page);
          this.fetchUserStats();
          Swal.fire('Eliminado', 'El usuario fue eliminado', 'success');
        });
      }
    });
  }
}
