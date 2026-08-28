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

developer
  // Registrar un nuevo estudiante

  // Agregar un estudiante
feature/listado
  addStudent(student: Student): boolean {
    if (this.existeNumeroCarne(student.numeroCarne)) {
      return false;
    }

    this.estudiantes.push(student);
    return true;
  }

developer
  // Actualizar un estudiante usando su carné actual
  updateStudent(carneActual: string, cambios: Student): boolean {

    const index = this.estudiantes.findIndex(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        carneActual.trim().toLowerCase()
    );
  // Actualizar un estudiante
  updateStudent(carneActual: string, cambios: Student): boolean {
    const index = this.estudiantes.findIndex(
      (student) =>
        student.numeroCarne.trim() === carneActual.trim()
    );

    // Si no existe el estudiante
 feature/listado
    if (index === -1) {
      return false;
    }

developer
    // Evitar que el nuevo carné pertenezca a otro estudiante
    const carneDuplicado = this.estudiantes.some(
      (estudiante, i) =>
        i !== index &&
        estudiante.numeroCarne.trim().toLowerCase() ===
        cambios.numeroCarne.trim().toLowerCase()

    // Verificar que el nuevo carné no esté duplicado
    const carneDuplicado = this.estudiantes.some(
      (student, i) =>
        i !== index &&
        student.numeroCarne.trim() === cambios.numeroCarne.trim()
    feature/listado
    );

    if (carneDuplicado) {
      return false;
    }

    this.estudiantes[index] = cambios;
    return true;
  }

developer
  // Eliminar un estudiante usando su carné
  deleteStudent(numeroCarne: string): boolean {

    const index = this.estudiantes.findIndex(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        numeroCarne.trim().toLowerCase()
    );
  // Eliminar un estudiante
  deleteStudent(carne: string): boolean {
    const index = this.estudiantes.findIndex(
      (student) =>
        student.numeroCarne.trim() === carne.trim()
    );

    // Si no existe
feature/listado
    if (index === -1) {
      return false;
    }

    this.estudiantes.splice(index, 1);
    return true;
  }
developer
  // Buscar por nombre completo o número de carné
  searchStudents(termino: string): Student[] {

    const texto = termino.trim().toLowerCase();

  // Buscar estudiantes por nombre o número de carné
  searchStudents(termino: string): Student[] {
    const texto = termino.trim().toLowerCase();

    // Si no se escribe nada, mostrar todos
feature/listado
    if (!texto) {
      return this.getStudents();
    }

    return this.estudiantes.filter(
developer
      estudiante =>
        estudiante.nombreCompleto.toLowerCase().includes(texto) ||
        estudiante.numeroCarne.toLowerCase().includes(texto)
      (student) =>
        student.nombreCompleto.toLowerCase().includes(texto) ||
        student.numeroCarne.toLowerCase().includes(texto)
feature/listado
    );
  }

  // Obtener cantidad total de estudiantes
  getTotal(): number {
    return this.estudiantes.length;
  }

developer
  // Verificar si un número de carné ya existe
  existeNumeroCarne(numeroCarne: string): boolean {

    return this.estudiantes.some(
      estudiante =>
        estudiante.numeroCarne.trim().toLowerCase() ===
        numeroCarne.trim().toLowerCase()

  // Verificar si existe un número de carné
  existeNumeroCarne(carne: string): boolean {
    return this.estudiantes.some(
      (student) =>
        student.numeroCarne.trim() === carne.trim()
feature/listado
    );
  }
}