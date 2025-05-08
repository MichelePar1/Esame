import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  protected authSrv = inject(AuthService);
  protected router = inject(Router);

  currentUser$ = this.authSrv.currentUser$;
  
  requestedUrl: string | null = null;
  logout() {
    this.authSrv.logout();
    this.router.navigate([this.requestedUrl ? this.requestedUrl : '/login']);
  }
}
