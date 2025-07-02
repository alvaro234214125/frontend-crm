import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../auth/task.service';
import { Task, TaskStatus } from '../../model/task.model';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ClientService } from '../../auth/client.service';

@Component({
  selector: 'app-tasks-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-form-modal.component.html',
})
export class TasksFormModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() task: Task | null = null;
  @Output() onClose = new EventEmitter<boolean>();

  clients: any[] = [];
  currentUserId: number = 0;

  showContent = false;

  formData: {
    title: string;
    description: string;
    dueDate: string;
    status: string;
    clientId: number | null;
  } = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pendiente',
    clientId: null
  };

  constructor(
    private taskService: TaskService,
    private clientService: ClientService
  ) {}

  async ngOnInit() {
    await this.loadClients();
    await this.loadCurrentUser();
    this.setFormDataFromTask();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      setTimeout(() => { this.showContent = true; }, 10);
      this.setFormDataFromTask();
    }
    if (changes['task'] && this.visible) {
      this.setFormDataFromTask();
    }
  }

setFormDataFromTask() {
  if (this.task) {
    let dueDateStr = '';
    const dueDate: string | Date = this.task.dueDate as string | Date;
    if (dueDate instanceof Date) {
      dueDateStr = dueDate.toISOString().slice(0, 10);
    } else if (typeof dueDate === 'string') {
      dueDateStr = dueDate.substring(0, 10);
    }
    this.formData = {
      title: this.task.title,
      description: this.task.description,
      dueDate: dueDateStr,
      status: this.backendToFrontendStatus(this.task.status),
      clientId: this.task.clientId
    };
    } else {
        this.formData = {
        title: '',
        description: '',
        dueDate: '',
        status: 'Pendiente',
        clientId: null
        };
    }
    }

  backendToFrontendStatus(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.Completed:
        return 'Completado';
      case TaskStatus.Pending:
        return 'Pendiente';
      case TaskStatus.Overdue:
        return 'Vencida';
      default:
        return 'Pendiente';
    }
  }

  frontendToBackendStatus(status: string): TaskStatus {
    switch (status) {
      case 'Completado':
        return TaskStatus.Completed;
      case 'Pendiente':
        return TaskStatus.Pending;
      case 'Vencida':
        return TaskStatus.Overdue;
      default:
        return TaskStatus.Pending;
    }
  }

  async loadClients() {
    const response = await firstValueFrom(this.clientService.getClients(0, 100));
    this.clients = response.content;
  }

  async loadCurrentUser() {
    const user = await firstValueFrom(this.clientService.getCurrentUser());
    this.currentUserId = user.id;
  }

  async submitForm() {
    const { title, description, dueDate, status, clientId } = this.formData;
    if (!title || !description || !dueDate || !status || !clientId) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const backendStatus = this.frontendToBackendStatus(status);

    const payload: Task = {
      ...this.formData,
      dueDate: new Date(dueDate),
      status: backendStatus,
      clientId,
      userId: this.currentUserId
    };

    try {
      if (this.task) {
        await firstValueFrom(this.taskService.updateTask(this.task.id!, payload));
        Swal.fire('Éxito', 'Tarea actualizada', 'success');
      } else {
        await firstValueFrom(this.taskService.createTask(payload));
        Swal.fire('Éxito', 'Tarea creada', 'success');
      }
      this.closeWithAnimation(true);
    } catch {
      Swal.fire('Error', 'Ocurrió un error al guardar la tarea', 'error');
      this.closeWithAnimation(false);
    }
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

  closeModal() {
    this.closeWithAnimation(false);
  }

  closeWithAnimation(success: boolean) {
    this.showContent = false;
    setTimeout(() => {
      this.onClose.emit(success);
    }, 200);
  }
}