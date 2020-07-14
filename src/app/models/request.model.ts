export class QRCodeScanResultModel {
  constructor(
    public apiserver?: string,
    public user?: string,
    public password?: string
  ) { }
  static build(qrCodeScanResult: QRCodeScanResultModel): QRCodeScanResultModel {
    return new QRCodeScanResultModel(qrCodeScanResult.apiserver, qrCodeScanResult.user, qrCodeScanResult.password);
  }
}

export class CheckBackendStatusResModel {
  constructor(
    public status?: string
  ) { }
}

export class AuthorizationModel {
  constructor(
    public userName?: string,
    public password?: string
  ) { }
}

export class UploadImgReqModel {
  constructor(
    public picture?: string
  ) { }
}

export class UploadImgResModel {
  constructor(
    public file?: string,
    public status?: string
  ) { }
}




