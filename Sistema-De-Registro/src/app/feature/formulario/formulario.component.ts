import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnChanges {
  @Input() estudianteEditar: Estudiante | null = null;
  @Input() listaEstudiantes: Estudiante[] = [];
  @Output() guardarEstudiante = new EventEmitter<Estudiante>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  estudianteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.estudianteForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      carnet: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(14), Validators.max(25)]],
      carrera: ['', Validators.required],
      jornada: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      aceptarReglamento: [false, Validators.requiredTrue]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estudianteEditar'] && this.estudianteEditar) {
      this.estudianteForm.patchValue(this.estudianteEditar);
    }
  }

  isInvalidField(field: string): boolean {
    const control = this.estudianteForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  onSubmit(): void {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      return;
    }

    const carnetVal = this.estudianteForm.value.carnet;
    const existeCarnet = this.listaEstudiantes.some(
      e => e.carnet === carnetVal && e.id !== this.estudianteEditar?.id
    );

    if (existeCarnet) {
      alert('El número de carné ya se encuentra registrado.');
      return;
    }

    this.guardarEstudiante.emit(this.estudianteForm.value);
    this.estudianteForm.reset({ aceptarReglamento: false });
  }

  onLimpiar(): void {
    this.estudianteForm.reset({ aceptarReglamento: false });
    this.cancelarEdicion.emit();
  }
}