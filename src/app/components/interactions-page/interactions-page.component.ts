import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InteractionService } from '../../auth/interaction.service';
import { ClientService } from '../../auth/client.service';
import { AuthService } from '../../auth/auth.service';
import { Interaction, InteractionStats } from '../../model/interaction.model';
import { PageResponse } from '../../model/page-response.model';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { InteractionsTableComponent } from '../interactions-table/interactions-table.component';
import { InteractionsFormModalComponent } from '../interactions-form-modal/interactions-form-modal.component';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faListAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopbarComponent,
    StatsCardsComponent,
    InteractionsTableComponent,
    InteractionsFormModalComponent
  ],
  templateUrl: './interactions-page.component.html'
})
export class InteractionsPageComponent implements OnInit {
  interactions: Interaction[] = [];
  stats: { label: string; value: string | number; icon: IconDefinition; color: string }[] = [];
  clients: any[] = [];
  currentUser: any;
  greeting: string = '';
  currentPage = 0;
  size = 10;
  totalPages = 1;

  showInteractionModal = false;
  isEditInteraction = false;
  editingInteraction: Interaction | null = null;

  constructor(
    private interactionService: InteractionService,
    private clientService: ClientService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.greeting = this.getGreeting();
    this.loadClients();
    this.fetchInteractions(0);
    this.loadStats();
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  loadClients(): void {
    this.clientService.getAll().subscribe((res: PageResponse<any>) => {
      this.clients = res.content || [];
    });
  }

  fetchInteractions(page: number) {
    this.interactionService.getAll(page, this.size).subscribe({
      next: (res: any) => {
        this.interactions = Array.isArray(res.content) ? res.content : [];
        this.currentPage = res.page ?? res.number ?? res.currentPage ?? 0;
        this.totalPages = typeof res.totalPages === 'number' && res.totalPages > 0 ? res.totalPages : 1;
      },
      error: (err) => console.error('Error al cargar interacciones', err)
    });
  }

  loadStats(): void {
    this.interactionService.getStats().subscribe({
      next: (stats: InteractionStats) => {
        this.stats = [
          {
            label: 'Total Interacciones',
            value: stats.total,
            icon: faCommentDots,
            color: 'text-green-600'
          },
          {
            label: 'Tipos únicos',
            value: stats.tiposUnicos,
            icon: faListAlt,
            color: 'text-blue-600'
          },
          {
            label: 'Clientes con Interacción',
            value: stats.clientesConInteraccion,
            icon: faUsers,
            color: 'text-purple-600'
          }
        ];
      },
      error: (err) => console.error('Error al cargar estadísticas', err)
    });
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.fetchInteractions(page);
  }

  onDeleteInteraction(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la interacción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.interactionService.delete(id).subscribe(() => {
          let goToPage = this.currentPage;
          if (this.interactions.length === 1 && this.currentPage > 0) {
            goToPage = this.currentPage - 1;
          }
          this.fetchInteractions(goToPage);
          this.loadStats();
          Swal.fire('Eliminado', 'La interacción fue eliminada correctamente.', 'success');
        });
      }
    });
  }

  openNewInteraction(): void {
    this.isEditInteraction = false;
    this.editingInteraction = null;
    this.showInteractionModal = true;
  }

  openEditInteraction(interaction: Interaction): void {
    this.isEditInteraction = true;
    this.editingInteraction = interaction;
    this.showInteractionModal = true;
  }

  closeInteractionModal() {
    this.showInteractionModal = false;
    this.isEditInteraction = false;
    this.editingInteraction = null;
  }

  saveInteraction(interactionForm: any) {
    const userId = this.currentUser?.id;
    if (!interactionForm.clientId || !interactionForm.type || !interactionForm.description || !interactionForm.date) {
      return;
    }
    const interaction: Interaction = {
      clientId: interactionForm.clientId,
      type: interactionForm.type,
      description: interactionForm.description,
      userId: userId,
      date: interactionForm.date
    };

    if (this.isEditInteraction && this.editingInteraction) {
      this.interactionService.update(this.editingInteraction.id!, interaction).subscribe(() => {
        Swal.fire('Éxito', 'Interacción actualizada correctamente.', 'success');
        this.fetchInteractions(this.currentPage);
        this.loadStats();
        this.closeInteractionModal();
      });
    } else {
      this.interactionService.create(interaction).subscribe(() => {
        Swal.fire('Éxito', 'Interacción creada correctamente.', 'success');
        this.fetchInteractions(0);
        this.loadStats();
        this.closeInteractionModal();
      });
    }
  }
}