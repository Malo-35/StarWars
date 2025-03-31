import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Personnage } from './personnage';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  protected subject:Subject<string>= new Subject()
  httpclient = inject(HttpClient);
  constructor() { }

  getAll(): Observable<any>{
    return this.httpclient.get<any>('/api')
  }

  getPersonnages(): Observable<Personnage[]>{
    return this.httpclient.get<any>('/api/people').pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }
}
