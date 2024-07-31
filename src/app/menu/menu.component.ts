import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen)
      document.body.classList.add('no-scroll');
    else
      document.body.classList.remove('no-scroll');
  }
  menuOff(){
    this.menuOpen = false;
    document.body.classList.remove('no-scroll');
  }
}
