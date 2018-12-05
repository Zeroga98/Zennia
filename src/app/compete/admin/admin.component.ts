import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MarathonService } from '../../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  //styleUrls: ['./create.component.scss']
})
export class AdminComponent implements OnInit {

	public form: FormGroup;
	public isSubmiting: boolean = false;
	public marathonId: string;
	public marathon: any = { };

  	constructor(
	  	private formBuilder: FormBuilder,
	  	private router: Router,
	  	private activateRouter: ActivatedRoute,
	  	private toast: ToastrService,
	  	private marathonService: MarathonService) { 
		  	this.form = this.formBuilder.group({
		  		'nombre': this.formBuilder.control('', [Validators.required]),
		  		'descripcion': this.formBuilder.control('', [Validators.required]),
		  		'fecha_inicio': this.formBuilder.control(new Date(), [Validators.required]),
		  		'oculta': this.formBuilder.control(false, [Validators.required]),
		    });
  	}

  	ngOnInit() {
	  	this.activateRouter.params.subscribe(params => {
	        this.marathonId = params['marathon_id'];
	        if(this.marathonId != 'new'){
	          this.marathonService.getMarathonById(this.marathonId)
	          .subscribe(data => {
	          	this.marathon = data;
	            this.form.patchValue(data);
	          });
	        }
	    });
  	}

  	public hideLesson(){
	    this.marathonService.hideMarathon(this.marathonId, !this.form.controls.oculta.value)
	    .then(data => {
	      this.form.controls.oculta.setValue(!this.form.controls.oculta.value);
	    });
	}

}
