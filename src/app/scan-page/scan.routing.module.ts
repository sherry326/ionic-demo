import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanPage } from './scan.page';
import { ScanQrcodeComponent } from './scan-qrcode/scan-qrcode.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { UploadedPictureComponent } from './uploaded-picture/uploaded-picture.component';

const routes: Routes = [
  {
    path: 'scan',
    component: ScanPage,
    children: [
      {
        path: 'scanCode',
        component: ScanQrcodeComponent
      },
      {
        path: 'takePhoto',
        component: TakePhotoComponent
      },
      {
        path: 'uploadedPic',
        component: UploadedPictureComponent
      },
      {
        path: '',
        redirectTo: '/scan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/scan/scanCode',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanPageRoutingModule {}
