import { Component } from '@angular/core';

import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animales.interfaces';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;

  constructor() {
    this.animales = ANIMALES.slice(0); // slice retorna un nuevo array de los elementos seleccionados
  }

  reproducir( animal:Animal ) {

    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    
    // el valor de animal.reproduciendo va a cambiar cuando termine su tiempo de duracion
    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausarAudio(animalSeleccionado:Animal) {
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(index:number) {
    this.animales.splice(index, 1); // borrar un elemento del arreglo
  }

  recargarAnimales(refresher:Refresher) {
    // funcion para hacer refresh a la pantalla
    console.log("Inicio de refresh");

    setTimeout( () => {
      console.log("Termino el refresh");
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenarAnimales(indices:any) {
    // funcion para reordenar los elementos
    console.log(indices);

    this.animales = reorderArray(this.animales, indices);
  }

}
