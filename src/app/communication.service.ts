import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  protected subject:Subject<string>= new Subject()
  protected communicationDesPages:Subject<number> = new Subject()

  constructor() { }

  //Cette fonction envoie un message dans le pipe de communication.
  pushMessage(message:string){
    this.subject.next(message);
  }
  //Cette fonction renvoie quelque chose du pipe de comm.
  onMessage(): Observable<string>{
    return this.subject.asObservable();
  }

  //Cette partie est réservée à la communication du nombre de pages résultantes du décou-page des données de l'API.
  //Pour plus d'information veuillez vous en référencer à "src\app\apiservice.service.ts".

  //Communique le nombre de pages.
  pushPages(pages:number){
    this.communicationDesPages.next(pages);
  }
  //Permet d'écouter les communications du nombre total de pages.
  onPages(): Observable<number>{
    return this.communicationDesPages.asObservable();
  }
}
