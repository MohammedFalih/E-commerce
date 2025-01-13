import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  id: number = this.activatedRouter.snapshot.params['id'];

  constructor(
    private adminService: AdminService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.adminService.getProductById(this.id).subscribe((res) => {
      console.log('ProductById: ', res);
    });
  }
}
