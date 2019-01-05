import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  url: String = environment.baseAPIUrl;
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
