import { Injectable } from '@angular/core';

const TOKEN = 'I_token';
const USERID = 'I_user';
const USERROLE = 'I_role';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveUserId(userid: any) {
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID, userid);
  }

  saveUserRole(userRole: any) {
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE, userRole);
  }

  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(USERID));
  }

  // static getUserId() {
  //   const user = this.getUser();
  //   if (user == null) return null;
  //   console.log('user: ', user);
  //   console.log('user id: ', user.userId);
  //   return user;
  // }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  static getUserRole(): string {
    if (this.getToken() === null) {
      return '';
    }
    return localStorage.getItem(USERROLE);
  }

  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }

    const role: string = this.getUserRole();
    return role == 'USER';
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }

    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
  }
}
