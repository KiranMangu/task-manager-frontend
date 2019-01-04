import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  url: String = 'http://localhost:3031/api'
  constructor() { }

  getAPI(): String {
    return this.url;
  }

  validateDateSelection(startDate, EndDate): any {
    if ((EndDate !== null) && startDate > EndDate) {
      console.log("invalid  :" + EndDate + ":");
      return { notValid: true };
    }
    console.log("valid");
    return null;
  }
}
