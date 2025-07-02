import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile-section',
  imports: [CommonModule],
  templateUrl: './profile-section.component.html',
})
export class ProfileSectionComponent {
  @Input() user: any;
  @Input() collapsed = false;
  @Output() onLogout = new EventEmitter<void>();
  @Output() onPerfil = new EventEmitter<void>();
  @ViewChild('container') containerRef!: ElementRef;

  open = false;

  toggleOpen() {
    this.open = !this.open;
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.open = false;
    }
  }

  getInitials(name: string = ''): string {
    const words = name.trim().split(' ');
    return words[0].charAt(0);
  }
}
