export interface Usuario {
    id: number; // Ajusta según la estructura de tu API
    nombre: string;
    email: string;
    seguido: boolean; // O el campo que necesites para manejar el estado de seguido
    // Agrega más propiedades según lo que devuelva tu API
}