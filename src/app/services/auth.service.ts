import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Service, signal, inject } from '@angular/core'

export interface User {
  id: number
}

export enum Role {
  Anonymous,
  Customer,
  Moderator,
  Administrator,
}

@Service()
export class AuthService {
  private readonly http = inject(HttpClient)

  readonly auth = signal<boolean>(false)
  readonly user = signal<User | null>(null)
  readonly role = signal<Role>(Role.Anonymous)

  login() {
    const csrfToken = crypto.randomUUID()
    window.localStorage.setItem('csrf-token', csrfToken)

    // Open oauth new tab from itch.io provider
    window.open(
      `https://itch.io/user/oauth?client_id=20d6d200a84c78b3bcd91f33af78691e&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Foauth.html&state=${csrfToken}`,
      '_blank',
    )

    const controller = new AbortController()
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.visibilityState === 'visible') {
          this.http
            .get<{
              accessToken: string
              csrfToken: string
            }>('/auth/grant_token', { credentials: 'include' })
            .subscribe({
              next: (tokens) => {
                // TODO: Verify CSRF Token and Save Access Token to Memory
                console.info(tokens)

                // Login successfully
                controller.abort()
              },
              error: (err: HttpErrorResponse) => console.error(err),
            })
        }
      },
      { signal: controller.signal },
    )
  }
}
