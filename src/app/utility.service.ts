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
}
