import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  url = "http://msil.us-east-2.elasticbeanstalk.com";
  header: HttpHeaders;
  constructor(private http: HttpClient) { }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    return this.http
      .get(this.url + "/" + endpoint, { headers: optHeaders, observe: "response" })
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    return this.http
      .post(this.url + "/" + endpoint, body, {

        observe: "response"
      })
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    return this.http
      .put(this.url + "/" + endpoint, body, {

        observe: "response"
      })
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    return this.http
      .delete(this.url + "/" + endpoint, {

        observe: "response"
      })
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
  // another method which will use for operations
  extractData = (response: HttpResponse<any>) => {
    if (response.status === 204) {
      // this.showalert("Data not Found");
      console.log("Data not found");
      
    }
    return response.body || response.status;
  }
  // error handle method
  handleError(errorResponse: HttpErrorResponse) {


    if (errorResponse.status)
      // this.showalert(errorResponse.error.message || "Something went wrong");
      console.log(errorResponse.error.message || "Something went wrong");
      
    return throwError(errorResponse);

    // if (errorResponse.error instanceof ErrorEvent) {
    // this.showalert(errorResponse.error.message || "somthing goes wrong!");
    //   console.log("client side error", errorResponse.error.message);
    // } else {
    // this.showalert(errorResponse || "server side error");
    //   console.log("server side error", errorResponse);
    // }
    // return throwError("server side problem ! No data found");
  }
  // alert method
   showalert(message) {
      console.log(message);
      
  }
}