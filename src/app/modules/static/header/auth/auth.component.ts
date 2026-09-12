import { Component, inject } from '@angular/core'

import { AuthComponent as AuthButtonComponent } from '../../../../components/auth/auth.component'
import { AuthService } from '../../../../services/auth.service'

@Component({
  imports: [AuthButtonComponent],
  selector: 'app-header-auth',
  styleUrl: './auth.component.css',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  protected readonly authService = inject(AuthService)
}
