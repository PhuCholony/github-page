import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { AuthService } from './services/auth.service'
import { AuthComponent } from './components/auth/auth.component'
import { Cookie } from './utils/cookie'
import { Jwt } from './lib/jwt'

@Component({
  imports: [RouterOutlet, AuthComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService)

  ngOnInit(): void {
    this.isAuthenticate()
  }

  ngOnDestroy(): void {
    return
  }

  private async isAuthenticate(): Promise<void> {
    const jwt = Cookie.get('AT')
    if (!jwt) return

    const payload = await Jwt.decode(jwt)
    this.authService.login({ id: payload.uid })
  }
}
