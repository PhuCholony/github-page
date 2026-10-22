import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [HeaderComponent, NavbarComponent],
  exports: [HeaderComponent, NavbarComponent],
})
export class StaticModule {}
