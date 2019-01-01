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
}
