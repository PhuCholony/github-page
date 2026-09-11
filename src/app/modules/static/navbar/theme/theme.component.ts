import { Component, inject } from '@angular/core'

import { Theme, ThemeService } from './theme.service'

@Component({
  imports: [],
  selector: 'app-navbar-theme',
  styleUrl: './theme.component.css',
  templateUrl: './theme.component.html',
})
export class ThemeComponent {
  protected readonly themeService = inject(ThemeService)
  protected readonly theme = Theme

  toggleTheme(): void {
    switch (this.themeService.currentTheme()) {
      default:
      case Theme.System:
        this.themeService.setTheme(Theme.Light)
        break

      case Theme.Light:
        this.themeService.setTheme(Theme.Dark)
        break

      case Theme.Dark:
        this.themeService.setTheme(Theme.System)
        break
    }
  }
}
