import { Component } from '@angular/core';

import { StaticModule } from './modules/static/static.module';

@Component({
  imports: [StaticModule],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {}
