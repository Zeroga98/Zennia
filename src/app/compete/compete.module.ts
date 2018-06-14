import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompeteRoutingModule } from './compete-routing.module';
import { CompeteComponent } from './compete.component';
import { CompetitionComponent } from './competition/competition.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProblemComponent } from './problem/problem.component';

@NgModule({
  imports: [
    CommonModule,
    CompeteRoutingModule
  ],
  declarations: [CompeteComponent, CompetitionComponent, LeaderboardComponent, ProblemComponent]
})
export class CompeteModule { }
