import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { element } from 'protractor';

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
    private fb: FormBuilder
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
}
