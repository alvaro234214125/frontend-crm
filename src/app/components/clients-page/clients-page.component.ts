import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../auth/client.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ClientsTableComponent } from '../clients-table/clients-table.component';
import Swal from 'sweetalert2';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-page',
  standalone: true,
  imports: [CommonModule,  FormsModule,TopbarComponent, StatsCardsComponent, ClientsTableComponent],
  templateUrl: './clients-page.component.html',
})
export class ClientsPageComponent implements OnInit {
  private clientService = inject(ClientService);

  users: any[] = [];
  clients: any[] = [];
  stats: { label: string; value: number; icon: any; color: string }[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  async ngOnInit() {
    this.fetchClients();
    this.fetchClientStats();
    await this.fetchUsers();
  }

async fetchUsers() {
  const res = await firstValueFrom(this.clientService.getAllUsers());
  this.users = res.content;
  console.log('Usuarios cargados:', this.users);
}

  fetchClients(page = 0) {
    this.clientService.getClients(page, this.size).subscribe(res => {
      this.clients = res.content;
      this.page = res.page;
      this.totalPages = res.totalPages;
    });
  }

  fetchClientStats() {
    this.clientService.getClientStats().subscribe(stats => {
      this.stats = [
        { label: 'Clientes Totales', value: stats.total, icon: faUserShield, color: 'text-blue-500' },
        { label: 'Activos', value: stats.activos, icon: faUserShield, color: 'text-green-500' },
        { label: 'Inactivos', value: stats.inactivos, icon: faUserShield, color: 'text-red-500' },
      ];
    });
  }

 async openNewClientForm() {
  const currentUser = await firstValueFrom(this.clientService.getCurrentUser());

  if (!currentUser || !currentUser.id) {
    Swal.fire('Error', 'No se pudo obtener el usuario actual', 'error');
    return;
  }

  const { value: formValues } = await Swal.fire({
    title: 'Registrar Cliente',
    html:
      `<input id="name" class="swal2-input" placeholder="Nombre">` +
      `<input id="email" class="swal2-input" placeholder="Correo">` +
      `<input id="type" class="swal2-input" placeholder="Tipo">` +
      `<input id="phone" class="swal2-input" placeholder="Teléfono">` +
      `<input id="address" class="swal2-input" placeholder="Dirección">` +
      `<select id="status" class="swal2-input">
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>`,
    showCancelButton: true,
    confirmButtonText: 'Registrar',
    preConfirm: () => {
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const type = (document.getElementById('type') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const address = (document.getElementById('address') as HTMLInputElement).value;
      const status = (document.getElementById('status') as HTMLSelectElement).value;

      if (!name || !email || !type || !phone || !address || !status) {
        Swal.showValidationMessage('Todos los campos son requeridos');
        return;
      }

      return {
        name,
        email,
        type,
        phone,
        address,
        status,
        assignedUserId: currentUser.id
      };
    }
  });

  if (formValues) {
    this.clientService.createClient(formValues).subscribe(() => {
      Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
      this.fetchClients();
      this.fetchClientStats();
    });
  }
}

async editClient(client: any) {
  const { value: formValues } = await Swal.fire({
    title: 'Editar Cliente',
    html:
      `<input id="name" class="swal2-input" value="${client.name}" placeholder="Nombre">` +
      `<input id="email" class="swal2-input" value="${client.email}" placeholder="Correo">` +
      `<input id="type" class="swal2-input" value="${client.type}" placeholder="Tipo">` +
      `<input id="phone" class="swal2-input" value="${client.phone}" placeholder="Teléfono">` +
      `<input id="address" class="swal2-input" value="${client.address}" placeholder="Dirección">` +
      `<select id="status" class="swal2-input">
        <option value="activo" ${client.status === 'activo' ? 'selected' : ''}>Activo</option>
        <option value="inactivo" ${client.status === 'inactivo' ? 'selected' : ''}>Inactivo</option>
      </select>`,
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
    preConfirm: () => {
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const type = (document.getElementById('type') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const address = (document.getElementById('address') as HTMLInputElement).value;
      const status = (document.getElementById('status') as HTMLSelectElement).value;

      if (!name || !email || !type || !phone || !address || !status) {
        Swal.showValidationMessage('Todos los campos son requeridos');
        return;
      }

      return {
        name,
        email,
        type,
        phone,
        address,
        status,
        assignedUserId: client.assignedUserId
      };
    }
  });

  if (formValues) {
    this.clientService.updateClient(client.id, formValues).subscribe(() => {
      Swal.fire('Actualizado', 'Cliente actualizado correctamente', 'success');
      this.fetchClients();
      this.fetchClientStats();
    });
  }
}

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el cliente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(result => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(() => {
          Swal.fire('Eliminado', 'Cliente eliminado correctamente', 'success');
          this.fetchClients();
          this.fetchClientStats();
        });
      }
    });
  }

search = {
  name: '',
  email: '',
  type: '',
  status: ''
};

async onSearch(event: Event) {
  event.preventDefault();
  this.clientService.searchClients(this.search, this.page, this.size).subscribe(res => {
    this.clients = res.content;
    this.page = res.page;
    this.totalPages = res.totalPages;
  });
}

resetSearch() {
  this.search = { name: '', email: '', type: '', status: '' };
  this.fetchClients();
}

}