import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-formulaire-recherche',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire-recherche.component.html',
  styleUrl: './formulaire-recherche.component.css'
})
export class FormulaireRechercheComponent implements OnInit {
  commServ = inject(CommunicationService)   //Nécessaire à l'intallation des communications entre cette app et le header.

  @Output() onFilter = new EventEmitter<string>()
  
  formGroup: FormGroup
  searchCtrl: FormControl

  constructor() {
    this.searchCtrl = new FormControl('', { validators: [Validators.minLength(3)], nonNullable: true })
    this.formGroup = new FormGroup({
      searchCtrl: this.searchCtrl
    })
  }
  ngOnInit(){
    this.commServ.pushMessage("/rechercherqqchose.png")   //On envoie dans le channel quelle image afficher dans le header.
  }

  onSub(): void {
    this.onFilter.emit(this.searchCtrl.value)
  }
}
