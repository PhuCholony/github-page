import { Component, effect, inject, output } from '@angular/core'

import { AuthService, Payload, User, Role } from '../../services/auth.service'

@Component({
  imports: [],
  selector: 'app-auth',
  styleUrl: './auth.component.css',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected readonly authService = inject(AuthService)

  user = output<User>()

  constructor() {
    effect(() => {
      const user = this.authService.user()
      if (!user) return
      this.user.emit(user)
    })
  }

  login(): void {
    const csrfToken = this.generateCsrfToken()

    window.open(
      `https://itch.io/user/oauth?client_id=20d6d200a84c78b3bcd91f33af78691e&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Foauth.html&state=${csrfToken}`,
      '_blank',
    )

    const controller = new AbortController()
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState == 'visible') {
          const jwt = this.getCookie('AT')
          if (!jwt) return
          this.authService.checkJwt(jwt).subscribe({
            next: (res) => {
              const payload: Payload = JSON.parse(atob(jwt.split('.')[1]))
              this.authService.auth.set(true)
              this.authService.user.set({
                id: payload.sub,
              })
              this.authService.role.set(Role.Customer)
            },
            complete: () => controller.abort(),
          })
        }
      },
      { signal: controller.signal },
    )
  }

  /** TODO: Move this function to cookie utils */
  getCookie(name: string): string | null {
    // Split cookie string into individual name=value pairs
    const cookies = document.cookie.split(';')

    // Loop through each cookie
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()

      // Check if this cookie string begins with the name we want
      if (cookie.startsWith(name + '=')) {
        // Return the cookie value decoded
        return decodeURIComponent(cookie.substring(name.length + 1))
      }
    }
    // Return null if the cookie wasn't found
    return null
  }

  private generateCsrfToken(): string {
    let csrfToken = window.sessionStorage.getItem('csrf-token')
    if (!csrfToken) {
      csrfToken = crypto.randomUUID()
      window.sessionStorage.setItem('csrf-token', csrfToken)
    }
    return csrfToken
  }
}
