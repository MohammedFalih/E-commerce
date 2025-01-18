import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products = [];
  size: NzButtonSize = 'large';
  searchForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title: [null],
    });

    this.getAllProducts();
  }

  onSearchProduct() {
    this.products = [];
    this.customerService
      .searchProduct(this.searchForm.get(['title'])!.value)
      .subscribe((res) => {
        res.forEach((element) => {
          element.processedImage =
            'data:image/jpeg;base64,' + element.returnedImage;
          this.products.push(element);
        });
      });
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe((res) => {
      console.log('All products: ', res);
      res.forEach((element) => {
        element.processedImage =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.products.push(element);
      });
    });
  }

  addProductToCart(productId: number) {
    console.log('product id: ', productId);
    this.customerService.addProductToCart(productId).subscribe((res) => {
      console.log('Add product to cart: ', res);
      this.notification.success("SUCCESS", 'Product added to cart', {nzDuration: 5000})
    }, error => {
      console.log('Error', error)
      this.notification.error("ERROR", 'Product already exists in cart', {nzDuration: 5000})
    })
  }
}
