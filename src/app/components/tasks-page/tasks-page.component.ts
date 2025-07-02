import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksTableComponent } from '../tasks-table/tasks-table.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { TasksFormModalComponent } from '../tasks-form-modal/tasks-form-modal.component';
import { TaskService } from '../../auth/task.service';
import { Task, TaskStatus, TaskStats } from '../../model/task.model';
import { ClientService } from '../../auth/client.service';
import { faListCheck, faCircleCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TasksTableComponent,
    TopbarComponent,
    StatsCardsComponent,
    TasksFormModalComponent
  ],
  templateUrl: './tasks-page.component.html',
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask: Task | null = null;
  taskFormVisible = false;
  page = 0;
  size = 10;
  totalPages = 0;

  clients: any[] = [];
  currentUserId: number = 0;

  stats = [
    { label: 'Total de Tareas', value: 0, icon: faListCheck, color: 'text-blue-500' },
    { label: 'Completadas', value: 0, icon: faCircleCheck, color: 'text-green-500' },
    { label: 'Pendientes', value: 0, icon: faClock, color: 'text-yellow-500' },
  ];

  filters = {
    title: '',
    userId: '',
    clientId: ''
  };

  constructor(
    private taskService: TaskService,
    private clientService: ClientService
  ) {}

  async ngOnInit() {
    await this.loadClients();
    await this.loadCurrentUser();
    this.fetchTasks();
    this.fetchStats();
  }

  async loadClients() {
    const response = await firstValueFrom(this.clientService.getClients(0, 100));
    this.clients = response.content;
  }

  async loadCurrentUser() {
    const user = await firstValueFrom(this.clientService.getCurrentUser());
    this.currentUserId = user.id;
  }

  fetchTasks(page = 0) {
    this.taskService.getTasks(page, this.size).subscribe(res => {
      this.tasks = res.content;
      this.filteredTasks = [...this.tasks];
      this.page = res.page;
      this.totalPages = res.totalPages;
      this.updateStats();
    });
  }

  fetchStats() {
    this.taskService.getTaskStats().subscribe((stats: TaskStats) => {
      this.stats = [
        { label: 'Total de Tareas', value: stats.total, icon: faListCheck, color: 'text-blue-500' },
        { label: 'Completadas', value: stats.completadas, icon: faCircleCheck, color: 'text-green-500' },
        { label: 'Pendientes', value: stats.pendientes, icon: faClock, color: 'text-yellow-500' },
      ];
    });
  }

  updateStats() {
    const completed = this.tasks.filter(t => t.status === TaskStatus.Completed).length;
    const pending = this.tasks.filter(t => t.status === TaskStatus.Pending).length;
    this.stats = [
      { label: 'Total de Tareas', value: this.tasks.length, icon: faListCheck, color: 'text-blue-500' },
      { label: 'Completadas', value: completed, icon: faCircleCheck, color: 'text-green-500' },
      { label: 'Pendientes', value: pending, icon: faClock, color: 'text-yellow-500' },
    ];
  }

  onSearch() {
    this.filteredTasks = this.tasks.filter(task => {
      const titleMatch = this.filters.title ? task.title.toLowerCase().includes(this.filters.title.toLowerCase()) : true;
      const userMatch = this.filters.userId ? task.userId === +this.filters.userId : true;
      const clientMatch = this.filters.clientId ? task.clientId === +this.filters.clientId : true;
      return titleMatch && userMatch && clientMatch;
    });
  }

  resetFilters() {
    this.filters = { title: '', userId: '', clientId: '' };
    this.filteredTasks = [...this.tasks];
  }

  openTaskForm(task: Task | null = null) {
    this.selectedTask = task;
    this.taskFormVisible = true;
  }

  handleModalClose(success: boolean) {
    this.taskFormVisible = false;
    this.selectedTask = null;
    if (success) {
      this.fetchTasks(this.page);
      this.fetchStats();
    }
  }

  deleteTask(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(() => {
          Swal.fire('Eliminado', 'La tarea fue eliminada', 'success');
          this.fetchTasks(this.page);
          this.fetchStats();
        });
      }
    });
  }
}