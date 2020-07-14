import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../services/camera/camera.service';
import { UserService } from '../../services/api/user.service';
import { CheckBackendStatusResModel, QRCodeScanResultModel } from '../../models/request.model';
import * as commCon from '../../shared/common.constant';
import {Router} from '@angular/router';
import { isEmpty } from '../utils/object.utils';

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.scss'],
})
export class ScanQrcodeComponent implements OnInit {

  constructor(private cameraService: CameraService,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {}

  doQRCodeScanner(): void {
      this.cameraService.doBarCodeScanner().then(data => {
        this.qrCodeScanResultHandling(data);
     });
  }

  qrCodeScanResultHandling(res): void {

    const routerUrl = '/scan/takePhoto';
    const qrCodeScanResult = res;

    this.userService.setQrCodeScanResult(qrCodeScanResult);
    this.router.navigateByUrl(routerUrl);

  }


}
