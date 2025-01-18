import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/storage-service/local-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  createAuthorization(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      `Authorization`,
      `Bearer ` + LocalStorageService.getToken()
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + 'api/customer/products', {
      headers: this.createAuthorization(),
    });
  }

  searchProduct(title: string): Observable<any> {
    return this.http.get<[]>(
      BASIC_URL + 'api/customer/product/search/' + title,
      {
        headers: this.createAuthorization(),
      }
    );
  }

  addProductToCart(productId): Observable<any> {
    let cartDTO = {
      productId: productId,
      userId: LocalStorageService.getUser(),
    };
    console.log('cartdto: ', cartDTO);

    return this.http.post<[]>(BASIC_URL + 'api/customer/cart', cartDTO, {
      headers: this.createAuthorization(),
    });
  }
}
