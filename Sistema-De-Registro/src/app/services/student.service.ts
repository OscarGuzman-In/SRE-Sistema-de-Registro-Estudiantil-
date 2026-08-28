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

  // Agregar un estudiante
  addStudent(student: Student): boolean {
    if (this.existeNumeroCarne(student.numeroCarne)) {
      return false;
    }

    this.estudiantes.push(student);
    return true;
  }

  // Actualizar un estudiante
  updateStudent(carneActual: string, cambios: Student): boolean {
    const index = this.estudiantes.findIndex(
      (student) =>
        student.numeroCarne.trim() === carneActual.trim()
    );

    // Si no existe el estudiante
    if (index === -1) {
      return false;
    }

    // Verificar que el nuevo carné no esté duplicado
    const carneDuplicado = this.estudiantes.some(
      (student, i) =>
        i !== index &&
        student.numeroCarne.trim() === cambios.numeroCarne.trim()
    );

    if (carneDuplicado) {
      return false;
    }

    this.estudiantes[index] = cambios;
    return true;
  }

  // Eliminar un estudiante
  deleteStudent(carne: string): boolean {
    const index = this.estudiantes.findIndex(
      (student) =>
        student.numeroCarne.trim() === carne.trim()
    );

    // Si no existe
    if (index === -1) {
      return false;
    }

    this.estudiantes.splice(index, 1);
    return true;
  }

  // Buscar estudiantes por nombre o número de carné
  searchStudents(termino: string): Student[] {
    const texto = termino.trim().toLowerCase();

    // Si no se escribe nada, mostrar todos
    if (!texto) {
      return this.getStudents();
    }

    return this.estudiantes.filter(
      (student) =>
        student.nombreCompleto.toLowerCase().includes(texto) ||
        student.numeroCarne.toLowerCase().includes(texto)
    );
  }

  // Obtener cantidad total de estudiantes
  getTotal(): number {
    return this.estudiantes.length;
  }

  // Verificar si existe un número de carné
  existeNumeroCarne(carne: string): boolean {
    return this.estudiantes.some(
      (student) =>
        student.numeroCarne.trim() === carne.trim()
    );
  }
}