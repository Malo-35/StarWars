import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, Subject, tap } from 'rxjs';
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

  getPersonnages(page: number): Observable<Personnage[]> {
    console.log("getPersonnages("+page+")")
    return this.httpclient.get<any>('/api/people?page=' + page).pipe(
      tap(data => console.log("Data brute : ", data)),
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,          // On copie toutes les propriétés originales
        cquoi: "Personnage" // On ajoute le champ cquoi
      }))),
      tap(data => console.log(data)),
    );
  }
  

  //getPagePersonnages(page: number): Observable

  getPlanetes(page: number): Observable<Planete[]>{
    return this.httpclient.get<any>('/api/planets?page='+page).pipe(
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

  getPersonnagesByDisplayPage(pageAffichage: number): Observable<Personnage[]> {
    const pageApi1 = (pageAffichage * 2) - 1;
    const pageApi2 = pageAffichage * 2;
  
    // Premier appel vers la page pageApi1
    const appelPage1 = this.httpclient.get<any>(`/api/people?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,          // On copie toutes les propriétés originales
        cquoi: "Personnage" // On ajoute le champ cquoi
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]); // Renvoie un observable émettant un tableau vide
      })
    );
  
    // Deuxième appel vers la page pageApi2 (qui peut ne pas exister)
    const appelPage2 = this.httpclient.get<any>(`/api/people?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,          // On copie toutes les propriétés originales
        cquoi: "Personnage" // On ajoute le champ cquoi
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]); // Renvoie un observable émettant un tableau vide
      })
    );
  
    // Lancer les deux appels en parallèle et fusionner les résultats
    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  getPersonnagesPage(page: number = 1): Observable<any> {
    // On ne fait pas de mapping ici afin d’obtenir l’objet complet qui contient "count" et "results"
    return this.httpclient.get<any>('/api/people?page=' + page);
  }
  
}
