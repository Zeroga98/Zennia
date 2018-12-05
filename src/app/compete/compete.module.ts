import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompeteRoutingModule } from './compete-routing.module';
import { CompeteComponent } from './compete.component';
import { CompetitionComponent } from './competition/competition.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProblemComponent } from './problem/problem.component';
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
  	CompetitionComponent, 
  	LeaderboardComponent, 
  	ProblemComponent,
  	AdminComponent
  	]
})
export class CompeteModule { }
