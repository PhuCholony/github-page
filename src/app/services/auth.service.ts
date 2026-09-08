import { Service, signal } from '@angular/core'

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
          // TODO: Send request grant token with credentials
          console.log('Tab is active and visible')

          // Login successfully
          controller.abort()
        }
      },
      { signal: controller.signal },
    )
  }
}
