import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  supportRemark:string;
  constructor(private dashboardApi:DashboardService) { }
  
  incidences=[];
  selectedIncident;
  ngOnInit() {
    this.dashboardApi.getDashboardData().subscribe((Incidences)=>{
        this.incidences = Incidences;
    });
  }

  public selectContact(contact){
    this.selectedIncident = contact;
    console.log(this.selectedIncident.supportRemark);
    
  }
  submitRemark(data:any){
  
    this.selectedIncident.supportRemark = data.value;
    console.log(this.selectedIncident.supportRemark);
    
  }


}
