import { Component, inject } from '@angular/core'

import { AuthService } from '../../services/auth.service'
import { Cookie } from '../../utils/cookie'
import { Jwt } from '../../lib/jwt'

@Component({
  imports: [],
  selector: 'app-auth',
  styleUrl: './auth.component.css',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected readonly authService = inject(AuthService)

  private authCheckInternal?: number

  login(): void {
    const csrfToken = crypto.randomUUID()
    window.sessionStorage.setItem('csrf-token', csrfToken)
    window.open(
      `https://itch.io/user/oauth?client_id=20d6d200a84c78b3bcd91f33af78691e&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Foauth.html&state=${csrfToken}`,
      '_blank',
    )
    this.authEventListener()
  }

  private authEventListener(): void {
    const controller = new AbortController()
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState == 'visible') {
          this.authCheckInternal = setInterval(async () => {
            const jwt = Cookie.get('AT')
            if (!jwt) return

            const payload = await Jwt.decode(jwt)
            this.authService.login({ id: payload.uid })

            controller.abort()
          }, 1000)
        } else if (document.visibilityState == 'hidden') {
          clearInterval(this.authCheckInternal)
        }
      },
      { signal: controller.signal },
    )
  }
}
