import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompeteRoutingModule } from './compete-routing.module';
import { CompeteComponent } from './compete.component';
import { MarathonProfileComponent } from './marathon-profile/marathon-profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ListMarathonComponent } from './list/list.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    CompeteRoutingModule
  ],
  declarations: [
  	CompeteComponent, 
  	MarathonProfileComponent, 
  	LeaderboardComponent, 
  	AdminComponent,
    ListMarathonComponent
  ]
})
export class CompeteModule { }
