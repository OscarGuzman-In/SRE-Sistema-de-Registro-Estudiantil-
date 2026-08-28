import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-tabla-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrls: ['./tabla-estudiantes.component.scss']
})
export class TablaEstudiantesComponent {
  @Input() estudiantes: Estudiante[] = [];
  @Output() editar = new EventEmitter<Estudiante>();
  @Output() eliminar = new EventEmitter<number>();

  onEditar(estudiante: Estudiante): void {
    this.editar.emit(estudiante);
  }

  onEliminar(id?: number): void {
    if (id !== undefined) {
      this.eliminar.emit(id);
    }
  }
}