import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-tabla-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrls: ['./tabla-estudiantes.component.scss']
})
export class TablaEstudiantesComponent {

  @Input() estudiantes: Student[] = [];

  @Output() editar = new EventEmitter<Student>();
  @Output() eliminar = new EventEmitter<string>();

  onEditar(estudiante: Student): void {
    this.editar.emit(estudiante);
  }

  onEliminar(numeroCarne: string): void {
    this.eliminar.emit(numeroCarne);
  }
}