import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostProductComponent } from './components/post-product/post-product.component';

@NgModule({
  declarations: [DashboardComponent, PostCategoryComponent, PostProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
