import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompeteComponent } from './compete.component';
import { CompetitionComponent } from './competition/competition.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ProblemComponent } from './problem/problem.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: CompeteComponent,
  },
  {
    path: 'maraton/:marathon_id',
    component: CompetitionComponent,
  },
  {
    path: 'leadboard/:marathon_id',
    component: LeaderboardComponent
  },
  {
    path: ':maraton/problem/:problem_id',
    component: ProblemComponent
  },
  {
    path: 'maraton/admin/:marathon_id',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompeteRoutingModule { }
