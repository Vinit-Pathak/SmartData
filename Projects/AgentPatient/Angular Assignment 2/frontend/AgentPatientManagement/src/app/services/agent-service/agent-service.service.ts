import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {
  http: HttpClient = inject(HttpClient);

  // getAllPatients(){
  //   return this.http.get("http://localhost:5258/api/Patient/allPatient");
  // }

  getAllPatients(id:any): Observable<any> {
    return this.http.get(`http://localhost:5258/api/Patient/getActivePatientByAgentId/${id}`);
  }
  
  addPatient(data: any): Observable<any>{
    return this.http.post("http://localhost:5258/api/Patient", data, { responseType: 'json' });
  }

  updatePatientById(data: any, aId:any): Observable<any>{
    return this.http.put(`http://localhost:5258/api/Patient/${data.pId}`, data, aId)
  }

  deletePatientById(id: any): Observable<any>{
    return this.http.delete(`http://localhost:5258/api/Patient/${id}`)
  }
  
  
}
