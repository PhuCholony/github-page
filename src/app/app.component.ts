import { Component, signal } from '@angular/core'

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly title = signal('PhuCholony')
}
