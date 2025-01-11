import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createAuthorization(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      `Authorization`,
      `Bearer ` + LocalStorageService.getToken()
    );
  }

  postCategory(category: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + 'api/admin/category', category, {
      headers: this.createAuthorization(),
    })
  }

  getAllCategories(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorization(),
    })
  }
}
