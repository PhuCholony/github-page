import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { AuthService } from './services/auth.service'

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly authService = inject(AuthService) // Oauth Testing
}
