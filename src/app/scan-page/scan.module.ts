import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScanPageRoutingModule } from './scan.routing.module';

import { ScanPage } from './scan.page';
import { ScanQrcodeComponent } from './scan-qrcode/scan-qrcode.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { UploadedPictureComponent } from './uploaded-picture/uploaded-picture.component';
import { LoadingComponent } from './take-photo/loading/loading.component';
import { PageLoadingComponent } from './uploaded-picture/page-loading/page-loading.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanQrcodeComponent, TakePhotoComponent, UploadedPictureComponent, LoadingComponent, PageLoadingComponent, ScanPage],
  entryComponents: [LoadingComponent, PageLoadingComponent]
})
export class ScanPageModule {}
