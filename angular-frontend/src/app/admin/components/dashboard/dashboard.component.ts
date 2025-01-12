import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.adminService.getAllProducts().subscribe((res) => {
      console.log('All products: ', res);
      res.forEach((element) => {
        element.processedImage =
          'data:image/jpeg;base64,' + element.returnedImage;
        this.products.push(element);
      });
    });
  }
}
