import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  pageName: string = "";
  constructor(public authService: AuthService) {}
  ngOnInit() {}

  onLoggedout() {
    this.authService.logOut();
  }
}
