import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
      >Counter</a>
      <a routerLink="/hero" routerLinkActive="active">Hero</a>
      <a routerLink="/dragonball" routerLinkActive="active">Dragonball</a>
      <a routerLink="/dragonball-super" routerLinkActive="active">Dragonball Super</a>
    </nav>
  `,
  styles: `
    nav {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      background-color: #212121;
      color: white;
    }

    nav a {
      color:rgb(109, 109, 109);
      text-decoration: none;
    }

    nav a.active {
      color: white;
    }
  `
})
export class NavbarComponent {

}
