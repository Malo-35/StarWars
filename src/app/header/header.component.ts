import { Component, inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { RouterLink } from '@angular/router';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  communicationService = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre les apps et le header.
  currentImage = "/accueilIcon.png"

  ngOnInit(){

    this.communicationService.onMessage().subscribe(
      (data: string) => this.currentImage = data    //On écoute dans le channel quelle est l'image à afficher dans le header.
    )
    console.log("Header initialisé")
  }

  ngOnDestroy(){
    console.log("Header détruit !?")
  }

  changerIcone(nom: string){
    this.currentImage=("/" + nom)
    console.log("Image actuelle : " + this.currentImage)
  }
}
