import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss'],
})
export class PostProductComponent implements OnInit {
  isSpinning = false;
  categories: any;
  postProductForm!: FormGroup;
  selectedFile: File | null;

  constructor(
    private adminServie: AdminService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.adminServie.getAllCategories().subscribe((res) => {
      this.categories = res;
      console.log('All Categories: ', res);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  postProduct() {
    const productData: FormData = new FormData();
    productData.append('image', this.selectedFile);
    productData.append('name', this.postProductForm.get(['name'])!.value);
    productData.append('price', this.postProductForm.get(['price'])!.value);
    productData.append(
      'description',
      this.postProductForm.get(['description'])!.value
    );
    this.adminServie
      .postProduct(this.postProductForm.get(['categoryId'])!.value, productData)
      .subscribe((res) => {
        console.log(res);
        if (res.id !== null) {
          this.notification.success('Success', 'Category Added Successfully', {
            nzDuration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.notification.error('Oops!', `{res.message}`, {
            nzDuration: 5000,
          });
        }
      });
  }
}
