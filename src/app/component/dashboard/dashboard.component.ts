import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { Dashboard } from './dashboard';
import { ThrowStmt } from '@angular/compiler';
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

  constructor(private dashboardApi: DashboardService) { }
  ngOnInit() {
    this.dashboardApi.getDashboardData().subscribe((Incidences) => {
      this.incidences = Incidences;
      this.newarr = this.incidences;
    });
    setTimeout(() => {
      this.spinner = false;
    }, 1500);
  }
  public showDetail(contact) {
    this.selectedIncident = contact;
  }
  submitRemark(data) {
    console.log(data);

    let remarkBody = Object.assign({}, this.selectedIncident);
    remarkBody.supportRemark = data.value;
    delete remarkBody.incidentID;
    delete remarkBody.reportDateTimeStr;
    this.spinner1 = true;
    this.dashboardApi.RemarkPut(1, remarkBody).subscribe((res) => {
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
}
