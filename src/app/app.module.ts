import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
// import { NgxSpinnerModule } from "ngx-spinner";
import {SelfBuildingSquareSpinnerModule,SemipolarSpinnerModule,SpringSpinnerModule} from 'angular-epic-spinners'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,HttpClientModule,FormsModule,SelfBuildingSquareSpinnerModule,SemipolarSpinnerModule
    ,SpringSpinnerModule
  ],
  providers: [ApiService,DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
