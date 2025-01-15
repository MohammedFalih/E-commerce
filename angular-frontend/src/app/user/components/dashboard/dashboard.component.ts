import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products = [];

  constructor(
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
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
