import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  id: number = this.activatedRouter.snapshot.params['id'];
  isSpinning: boolean = false;
  updateProductForm!: FormGroup;
  categories: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  selectedFile: any;
  imgChanged = false;

  constructor(
    private adminService: AdminService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateProductForm = this.fb.group({
      categoryId: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.getProductById();
    this.getAllCategories();
  }

  getProductById() {
    this.adminService.getProductById(this.id).subscribe((res) => {
      console.log('ProductById: ', res);
      const product = res;
      this.updateProductForm.patchValue(product);
      this.existingImage = 'data:image/jpeg;base64,' + product.returnedImage;
      this.updateProductForm
        .get('categoryId')
        .setValue(res.categoryId.toString());
    });
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe((res) => {
      this.categories = res;
      console.log('All Categories: ', res);
    });
  }

  updateProduct() {
    const productDTO: FormData = new FormData();
    if (this.imgChanged) {
      productDTO.append('image', this.selectedFile);
    }
    productDTO.append('name', this.updateProductForm.get('name').value);
    productDTO.append('price', this.updateProductForm.get('price').value);
    productDTO.append(
      'description',
      this.updateProductForm.get('description').value
    );

    this.adminService
      .updateProduct(
        this.updateProductForm.get('categoryId').value,
        this.id,
        productDTO
      )
      .subscribe((res) => {
        console.log('Update product response: ', res);
        if (res != null) {
          this.notification.success('SUCCESS', 'Product updated successfully', {
            nzDuration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.notification.success('ERROR', 'Something went wrong', {
            nzDuration: 5000,
          });
        }
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }
}
