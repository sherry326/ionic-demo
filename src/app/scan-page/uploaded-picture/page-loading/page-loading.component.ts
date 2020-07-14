import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
})
export class PageLoadingComponent implements OnInit {
@Input() picLoadingFlag: boolean;

  constructor() {
    this.picLoadingFlag = false;
  }

  ngOnInit() {}
}
