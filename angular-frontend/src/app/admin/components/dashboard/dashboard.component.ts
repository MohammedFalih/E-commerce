import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products = [];

  constructor(
    private adminService: AdminService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.adminService.getAllProducts().subscribe((res) => {
      console.log('All products: ', res);
      res.forEach((element) => {
        element.processedImage =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.products.push(element);
      });
    });
  }

  onDeleteProduct(productId: number) {
    console.log(productId);
    this.adminService.deleteProduct(productId).subscribe((res) => {
      console.log('product deleted: ', res);
      this.notification.success('SUCCESS', 'Product deleted successfully', {
        nzDuration: 5000,
      });
      this.getAllProducts();
    });
  }
}
