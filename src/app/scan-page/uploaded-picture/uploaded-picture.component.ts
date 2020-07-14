import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { UploadImgResModel } from '../../models/request.model';
import * as commCon from '../../shared/common.constant';
import { isEmpty } from '../utils/object.utils';

@Component({
  selector: 'app-uploaded-picture',
  templateUrl: './uploaded-picture.component.html',
  styleUrls: ['./uploaded-picture.component.scss'],
})
export class UploadedPictureComponent implements OnInit {
  userUploadedImgRes: UploadImgResModel;
  userUploadedImg: any;
  picLoadingFlag: boolean;

  constructor(private userService: UserService) {
    this.picLoadingFlag = true;
   }

  ngOnInit() {
   this.getUserUploadedImgRes();
  }

  getUserUploadedImgRes(): void {
    this.userUploadedImgRes = this.userService.getUploadImageRes();
    this.buildGetImgReq(this.userUploadedImgRes);
  }

  buildGetImgReq(userUploadedImgRes: UploadImgResModel): void {
    const file = (!isEmpty(userUploadedImgRes) && !isEmpty(userUploadedImgRes.file)) ? userUploadedImgRes.file : '';
    this.getUserUploadediImg(file);
  }

  getUserUploadediImg(file: string): void {
    const getUploadedPicUrl = commCon['GETUPLOADIMG_URL'];
    const url = this.userService.getQrCodeScanResult().apiserver;
    const fileUrl = url + getUploadedPicUrl + file;

    this.userService.getUploadedImg(fileUrl).then(imgRes => {

      this.userUploadedImg = URL.createObjectURL(imgRes);
      this.picLoadingFlag = false;

    });

  }

}
