import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
})
export class PostCategoryComponent {
  isSpinning: boolean = false;
  categoryForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  postCategory() {
    this.isSpinning = true;
    this.adminService.postCategory(this.categoryForm.value).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      if (res.id !== null) {
        this.notification.success('Success', 'Category Added Successfully', {
          nzDuration: 5000,
        });
      } else {
        this.notification.error('Oops!', `{res.message}`, { nzDuration: 5000 });
      }
    });
  }
}
