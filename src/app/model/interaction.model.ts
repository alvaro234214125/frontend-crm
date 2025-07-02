export interface Interaction {
  id?: number;
  clientId: number;
  userId: number;
  type: string;
  description: string;
  createdAt?: string;
  date?: string;
}

export interface InteractionStats {
  total: number;
  tiposUnicos: number;
  clientesConInteraccion: number;
}