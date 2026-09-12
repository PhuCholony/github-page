import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { AuthService } from './services/auth.service'
import { SessionService } from './services/session.service'

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly authService = inject(AuthService)
  private readonly sessionService = inject(SessionService)

  async ngOnInit(): Promise<void> {
    if (!this.sessionService.authenticate()) return
    const payload = await this.sessionService.verify()
    if (Math.floor(Date.now() / 1000) > payload.exp - 3600) {
      this.sessionService.refresh().subscribe(async () => {
        const payload = await this.sessionService.verify()
        this.authService.login(payload)
      })
      return
    }
    this.authService.login(payload)
  }

  async ngOnDestroy(): Promise<void> {
    return
  }
}
