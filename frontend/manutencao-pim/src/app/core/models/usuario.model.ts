// O que um usuário é dentro desta aplicação
export interface Usuario {
id: number;
nome: string;
email: string;
avatar?: string; // opcional: pode ser undefined
}
// O que o backend retorna após um login bem-sucedido
export interface RespostaLogin {
usuario: Usuario;
token: string;
}
// O que enviamos para o backend ao fazer login
export interface CredenciaisLogin {
email: string;
senha: string;
}