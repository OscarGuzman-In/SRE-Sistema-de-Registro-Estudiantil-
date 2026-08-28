import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input() estudianteEditar: Estudiante | null = null;
  @Input() listaEstudiantes: Estudiante[] = [];

  @Output() guardarEstudiante = new EventEmitter<Estudiante>();
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
    this.formulario = this.fb.group({
      carnet: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(15), Validators.max(80)]],
      carrera: ['', [Validators.required]],
      jornada: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      aceptaReglamento: [false, [Validators.requiredTrue]]
    });
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