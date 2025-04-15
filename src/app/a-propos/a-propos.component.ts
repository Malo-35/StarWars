import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { StarWarsTextComponent } from "../star-wars-text/star-wars-text.component";

@Component({
  selector: 'app-a-propos',
  imports: [StarWarsTextComponent],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.css'
})
export class AProposComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.
  ngOnInit(){
    this.commServ.pushMessage("/aproposIcon.png")   //On envoie dans le channel quelle image afficher dans le header.
  }

}
