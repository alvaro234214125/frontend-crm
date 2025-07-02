import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'app-stats-cards',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './stats-cards.component.html',
})
export class StatsCardsComponent {
  @Input() stats: any[] = [];
}
