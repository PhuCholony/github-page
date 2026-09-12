import { Component } from '@angular/core'

import { AuthComponent } from './auth/auth.component'

@Component({
  imports: [AuthComponent],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
