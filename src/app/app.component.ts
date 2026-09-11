import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { User } from './services/auth.service'

import { AuthComponent } from './components/auth/auth.component'

@Component({
  imports: [RouterOutlet, AuthComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected user?: User

  setUserData(user: User) {
    this.user = user
  }
}
