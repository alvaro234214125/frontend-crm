import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [
    CommonModule,
    TopbarComponent,
    ProfileHeaderComponent,
    ProfileFormComponent,
  ]
})
export class UserProfileComponent {
  private auth = inject(AuthService);
  user = this.auth.getCurrentUser();
}
