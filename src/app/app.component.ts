import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { StaticModule } from './modules/static/static.module'

@Component({
  imports: [RouterOutlet, StaticModule],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {}
