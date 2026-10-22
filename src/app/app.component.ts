import { Component } from '@angular/core';

import { ProfileComponent } from './components/profile/profile.component';
import { CopyrightComponent } from './components/copyright/copyright.component';

import { StaticModule } from './modules/static/static.module';

@Component({
  imports: [ProfileComponent, CopyrightComponent, StaticModule],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {}
