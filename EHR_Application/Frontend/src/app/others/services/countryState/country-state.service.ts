import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  http = inject(HttpClient)

  getAllCountry(){
    return this.http.get("https://localhost:7053/api/CountryState/getAllCountry");
  }

  getStateByCountryId(countryId: number){
    return this.http.get(`https://localhost:7053/api/CountryState/${countryId}`);
  }

  getAllState(){
    return this.http.get("https://localhost:7053/api/CountryState/all-state");
  }
}
