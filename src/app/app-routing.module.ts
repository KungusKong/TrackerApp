import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrackerComponent} from './IniativeTracker/tracker/tracker.component';
import {HomeComponent} from './home/home.component';
import { SpellSlotTrackerComponent } from './spell-slot-tracker/spell-slot-tracker.component';
import { JoinroomComponent } from './IniativeTracker/joinroom/joinroom.component';

const routes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'spellslots', component: SpellSlotTrackerComponent},
  { path: 'join', component: JoinroomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }