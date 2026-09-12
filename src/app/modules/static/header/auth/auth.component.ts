import { Component, inject } from '@angular/core'

import { AuthService } from '../../../../services/auth.service'
import { SessionService } from '../../../../services/session.service'

@Component({
  imports: [],
  selector: 'app-header-auth',
  styleUrl: './auth.component.css',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected readonly authService = inject(AuthService)
  private readonly sessionService = inject(SessionService)

  openProfile(): void {
    window.open(this.authService.user()?.url)
  }

  login(): void {
    this.sessionService.create()

    const controller = new AbortController()
    document.addEventListener(
      'visibilitychange',
      async () => {
        if (document.visibilityState == 'visible') {
          if (!this.sessionService.authenticate()) return
          const payload = await this.sessionService.verify()
          this.authService.login(payload)
        }
      },
      { signal: controller.signal },
    )
  }
}
