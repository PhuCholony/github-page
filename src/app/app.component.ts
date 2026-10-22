import { Component } from '@angular/core';

import { CopyrightComponent } from './components/copyright/copyright.component';

import { StaticModule } from './modules/static/static.module';

@Component({
  imports: [CopyrightComponent, StaticModule],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {}
