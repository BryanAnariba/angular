import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService);
  private router: Router = inject(Router);

  // Two forms of to get the current user
  public user = computed(() => this.authService.currentUser());
  /*get user () {
    return this.authService.currentUser();
  }*/

  onLogout(): void {
    this.authService.logout();
    //this.router.navigate(['/auth/login']);
  }
}
