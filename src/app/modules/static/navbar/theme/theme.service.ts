import { Service, signal, effect } from '@angular/core'

export enum Theme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

@Service()
export class ThemeService {
  readonly currentTheme = signal<Theme>(this.getTheme())

  constructor() {
    effect(() => {
      const theme = this.currentTheme()
      localStorage.setItem('theme-preference', theme)
      this.preferTheme(theme)
    })

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.currentTheme() === Theme.System) this.setTheme(Theme.System)
      })
  }

  getTheme(): Theme {
    return (localStorage.getItem('theme-preference') as Theme) || Theme.System
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme)
  }

  private preferTheme(theme: Theme): void {
    const rootElement = document.documentElement
    let isDarkTheme = theme === Theme.Dark

    if (theme === Theme.System)
      isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    rootElement.setAttribute('theme-color', isDarkTheme ? 'dark' : 'light')
    rootElement.style.colorScheme = isDarkTheme ? 'dark' : 'light'
  }
}
