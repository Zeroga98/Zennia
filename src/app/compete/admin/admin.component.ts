import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

import { MarathonService, TimeService } from '../../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  //styleUrls: ['./create.component.scss']
})
export class AdminComponent implements OnInit {

	public lessons_minime: number = 3;
	public form: FormGroup;
	public isSubmiting: boolean = false;
	public marathonId: string;
	public marathon: any = { };
	public timeNow = this.timeService.getMomentDate();

  	constructor(
	  	private formBuilder: FormBuilder,
	  	private router: Router,
	  	private activateRouter: ActivatedRoute,
	  	private toast: ToastrService,
	  	private marathonService: MarathonService,
	  	private timeService: TimeService) { 

		  	this.form = this.formBuilder.group({
		  		'nombre': this.formBuilder.control('', [Validators.required]),
		  		'descripcion': this.formBuilder.control('', [Validators.required]),
		  		'fecha_inicio': this.formBuilder.control(this.timeNow.format('YYYY-MM-DD'), [Validators.required]),
		  		'hora_inicio': this.formBuilder.control(this.timeNow.format('kk:mm'), [Validators.required]),
		  		'fecha_final': this.formBuilder.control(this.timeNow.format('YYYY-MM-DD'), [Validators.required]),
		  		'hora_final': this.formBuilder.control(this.timeNow.format('kk:mm'), [Validators.required]),
		  		'oculta': this.formBuilder.control(true, [Validators.required]),
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

  	public create(){
  		let hora_inicio = moment(this.form.value.fecha_inicio + ' ' + this.form.value.hora_inicio);
		let hora_final = moment(this.form.value.fecha_final + ' ' + this.form.value.hora_final);
		if(hora_inicio < hora_final){
			this.marathonService.createMarathon(this.parserDataSend(this.form.value))
		    .subscribe(new_marathon_id => {
				this.router.navigate(['/competir/maraton/admin', new_marathon_id]);
			  	this.isSubmiting = false;
			});
		} else {
			this.toast.error(`La hora de inicio debe ser menor a la hora final.`, 'No es posible crear', {
			    timeOut: 3000,
			    positionClass:'toast-bottom-right'
			});
			this.isSubmiting = false;
		}
	}

	public update(){
		let hora_inicio = moment(this.form.value.fecha_inicio + ' ' + this.form.value.hora_inicio);
		let hora_final = moment(this.form.value.fecha_final + ' ' + this.form.value.hora_final);
		if(this.timeNow < hora_inicio && hora_inicio < hora_final){
			this.marathonService.updateMarathon(this.parserDataSend(this.form.value), this.marathonId)
			.subscribe(data => {
			  this.toast.success('Actualización exitosa!', 'Bien!', {
			    timeOut: 2000,
			    positionClass:'toast-bottom-right'
			  });
			  this.isSubmiting = false;
			});
		} else if(this.timeNow >= hora_inicio){
			this.toast.error(`La competencia ya empezo, no puedes actualizar los campos ahora.`, 'No es posible actualizar', {
			    timeOut: 3000,
			    positionClass:'toast-bottom-right'
			});
			this.isSubmiting = false;
		} else {
			this.toast.error(`La hora de inicio debe ser menor a la hora final.`, 'No es posible crear', {
			    timeOut: 3000,
			    positionClass:'toast-bottom-right'
			});
			this.isSubmiting = false;
		}
	}

	public action(){
		if(this.form.valid && !this.isSubmiting){
		  this.isSubmiting = true;
		  if(this.marathonId != 'new')
		    this.update();
		  else
		    this.create();
		}
	}

  	public hideLesson(){
  		if(this.marathon.lecciones.length >= this.lessons_minime){
  			this.marathonService.hideMarathon(this.marathonId, !this.form.controls.oculta.value)
		    .then(data => {
		      this.form.controls.oculta.setValue(!this.form.controls.oculta.value);
		    });
  		} else {
  			this.toast.error(`Debes crear mínimo ${ this.lessons_minime } lecciones para poder difundir la competencia.`, 'No es posible difundir', {
			    timeOut: 3000,
			    positionClass:'toast-bottom-right'
			});
  		}
	}

	public addLesson(){
		let hora_inicio = moment(this.form.value.fecha_inicio + ' ' + this.form.value.hora_inicio);
		//if(1 + 2 == 3){
		if(this.timeNow < hora_inicio){
			this.router.navigate(['/maratones', this.marathonId, 'leccion', 'new', 'admin']);
		} else {
			this.toast.error(`La competencia ya empezo, no puedes actualizar los campos ahora.`, 'No es posible actualizar', {
			    timeOut: 3000,
			    positionClass:'toast-bottom-right'
			});
			this.isSubmiting = false;
		}
	}

	private parserDataSend(form){
		let data = form;
		data.fecha_inicio = moment(data.fecha_inicio + ' ' + data.hora_inicio).toDate();
		data.fecha_final = moment(data.fecha_final + ' ' + data.hora_final).toDate();
		delete data['hora_inicio'];
		delete data['hora_final'];
		return data;
	}

}
