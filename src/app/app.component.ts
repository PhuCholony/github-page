import { Component } from '@angular/core';

import { ProfileComponent } from './components/profile/profile.component';
import { TitleComponent } from './components/title/title.component';
import { BioComponent } from './components/bio/bio.component';
import { CopyrightComponent } from './components/copyright/copyright.component';

@Component({
  imports: [ProfileComponent, TitleComponent, BioComponent, CopyrightComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {}
