import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { CheckBackendStatusResModel, QRCodeScanResultModel, UploadImgReqModel, AuthorizationModel, UploadImgResModel} from '../../models/request.model';
import { isEmpty } from 'src/app/scan-page/utils/object.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPoint: string;
  qrCodeScanResult: string;
  uploadImageData: string;
  uploadedImageRes: UploadImgResModel;

  constructor(private httpService: HttpService) { }

  setQrCodeScanResult(res): void {
    this.qrCodeScanResult = res;
  }

  getQrCodeScanResult(): QRCodeScanResultModel {
    const res = JSON.parse(this.qrCodeScanResult);
    console.log('getQrCodeScanResult', res);
    const text = (!isEmpty(res.text)) ? res.text : '';
    const apiserver = !isEmpty(text) ? text.split(';')[0].replace('apiserver:', '').replace(/\s*/g, '') : '';
    const user = !isEmpty(text) ? text.split(';')[1].replace('user:', '').replace(/\s*/g, '') : '';
    const password = !isEmpty(text) ? text.split(';')[2].replace('password:', '').replace(/\s*/g, '') : '';
    const qrCodeScanRes = new QRCodeScanResultModel(apiserver, user, password);
    console.log('qrCodeScanRes+++++++', qrCodeScanRes);
    return qrCodeScanRes;
  }

  checkBackendStatus(url: string): Promise<any> {
    return this.httpService.get(`${url}`);
  }

  uploadImg(url: string, req: any, authorization: any): Promise<any> {
    return this.httpService.post(url, req, authorization).then(uploadRes => {
      return uploadRes;
    });
  }

  setUploadImageRes(res: UploadImgResModel): void {
    this.uploadedImageRes = res;
  }

  getUploadImageRes(): UploadImgResModel {
    return this.uploadedImageRes;
  }

  getUploadedImg(url): Promise<any> {
    return this.httpService.getImageBlob(`${url}`);
  }

}
