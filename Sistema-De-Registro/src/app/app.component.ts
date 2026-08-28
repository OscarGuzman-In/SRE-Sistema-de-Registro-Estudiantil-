import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './feature/formulario/formulario.component';
import { TablaEstudiantesComponent } from './feature/tabla-estudiantes/tabla-estudiantes.component';
import { Estudiante } from './models/estudiante.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponent, TablaEstudiantesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  listaEstudiantes: Estudiante[] = [];
  estudianteSeleccionado: Estudiante | null = null;
  private proximoId = 1;

  guardarEstudiante(estudianteData: Estudiante): void {
    if (this.estudianteSeleccionado) {
      // Editar estudiante existente
      this.listaEstudiantes = this.listaEstudiantes.map(est =>
        est.id === this.estudianteSeleccionado?.id ? { ...estudianteData, id: est.id } : est
      );
      this.estudianteSeleccionado = null;
    } else {
      // Crear nuevo estudiante (asignando un nuevo arreglo para que Angular reaccione)
      const nuevoEstudiante = { ...estudianteData, id: this.proximoId++ };
      this.listaEstudiantes = [...this.listaEstudiantes, nuevoEstudiante];
    }
  }

  seleccionarParaEditar(estudiante: Estudiante): void {
    this.estudianteSeleccionado = estudiante;
  }

  cancelarEdicion(): void {
    this.estudianteSeleccionado = null;
  }

  eliminarEstudiante(id: number): void {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.listaEstudiantes = this.listaEstudiantes.filter(est => est.id !== id);
      if (this.estudianteSeleccionado?.id === id) {
        this.estudianteSeleccionado = null;
      }
    }
  }
}