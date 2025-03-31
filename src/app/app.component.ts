import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiserviceService } from './apiservice.service';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StarWars';
}
