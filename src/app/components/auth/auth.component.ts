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

  login(): void {
    const csrfToken = crypto.randomUUID()
    window.sessionStorage.setItem('csrf-token', csrfToken)
    window.open(
      `https://itch.io/user/oauth?client_id=20d6d200a84c78b3bcd91f33af78691e&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Foauth.html&state=${csrfToken}`,
      '_blank',
    )
  }
}
