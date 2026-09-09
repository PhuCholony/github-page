import { Component, inject } from '@angular/core'

import { AuthService } from '../../services/auth.service'

@Component({
  imports: [],
  selector: 'app-auth',
  styleUrl: './auth.component.css',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected readonly authService = inject(AuthService)
}
