export class Usuario {
    usuarioId: number;
    nombreUsuario: string;
    contrasena: string;
    rol: string;
    eliminado: boolean;
    seguido: boolean; // Nueva propiedad para indicar si el usuario es seguido

    constructor(
        nombreUsuario: string, 
        contrasena: string, 
        rol: string, 
        eliminado: boolean, 
        usuarioId: number,
        seguido: boolean = false // Inicializa como false por defecto
    ) {
        this.usuarioId = usuarioId;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.rol = rol;
        this.eliminado = eliminado;
        this.seguido = seguido; // Asigna el valor de seguido
    }
}
