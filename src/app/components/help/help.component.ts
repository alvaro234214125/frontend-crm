import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-help',
  imports: [CommonModule, TopbarComponent, FontAwesomeModule],
  templateUrl: './help.component.html',
})
export class HelpComponent {
  icon = faHandsHelping;

  integrantes = [
    { nombre: 'Alvaro Cesar Diaz Chang', codigo: 'I202224528' },
    { nombre: 'Brayan Smith Cordova Tasayco', codigo: 'I202221331' },
    { nombre: 'Jean Paul Davila Manrique', codigo: 'I202224468' },
    { nombre: 'Johan Jair Monge Ruiz', codigo: 'I202224539' },
    { nombre: 'Pool Matias Espinoza Grandos', codigo: 'I202224426' },
    { nombre: 'Daniel Rolando Pizarro Quispe', codigo: 'I202224275' },
  ];
}
