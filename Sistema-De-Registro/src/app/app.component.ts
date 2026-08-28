import { Component } from '@angular/core';
import { FormularioComponent } from './feature/formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema-De-Registro';
}