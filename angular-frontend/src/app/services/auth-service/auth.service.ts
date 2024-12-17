import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../storage-service/local-storage.service';

const BASE_URL = environment['BASIC_URL'];
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {}

  register(signupDTO: any): Observable<any> {
    return this.http.post(BASE_URL + 'sign-up', signupDTO);
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        BASE_URL + 'authenticate',
        { username, password },
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((_) => this.log('User Authentication')),
        map((res: HttpResponse<any>) => {
          this.storageService.saveUserId(res.body.UserId);
          this.storageService.saveUserRole(res.body.role);
          const authHeader = res.headers.get(AUTH_HEADER);
          if (authHeader) {
            const tokenLength = authHeader.length;
            const bearerToken = authHeader.substring(7, tokenLength); 
            this.storageService.saveToken(bearerToken);
          } else {
            console.error('Authorization header not found in the response');
          }
          return res;
        })
      );
  }

  log(message: string) {
    console.log(`User Auth Service: ${message}`);
  }
}
