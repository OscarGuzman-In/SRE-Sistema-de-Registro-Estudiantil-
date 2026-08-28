import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioComponent } from './feature/formulario/formulario.component';
import { TablaEstudiantesComponent } from './feature/tabla-estudiantes/tabla-estudiantes.component';

import { Student } from './models/student.model';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormularioComponent,
    TablaEstudiantesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  estudianteSeleccionado: Student | null = null;

  constructor(private studentService: StudentService) {}

  get listaEstudiantes(): Student[] {
    return this.studentService.getStudents();
  }

  guardarEstudiante(estudiante: Student): void {

    if (this.estudianteSeleccionado) {

      const resultado = this.studentService.updateStudent(
        this.estudianteSeleccionado.numeroCarne,
        estudiante
      );

      if (resultado) {
        this.estudianteSeleccionado = null;
      }

    } else {

      const resultado = this.studentService.addStudent(estudiante);

      if (!resultado) {
        alert('Ya existe un estudiante con ese número de carné.');
      }

    }
  }

  seleccionarParaEditar(estudiante: Student): void {
    this.estudianteSeleccionado = estudiante;
  }

  cancelarEdicion(): void {
    this.estudianteSeleccionado = null;
  }

  eliminarEstudiante(numeroCarne: string): void {

    if (confirm('¿Está seguro de eliminar este registro?')) {

      const eliminado = this.studentService.deleteStudent(numeroCarne);

      if (eliminado && this.estudianteSeleccionado?.numeroCarne === numeroCarne) {
        this.estudianteSeleccionado = null;
      }
    }
  }
}