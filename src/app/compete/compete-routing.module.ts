import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompeteComponent } from './compete.component';
import { ListMarathonComponent } from './list/list.component';
import { MarathonProfileComponent } from './marathon-profile/marathon-profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: CompeteComponent,
    children: [
      { 
        path: 'list', 
        component: ListMarathonComponent,
      },
      {
        path: 'maraton/:marathon_id',
        component: MarathonProfileComponent,
      },
      {
        path: 'leadboard/:marathon_id',
        component: LeaderboardComponent
      },
      {
        path: 'maraton/admin/:marathon_id',
        component: AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompeteRoutingModule { }
