import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile-header',
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
})
export class ProfileHeaderComponent {
  @Input() user: any;
}
