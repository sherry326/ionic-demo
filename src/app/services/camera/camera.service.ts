import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera,
              private barcodeScanner: BarcodeScanner) { }

  doBarCodeScanner(): any {
    return this.barcodeScanner.scan().then(barcodeData => {
      return JSON.stringify(barcodeData);
    }).catch(err => {
        console.log(err);
    });

  //   const mockRes = {
  //     "text": "apiserver: https: //be-app-hiring-bixinf-test.22ad.bi-x.openshiftapps.com/;user: admin;password: secret",
  //     "formate": "QR_CODE"
  // };
  // return JSON.stringify(mockRes);

  }

  takePicture(): any {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 512,
      targetHeight: 512
    };

    return this.camera.getPicture(options).then((imageData) => {
      return imageData;
    }, (err) => {
      return err;
    });
  }
}
