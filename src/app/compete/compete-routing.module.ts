import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompeteComponent } from './compete.component';
import { CompetitionComponent } from './competition/competition.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProblemComponent } from './problem/problem.component';

const routes: Routes = [
  {
    path: '',
    component: CompeteComponent,
  },
  {
    path: 'competenciaSebas',
    component: CompetitionComponent,
  },
  {
    path: 'leadboard',
    component: LeaderboardComponent
  },
  {
    path: 'problem',
    component: ProblemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompeteRoutingModule { }
