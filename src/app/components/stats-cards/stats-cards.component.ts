import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  standalone: true,
  selector: 'app-stats-cards',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
})
export class StatsCardsComponent {
  @Input() stats: any[] = [];
}
