import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './a-propos/a-propos.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { PersonnagesComponent } from './personnages/personnages.component';
import { PlanetesComponent } from './planetes/planetes.component';
import { VaisseauxComponent } from './vaisseaux/vaisseaux.component';
import { ApiserviceService } from './apiservice.service';
import { DetailsComponent } from "./details/details.component";
import { CommunicationService } from './communication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'StarWars';
  commDetail = inject(CommunicationService)
  madata:any

  ngOnInit(): void {
    this.commDetail.onDetails().subscribe(
      (data) => this.madata = data
    )
  }
}
