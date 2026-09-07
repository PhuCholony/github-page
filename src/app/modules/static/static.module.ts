import { NgModule } from '@angular/core'

import { HeaderComponent } from './header/header.component'
import { NavbarComponent } from './navbar/navbar.component'
import { FooterComponent } from './footer/footer.component'

@NgModule({
  imports: [HeaderComponent, NavbarComponent, FooterComponent],
  exports: [HeaderComponent, NavbarComponent, FooterComponent],
})
export class StaticModule {}
