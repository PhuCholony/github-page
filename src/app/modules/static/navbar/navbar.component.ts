import { Component } from '@angular/core'

import { ThemeComponent } from './theme/theme.component'

@Component({
  imports: [ThemeComponent],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
