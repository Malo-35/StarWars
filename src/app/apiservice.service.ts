import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Personnage } from './personnage';
import { Planete } from './planete';
import { Vaisseaux } from './vaisseaux';
import { Vehicule } from './vehicule';
import { Espece } from './espece';
import { Film } from './film';

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

  getPlanetes(page: number): Observable<Planete[]>{
    return this.httpclient.get<any>('/api/planet?page='+page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }

  getVaisseaux(page: number): Observable<Vaisseaux[]>{
    return this.httpclient.get<any>('/api/starship?page='+page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }

  getVehicules(page: number): Observable<Vehicule[]>{
    return this.httpclient.get<any>('/api/vehicle?page='+page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }

  getEspeces(page: number): Observable<Espece[]>{
    return this.httpclient.get<any>('/api/species?page='+page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }

  getFilms(page: number): Observable<Film[]>{
    return this.httpclient.get<any>('/api/film?page='+page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data:any) => data.results),
      tap(data => console.log(data)),
    )
  }
}
