import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit, OnChanges {

  @Input() estudianteEditar: Student | null = null;
  @Input() listaEstudiantes: Student[] = [];

  @Output() guardarEstudiante = new EventEmitter<Student>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  formulario!: FormGroup;

  carrerasDisponibles: string[] = [
    'Perito en Informática',
    'Perito Dibujante Técnico de Arquitectura',
    'Perito en Electricidad Industrial',
    'Perito en Electrónica Industrial',
    'Perito en Mecánica Automotriz',
    'Ingeniería en Sistemas',
    'Ingeniería Industrial'
  ];
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteEditar'] && this.formulario) {
      if (this.estudianteEditar) {
        this.formulario.patchValue(this.estudianteEditar);
      } else {
        this.formulario.reset();
      }
    }
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      numeroCarne: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(14), Validators.max(25)]],
      carrera: ['', [Validators.required]],
      jornada: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      aceptaReglamento: [false, [Validators.requiredTrue]]
    });

    if (this.estudianteEditar) {
      this.formulario.patchValue(this.estudianteEditar);
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.guardarEstudiante.emit(this.formulario.value);
      this.formulario.reset();
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  onLimpiar(): void {
    this.formulario.reset();
    this.cancelarEdicion.emit();
  }
}