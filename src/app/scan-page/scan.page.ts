import { Component } from '@angular/core';
import { CameraService } from '../services/camera/camera.service';
import { HttpService } from '../services/http/http.service';
import { CheckBackendStatusResModel, QRCodeScanResultModel } from '../models/request.model';
import * as commCon from '../shared/common.constant';

@Component({
  selector: 'app-scan-page',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})
export class ScanPage {
  backendStatusRes: CheckBackendStatusResModel;
  backendStatus: string;
  qrCodeScanResult: QRCodeScanResultModel;

  constructor(private cameraService: CameraService,
              private httpService: HttpService) {

  }

  // doQRCodeScanner() {
  //   const res = this.cameraService.doBarCodeScanner();
  //   console.log(res);
  //   this.qrCodeScanResultHandling(res);
  // }

  // qrCodeScanResultHandling(res) {
  //   this.qrCodeScanResult = QRCodeScanResultModel.build(res);
  // }

  // checkBackendStatus(res) {
  //   this.backendStatusRes = CheckBackendStatusResModel.build(res);
  //   this.backendStatus = this.backendStatusRes.status;
  //   // =  this.backendStatusRes.status ? commCon['BACKENDSTATUSOK'] : false;

  // }
}
