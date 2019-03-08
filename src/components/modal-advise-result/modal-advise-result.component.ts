import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-advise-result',
  templateUrl: './modal-advise-result.component.html',
  styleUrls: ['./modal-advise-result.component.scss']
})
export class ModalAdviseResultComponent implements OnInit {

  closeBtnName: string;
  states: any[] = [];
  isMarathon: boolean;

  constructor(private router: Router,public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.isMarathon = this.router.url.includes('maraton');
    console.log(this.states);
    
  }

  public getHome(){
    if(this.states[0].id !=4){
      this.bsModalRef.hide();
      let route = (this.isMarathon)?'/competir/list': '/';
      this.router.navigate([route]);
    }
    this.bsModalRef.hide();
  }
}
