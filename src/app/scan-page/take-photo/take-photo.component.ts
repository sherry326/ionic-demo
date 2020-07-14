import { Component, OnInit } from '@angular/core';
import { CheckBackendStatusResModel, QRCodeScanResultModel, UploadImgReqModel, AuthorizationModel, UploadImgResModel } from '../../models/request.model';
import { UserService } from '../../services/api/user.service';
import { CameraService } from '../../services/camera/camera.service';
import * as commCon from '../../shared/common.constant';
import { isEmpty } from '../utils/object.utils';
import {Router} from '@angular/router';


@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss'],
})
export class TakePhotoComponent implements OnInit {
  backendStatusCheckReqUrl: string;
  enableTakePhotoFlag: boolean;
  checkLoadingFlag: boolean;

  constructor( private userService: UserService,
               private cameraService: CameraService,
               private router: Router) {
    this.backendStatusCheckReqUrl = '';
    this.enableTakePhotoFlag = false;
    this.checkLoadingFlag = false;
   }

  ngOnInit() {
    this.backendStatusCheckReqUrl = this.buildBackendStatusReq();
  }

  buildBackendStatusReq(): string {
    const qrCodeScanResult = this.userService.getQrCodeScanResult();
    const apiserver = (!isEmpty(qrCodeScanResult) && !isEmpty(qrCodeScanResult.apiserver)) ? qrCodeScanResult.apiserver : '';
    const endpoint = commCon['BACKENDSTATUS_URL'];
    const reqUrl = apiserver + endpoint;

    return reqUrl;
  }

  checkBackendStatus(): void {

    this.checkLoadingFlag = true;

    const req = this.backendStatusCheckReqUrl;

    this.userService.checkBackendStatus(req).then( res => {
      const statusRes = res;
      const status = (!isEmpty(statusRes) && !isEmpty(statusRes.status)) ? statusRes.status : '';

      this.enableTakePhotoFlag =  (status === commCon['BACKENDSTATUS_OK']) ? true : false;
      this.checkLoadingFlag = false;

    } , err => {
      console.log(err);
    });

  }

  takePhoto(): void {
    this.cameraService.takePicture().then(data => {
      this.buildUploadImgDataReq(data);
   });
  }

  uploadImgData(url, uploadReqBody, authorization) {
    const routerUrl = '/scan/uploadedPic';

    this.userService.uploadImg(url, uploadReqBody, authorization).then( uploadedRes => {

      this.userService.setUploadImageRes(uploadedRes);
      this.router.navigateByUrl(routerUrl);

    } , err => {
      alert(err);
    });
  }

  buildUploadImgDataReq(imgData) {
    const uploadedPicUrl = commCon['UPLOADIMG_URL'];
    const url = this.userService.getQrCodeScanResult().apiserver + uploadedPicUrl;
    const imageData = 'data:image/png;base64,' + imgData;

    // const mockImg = "iVBORw0KGgoAAAANSUhEUgAAAD8AAABBCAMAAABRqYxcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABFUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANzq6vcAAAAWdFJOUwBkdICHi4+Tl5ufo6uvs7/P5+/z9/sRMRWUAAAACXBIWXMAABcRAAAXEQHKJvM/AAAAtUlEQVRYR+2X2wrDIBAFt03bXJrWVOP+/6fWwsEKCqtNX0J2ngZkwCQSVsrpVi7gByyLFPMAlkWYly5jaeknWMJ0pL7l/Q0en+cX/Ezjpv6JXYRNW1OJLT0Ks4GJGO1hCX/sT68LjK7fk9zPELG37GHkVsjnrwIR+3CuYEEhqWqvfYb22gPttQfaQ/bUJ/Ohi5ME+er+7OLUMsb5lB5xXeoltNc+Y+v9p+0WhijhhpUq7oiI6A0ADEuJ8j7bEQAAAABJRU5ErkJggg==";
    // const imageData = 'data:image/png;base64,' + mockImg;
    const uploadReqBody = new UploadImgReqModel(imageData);

    const user = this.userService.getQrCodeScanResult().user;

    const password = this.userService.getQrCodeScanResult().password;

    const authorization = new AuthorizationModel(user, password);

    this.uploadImgData(url, uploadReqBody, authorization);

  }

}

