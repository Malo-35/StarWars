import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Personnage } from './personnage';
import { Planete } from './planete';

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

  getPersonnages(page: number): Observable<Personnage[]>{
    console.log("getPersonnages("+page+")")
    return this.httpclient.get<any>('/api/people?page='+page).pipe(  //Ici j'ai ajouté que je voulais la première page du décou-page par 20 éléments par pages
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }

  //getPagePersonnages(page: number): Observable

  getPlanetes(): Observable<Planete[]>{
    return this.httpclient.get<any>('/api/planet').pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }
}
