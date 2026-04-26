export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: 'ADMIN' | 'TECNICO' | 'SUPERVISOR' | 'GESTOR'; // Seus perfis de acesso
  foto_url?: string;
}