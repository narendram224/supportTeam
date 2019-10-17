import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Dashboard } from './dashboard';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  spinner = true;
  spinner1 = false;;
  newarr: Array<any>;
  errorData: string;
  selectedIncident: Dashboard;
  incidences: Dashboard[] = [];
  token: string;
  selectedItem;
   dt1 = new Date("Sep 26, 2019, 5:46:08 PM"); 
  dt2 = new Date("Sep 26, 2019, 8:46:08 PM"); 
  firstName= 'Guybrush';
   toggle=false;

  lastName= 'Threepwood';

  constructor(private dashboardApi: DashboardService, private auth: AuthService) { }
  ngOnInit() {
   

    this.token = `bearer ${this.auth.getToken()}`;
    console.log(this.token);

    this.dashboardApi.getDashboardData().subscribe((Incidences) => {
      console.log(Incidences);

      this.incidences = Incidences;
      // console.log(this.diff_minutes(Incidences.reportDateTimeStr, this.dt2)); 
      this.newarr = this.incidences;
    });
    setTimeout(() => {
      this.spinner = false;
    }, 1500);
    
  }
  public showDetail(event, contact) {
    this.selectedIncident = contact;
    this.selectedItem = contact;
  }
  gotoback() {
    this.selectedIncident = null;
  }
  retry() {
    this.auth.logout();
  }
  submitRemark(data) {
    console.log(data);

    let remarkBody = Object.assign({}, this.selectedIncident);
    remarkBody.supportRemark = data.value;
    delete remarkBody.incidentID;
    delete remarkBody.reportDateTimeStr;
    this.spinner1 = true;
    this.dashboardApi.RemarkPut(this.selectedIncident.incidentID, remarkBody).subscribe((res) => {
      console.log("resposne datais", res);
      this.spinner1 = false;
      this.selectedIncident.supportRemark = res.supportRemark;
    }, (error) => {
      setTimeout(() => {
        this.selectedIncident.supportRemark = null;
        this.spinner1 = false;
        this.errorData = error.error.message;
        console.log("error is not ", error.error.message);
      }, 1000);

    });
  }

  filter(heroes: string) {
    if (heroes === "all") {
      this.incidences = this.newarr;
      console.log(this.incidences);
      this.selectedIncident = null;
    } else {
      this.incidences = this.newarr;
      let heroesnew = this.incidences.filter((data => data.issueTypeStr == heroes));
      this.incidences = heroesnew;
    }
  }
  downloadFile(data: any) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  
//  diff_minutes(dt2, dt1) 
//  {
  
//   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
//   diff /= (60*60);
//   return Math.abs(Math.round(diff));
  
//  }

 get fullName() {
  return this.firstName + " " + this.lastName;
};

set fullName(name) {
  var parts = name.split(" ");
  this.firstName = parts[0];
  this.lastName = parts[1];
};
calHour(d2,d1){
  const date1 = new Date(d1);
  const date2 = new Date("Sep 26, 2019, 8:46:08 PM");
  var diff =Math.abs(Math.round((date2.getTime() - date1.getTime()) / (1000*60*60)));
  return diff;
}
 sortData() {
   console.log("runs");
   this.toggle=!this.toggle;
    if (this.toggle) {
      console.log("ifruns");
      return this.incidences.sort((a, b) => {
        return <any>new Date(b.reportDateTimeStr) - <any>new Date(a.reportDateTimeStr);
      
        
      });
    }else{
      console.log("esleruns");
      return this.incidences.sort((b, a) => {
        return <any>new Date(b.reportDateTimeStr) - <any>new Date(a.reportDateTimeStr);
      });
      ;
     
    }
    
}
}
