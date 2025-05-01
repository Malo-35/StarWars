import { Component, inject, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Personnage } from '../personnage';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  commDetails = inject(CommunicationService)  //Pour recevoir les données à afficher.
  madata: any | null=null
  madatatype: any
  ngOnInit(): void {
    this.commDetails.onDetails().subscribe(
      (data) => this.madata = data
    )

    console.log("Détails créé")
  }
}
