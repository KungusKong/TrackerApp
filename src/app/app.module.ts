import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InitiativeItemComponent } from './IniativeTracker/initiative-item/initiative-item.component';
import { FormsModule } from '@angular/forms';
import {TrackerComponent} from './IniativeTracker/tracker/tracker.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SpellSlotTrackerComponent } from './spell-slot-tracker/spell-slot-tracker.component';
import { SpellslotComponent } from './spellslot/spellslot.component';
import { SmallslotComponent } from './smallslot/smallslot.component';
import { MonsterViewerComponent } from './monster-viewer/monster-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    InitiativeItemComponent,
    TrackerComponent,
    HomeComponent,
    SpellSlotTrackerComponent,
    SpellslotComponent,
    SmallslotComponent,
    MonsterViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
