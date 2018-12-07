import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';

@Injectable()
export class TimeService {

    constructor(
        private database: AngularFireDatabase
    ) { 
    }

    public getDate(){
    	return moment(this.database.database["repo_"].serverTime()).toDate();
    }

   	public getMomentDate(){
   		return moment(this.database.database["repo_"].serverTime());
   	}
}