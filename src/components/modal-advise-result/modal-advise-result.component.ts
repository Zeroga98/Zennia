import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-advise-result',
  templateUrl: './modal-advise-result.component.html',
  styleUrls: ['./modal-advise-result.component.scss']
})
export class ModalAdviseResultComponent implements OnInit {

  title: string;
  closeBtnName: string;
  list: any[] = [];
  
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }
}
