import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api:ApiService) { }

  updateDashboard(body:any,id:number){
    return this.api.put(`users/${id}`, body);
  }

  getDashboardData(){
    return this.api.get(`incidents`);
  }
}
