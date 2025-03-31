import { Component, inject } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  myapiservice = inject(ApiserviceService)
  mylisttest = <any>[]
  currentImage = "/personnageIcon.png"

  ngOnInit(){
    this.myapiservice.getPersonnages().subscribe(
      (data) => this.mylisttest = data
    )
    console.log("Header initialisé")
  }

  ngOnDestroy(){
    console.log("Header détruit !?")
  }
}
