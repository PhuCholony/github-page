import { Component, inject } from '@angular/core'

import { HomeService } from './home.service'

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomePageComponent {
  private readonly homeService = inject(HomeService)
}
