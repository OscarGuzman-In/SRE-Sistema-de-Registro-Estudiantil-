import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  @Input() estudiantes: Student[] = [];
  @Output() editar = new EventEmitter<Student>();
  @Output() eliminar = new EventEmitter<string>(); // Usamos numeroCarne como identificador único

  filtroBusqueda: string = '';

  get estudiantesFiltrados(): Student[] {
    if (!this.filtroBusqueda.trim()) {
      return this.estudiantes;
    }
    const texto = this.filtroBusqueda.toLowerCase().trim();
    return this.estudiantes.filter(e => 
      e.nombreCompleto.toLowerCase().includes(texto) ||
      e.numeroCarne.toLowerCase().includes(texto)
    );
  }

  onEditar(estudiante: Student): void {
    this.editar.emit(estudiante);
  }

  onEliminar(numeroCarne: string): void {
    if (confirm(`¿Está seguro de que desea eliminar al estudiante con carné ${numeroCarne}?`)) {
      this.eliminar.emit(numeroCarne);
    }
  }
}