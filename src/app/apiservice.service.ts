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
  protected subject: Subject<string> = new Subject();
  httpclient = inject(HttpClient); // Injection du HttpClient pour faire des requêtes API.
  
  constructor() { }
  
  // --------------------------
  // Fonctions générales (raw)
  // --------------------------
  
  // Récupère toutes les données de base depuis l'API.
  getAll(): Observable<any> {
    return this.httpclient.get<any>('/api');
  }
  
  //LES FILTRES !!!
  getEspeceFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/species?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((espece: any) => ({
        ...espece,
        cquoi: "Espece"
      }))))
  }
  getFilmFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/films?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((film: any) => ({
        ...film,
        cquoi: "Film"
      }))))
  }
  getPersonnageFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/people?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,
        cquoi: "Personnage"
      }))))
  }
  getPlaneteFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/planets?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((planetes: any) => ({
        ...planetes,
        cquoi: "Planete"
      }))))
  }
  getVaisseauFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/starships?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((vaisseaux: any) => ({
        ...vaisseaux,
        cquoi: "Vaisseaux"
      }))))
  }
  getVehiculeFiltre(searchTerm: string): Observable<any> {
    return this.httpclient.get<any>(`/api/vehicles?search=${searchTerm}`).pipe(
      map((data: any) => data.results.map((vehicules: any) => ({
        ...vehicules,
        cquoi: "Vehicule"
      }))))
  }
  // Les fonctions get[Composant]Page renvoient l'objet complet (contenant "count" et "results")
  
  // Personnages : Retourne l'objet complet pour la page donnée.
  getPersonnagesPage(page: number = 1): Observable<any> {
    // On ne fait pas de mapping ici afin d’obtenir l’objet complet (count et results)
    return this.httpclient.get<any>(`/api/people?page=${page}`);
  }

  // Planètes
  getPlanetesPage(page: number = 1): Observable<any> {
    return this.httpclient.get<any>(`/api/planets?page=${page}`);
  }

  // Vaisseaux
  getVaisseauxPage(page: number = 1): Observable<any> {
    return this.httpclient.get<any>(`/api/starships?page=${page}`);
  }

  // Véhicules
  getVehiculesPage(page: number = 1): Observable<any> {
    return this.httpclient.get<any>(`/api/vehicles?page=${page}`);
  }

  // Espèces
  getEspecesPage(page: number = 1): Observable<any> {
    return this.httpclient.get<any>(`/api/species?page=${page}`);
  }

  // Films
  getFilmsPage(page: number = 1): Observable<any> {
    return this.httpclient.get<any>(`/api/films?page=${page}`);
  }

  // --------------------------
  // Fonctions getByDisplayPage
  // --------------------------
  // Ces fonctions combinent deux pages API afin d'obtenir un affichage avec 20 éléments.

  // Personnages
  getPersonnagesByDisplayPage(pageAffichage: number): Observable<Personnage[]> {
    const pageApi1 = (pageAffichage * 2) - 1; // Calcul de la première page
    const pageApi2 = pageAffichage * 2;       // Calcul de la deuxième page

    // Récupération des données de la première page avec ajout de cquoi
    const appelPage1 = this.httpclient.get<any>(`/api/people?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,
        cquoi: "Personnage"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    // Récupération des données de la deuxième page avec ajout de cquoi
    const appelPage2 = this.httpclient.get<any>(`/api/people?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((perso: any) => ({
        ...perso,
        cquoi: "Personnage"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    // Combinaison des deux pages
    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  // Planètes
  getPlanetesByDisplayPage(pageAffichage: number): Observable<Planete[]> {
    const pageApi1 = (pageAffichage * 2) - 1; // Première page
    const pageApi2 = pageAffichage * 2;       // Deuxième page

    const appelPage1 = this.httpclient.get<any>(`/api/planets?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((planete: any) => ({
        ...planete,
        cquoi: "Planete"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    const appelPage2 = this.httpclient.get<any>(`/api/planets?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((planete: any) => ({
        ...planete,
        cquoi: "Planete"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  // Vaisseaux
  getVaisseauxByDisplayPage(pageAffichage: number): Observable<Vaisseaux[]> {
    const pageApi1 = (pageAffichage * 2) - 1;
    const pageApi2 = pageAffichage * 2;

    const appelPage1 = this.httpclient.get<any>(`/api/starships?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((vaisseau: any) => ({
        ...vaisseau,
        cquoi: "Vaisseau"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    const appelPage2 = this.httpclient.get<any>(`/api/starships?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((vaisseau: any) => ({
        ...vaisseau,
        cquoi: "Vaisseau"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  // Véhicules
  getVehiculesByDisplayPage(pageAffichage: number): Observable<Vehicule[]> {
    const pageApi1 = (pageAffichage * 2) - 1;
    const pageApi2 = pageAffichage * 2;

    const appelPage1 = this.httpclient.get<any>(`/api/vehicles?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((vehicule: any) => ({
        ...vehicule,
        cquoi: "Vehicule"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    const appelPage2 = this.httpclient.get<any>(`/api/vehicles?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((vehicule: any) => ({
        ...vehicule,
        cquoi: "Vehicule"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  // Espèces
  getEspecesByDisplayPage(pageAffichage: number): Observable<Espece[]> {
    const pageApi1 = (pageAffichage * 2) - 1;
    const pageApi2 = pageAffichage * 2;

    const appelPage1 = this.httpclient.get<any>(`/api/species?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((espece: any) => ({
        ...espece,
        cquoi: "Espece"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    const appelPage2 = this.httpclient.get<any>(`/api/species?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((espece: any) => ({
        ...espece,
        cquoi: "Espece"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }

  // Films
  getFilmsByDisplayPage(pageAffichage: number): Observable<Film[]> {
    const pageApi1 = (pageAffichage * 2) - 1;
    const pageApi2 = pageAffichage * 2;

    const appelPage1 = this.httpclient.get<any>(`/api/films?page=${pageApi1}`).pipe(
      map((data: any) => data.results.map((film: any) => ({
        ...film,
        cquoi: "Film"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi1}`, err);
        return of([]);
      })
    );

    const appelPage2 = this.httpclient.get<any>(`/api/films?page=${pageApi2}`).pipe(
      map((data: any) => data.results.map((film: any) => ({
        ...film,
        cquoi: "Film"
      }))),
      catchError(err => {
        console.error(`Erreur lors de la récupération de la page ${pageApi2}`, err);
        return of([]);
      })
    );

    return forkJoin({ page1: appelPage1, page2: appelPage2 }).pipe(
      map(({ page1, page2 }) => [...page1, ...page2])
    );
  }
}
