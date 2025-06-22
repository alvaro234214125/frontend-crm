import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormModalComponent } from '../role-form-modal/role-form-modal.component';
import { RolesTableComponent } from '../roles-table/roles-table.component'
import { RoleService } from '../../auth/role.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { IconDefinition, faUsers } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-roles-page',
  imports: [
  CommonModule,
  FormsModule,
  RoleFormModalComponent,
  RolesTableComponent,
  TopbarComponent,
  StatsCardsComponent,
  ],
  templateUrl: './roles-page.component.html',
})
export class RolesPageComponent {
  roleService = inject(RoleService);

  roles: any[] = [];
  showForm = false;
  editData: any = null;
  page = 0;
  totalPages = 0;
  totalElements = 0;
  size = 10;

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles(pageNumber = 0) {
  this.roleService.getRoles(pageNumber, this.size).subscribe(res => {
    this.roles = res.content;
    this.page = res.page;
    this.totalPages = res.totalPages;
    this.totalElements = res.totalElements;

    this.stats = [
      {
        label: 'Roles Totales',
        value: this.totalElements.toString(),
        change: '',
        icon: faUsers,
        color: 'text-blue-500'
      }
    ];
  });
}


  handleSubmit(data: any) {
  const isUpdate = !!data.id;

  Swal.fire({
    title: isUpdate ? '¿Actualizar rol?' : '¿Crear nuevo rol?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: isUpdate ? 'Actualizar' : 'Crear',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      const action = isUpdate
        ? this.roleService.updateRole(data.id, data)
        : this.roleService.createRole(data);

      action.subscribe({
        next: () => {
          Swal.fire(
            isUpdate ? 'Actualizado' : 'Creado',
            isUpdate ? 'El rol ha sido actualizado' : 'Nuevo rol creado',
            'success'
          );
          this.showForm = false;
          this.editData = null;
          this.fetchRoles();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo guardar el rol', 'error');
        }
      });
    }
  });
}


  handleDelete(id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esto eliminará el rol.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.roleService.deleteRole(id).subscribe({
        next: () => {
          this.fetchRoles();
          Swal.fire('Eliminado', 'El rol fue eliminado', 'success');
        },
        error: () => {
          Swal.fire('Error', 'No se pudo eliminar el rol', 'error');
        }
      });
    }
  });
}


  stats: { label: string; value: string; change: string; icon: IconDefinition; color: string }[] = [
  {
    label: 'Roles Totales',
    value: this.totalElements.toString(),
    change: '',
    icon: faUsers,
    color: 'text-blue-500'
  }
];

}
