import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss'],
})
export class PostProductComponent implements OnInit {
  constructor(private adminServie: AdminService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.adminServie.getAllCategories().subscribe((res) => {
      console.log('All Categories: ', res);
    });
  }
}
