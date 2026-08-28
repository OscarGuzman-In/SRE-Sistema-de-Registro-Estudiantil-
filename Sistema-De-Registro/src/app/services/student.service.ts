import { Injectable } from '@angular/core';

import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private estudiantes: Student[] = [];

  getStudents(): Student[] {
    return [...this.estudiantes];
  }

  addStudent(student: Student): boolean {
    if (this.existeNumeroCarne(student.numeroCarne)) {
      return false;
    }
    this.estudiantes.push(student);
    return true;
  }

  updateStudent(carneActual: string, cambios: Student): boolean {
    const index = this.estudiantes.findIndex(
      (s) => s.numeroCarne.trim() === carneActual.trim()
    );
    if (index === -1) {
      return false;
    }
    const carneDuplicado = this.estudiantes.some(
      (s, i) => i !== index && s.numeroCarne.trim() === cambios.numeroCarne.trim()
    );
    if (carneDuplicado) {
      return false;
    }
    this.estudiantes[index] = cambios;
    return true;
  }

  deleteStudent(carne: string): boolean {
    const index = this.estudiantes.findIndex(
      (s) => s.numeroCarne.trim() === carne.trim()
    );
    if (index === -1) {
      return false;
    }
    this.estudiantes.splice(index, 1);
    return true;
  }

  searchStudents(termino: string): Student[] {
    const t = termino.trim().toLowerCase();
    if (!t) {
      return this.getStudents();
    }
    return this.estudiantes.filter(
      (s) =>
        s.nombreCompleto.toLowerCase().includes(t) ||
        s.numeroCarne.toLowerCase().includes(t)
    );
  }

  getTotal(): number {
    return this.estudiantes.length;
  }

  existeNumeroCarne(carne: string): boolean {
    return this.estudiantes.some(
      (s) => s.numeroCarne.trim() === carne.trim()
    );
  }
}