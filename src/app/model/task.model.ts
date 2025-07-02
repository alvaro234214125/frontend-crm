export enum TaskStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Overdue = 'Overdue'
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  clientId: number;
  userId: number;
}

export interface TaskStats {
  total: number;
  completadas: number;
  pendientes: number;
}
