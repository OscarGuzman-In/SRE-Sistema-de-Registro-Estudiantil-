import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private estudiantes: Student[] = [];

  // Obtener todos los estudiantes
  getStudents(): Student[] {
    return [...this.estudiantes];
  }

  // Registrar un nuevo estudiante
  addStudent(student: Student): boolean {
    if (this.existeNumeroCarne(student.numeroCarne)) {
      return false;
    }

    this.estudiantes.push(student);
    return true;
  }

  // Actualizar un estudiante usando su carné actual
  updateStudent(carneActual: string, cambios: Student): boolean {

    const index = this.estudiantes.findIndex(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        carneActual.trim().toLowerCase()
    );

    if (index === -1) {
      return false;
    }

    // Evitar que el nuevo carné pertenezca a otro estudiante
    const carneDuplicado = this.estudiantes.some(
      (estudiante, i) =>
        i !== index &&
        estudiante.numeroCarne.trim().toLowerCase() ===
        cambios.numeroCarne.trim().toLowerCase()
    );

    if (carneDuplicado) {
      return false;
    }

    this.estudiantes[index] = cambios;
    return true;
  }

  // Eliminar un estudiante usando su carné
  deleteStudent(numeroCarne: string): boolean {

    const index = this.estudiantes.findIndex(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        numeroCarne.trim().toLowerCase()
    );

    if (index === -1) {
      return false;
    }

    this.estudiantes.splice(index, 1);
    return true;
  }

  // Buscar por nombre completo o número de carné
  searchStudents(termino: string): Student[] {

    const texto = termino.trim().toLowerCase();

    if (!texto) {
      return this.getStudents();
    }

    return this.estudiantes.filter(
      estudiante =>
        estudiante.nombreCompleto.toLowerCase().includes(texto) ||
        estudiante.numeroCarne.toLowerCase().includes(texto)
    );
  }

  // Obtener cantidad total de estudiantes
  getTotal(): number {
    return this.estudiantes.length;
  }

  // Verificar si un número de carné ya existe
  existeNumeroCarne(numeroCarne: string): boolean {

    return this.estudiantes.some(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        numeroCarne.trim().toLowerCase()
    );
  }
}