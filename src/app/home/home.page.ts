import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { EventsService } from '../services/events.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  event_list: any;
  
  constructor( 
    private router: Router,
    private storage: Storage,
    private events: EventsService
  ) {}

  ionViewDidEnter(){
    this.events.getEvents().then(
      res => {
        this.event_list = res;
        console.log("Eventos desde el servidor", this.event_list);
      
      }
    
    )
      console.log("Local vents",this.events.getLocalEvents().events);
      
  }

  goToIntro(){
    console.log("go to intro");
    // Establece la bandera antes de navegar a la página de introducción
    this.storage.set('mostreLaIntro', true).then(() => {
      this.router.navigateByUrl('/intro');
    });
  }

  skipIntro() {
    // Coloca aquí la lógica que deseas ejecutar al omitir la introducción
    console.log('Intro omitida');
  }
  
}