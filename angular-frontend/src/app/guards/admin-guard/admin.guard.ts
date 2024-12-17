import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NzNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (LocalStorageService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/dashboard');
      this.notificationService.error(
        'Error',
        'You dont have access to this page',
        { nzDuration: 5000 }
      );
      return false;
    } else if (!LocalStorageService.hasToken()) {
      LocalStorageService.signOut();
      this.router.navigateByUrl('/login');
      this.notificationService.error(
        'Error',
        'You are not logged in. Please login first',
        { nzDuration: 5000 }
      );
      return false;
    }

    return true;
  }
}
