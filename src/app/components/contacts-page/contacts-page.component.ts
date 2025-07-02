import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { ContactService } from '../../auth/contact.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ContactsTableComponent } from '../contacts-table/contacts-table.component';
import { ContactsFormModalComponent } from '../contacts-form-modal/contacts-form-modal.component';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarComponent, StatsCardsComponent, ContactsTableComponent, ContactsFormModalComponent],
  templateUrl: './contacts-page.component.html',
})
export class ContactsPageComponent implements OnInit {
  private contactService = inject(ContactService);

  contacts: any[] = [];
  stats: { label: string; value: number; icon: any; color: string }[] = [];
  page = 0;
  size = 10;
  totalPages = 1;

  search = {
    name: '',
    email: '',
    phone: '',
    position: ''
  };

  showContactModal = false;
  isEditContact = false;
  editingContact: any = null;

  ngOnInit(): void {
    this.fetchContacts();
    this.fetchContactStats();
  }

  fetchContacts() {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
    });
  }

  fetchContactStats() {
    this.contactService.getContactStats().subscribe(stats => {
      this.stats = [
        { label: 'Total Contactos', value: stats.total, icon: faUsers, color: 'text-blue-500' },
        { label: 'Por Cliente', value: stats.porCliente, icon: faUsers, color: 'text-purple-500' },
      ];
    });
  }

  openContactForm(isEdit: boolean, contact: any = null) {
    this.isEditContact = isEdit;
    this.editingContact = contact;
    this.showContactModal = true;
  }

  closeContactForm() {
    this.showContactModal = false;
    this.isEditContact = false;
    this.editingContact = null;
  }

  saveContact(formValues: any) {
    if (this.isEditContact && this.editingContact) {
      this.contactService.updateContact(this.editingContact.id, formValues).subscribe(() => {
        Swal.fire('Actualizado', 'Contacto actualizado correctamente', 'success');
        this.fetchContacts();
        this.fetchContactStats();
        this.closeContactForm();
      });
    } else {
      this.contactService.createContact(formValues).subscribe(() => {
        Swal.fire('Éxito', 'Contacto creado correctamente', 'success');
        this.fetchContacts();
        this.fetchContactStats();
        this.closeContactForm();
      });
    }
  }

  handleDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el contacto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(result => {
      if (result.isConfirmed) {
        this.contactService.deleteContact(id).subscribe(() => {
          Swal.fire('Eliminado', 'Contacto eliminado correctamente', 'success');
          this.fetchContacts();
          this.fetchContactStats();
        });
      }
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.contactService.getContacts().subscribe((res: any[]) => {
      this.contacts = res.filter(c =>
        c.name.includes(this.search.name) &&
        c.email.includes(this.search.email) &&
        c.phone.includes(this.search.phone) &&
        c.position.includes(this.search.position)
      );
    });
  }

  resetSearch() {
    this.search = { name: '', email: '', phone: '', position: '' };
    this.fetchContacts();
  }
}