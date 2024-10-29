import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../usuarios/service/usuario.service1'; // Asegúrate de que la ruta sea correcta
import { Usuario } from '../usuarios/models/usuario.models'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDialogModule], // Asegúrate de incluir MatDialogModule
})
export class EditUserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
    private usuarioService: UsuarioService
  ) {}

  onSubmit() {
    this.usuarioService.updateUsuario(this.usuario.usuarioId, this.usuario).subscribe(
      () => {
        this.dialogRef.close(true); // Cierra el modal y envía true si la edición fue exitosa
      },
      (error) => {
        console.error('Error al editar el usuario', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(); // Cierra el modal sin hacer cambios
  }
}
