import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  protected subject:Subject<string>= new Subject()

  constructor() { }

  //Cette fonction envoie un message dans le pipe de communication.
  pushMessage(message:string){
    this.subject.next(message);
  }
  //Cette fonction renvoie quelque chose du pipe de comm.
  onMessage(): Observable<string>{
    return this.subject.asObservable();
  }
}
