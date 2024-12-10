// ng-zorro.module.ts
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import all NG-ZORRO modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// Add additional NG-ZORRO modules as needed

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NG-ZORRO modules
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzRadioModule,
    NzSwitchModule,
    NzMenuModule,
    NzTabsModule,
    NzMessageModule,
    NzNotificationModule,
    NzToolTipModule,
    NzDrawerModule,
    NzCardModule,
    NzSpinModule,
    NzDropDownModule,
    NzPaginationModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // NG-ZORRO modules
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzRadioModule,
    NzSwitchModule,
    NzMenuModule,
    NzTabsModule,
    NzMessageModule,
    NzNotificationModule,
    NzToolTipModule,
    NzDrawerModule,
    NzCardModule,
    NzSpinModule,
    NzDropDownModule,
    NzPaginationModule,
  ]
})
export class NgZorroModule {}
