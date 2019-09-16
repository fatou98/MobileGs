import { Injectable } from '@angular/core';
import { Commande } from './commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private _commandes: Commande[] = [
    {
      id: 'cmd1',
      userId: 'empty for the moment',
      clientId: 'c1',
      prenomClient: 'Mandiallo',
      nomClient: 'Gueye',
      telClient: '772352235',
      modelImageUrl: 'assets/modeles-et-tissus/model1.jpg',
      typeTissu: 'getzner',
      prix: 30000,
      avance: 20000,
      reste: 10000,
      statutCommande: true
    },
    {
      id: 'cmd2',
      userId: 'empty for the moment',
      clientId: 'c2',
      prenomClient: 'Kader',
      nomClient: 'Seck',
      telClient: '778451147',
      modelImageUrl: 'assets/modeles-et-tissus/modelHomme2.jpg',
      typeTissu: 'bazin riche',
      prix: 30000,
      avance: 20000,
      reste: 10000,
      statutCommande: false
    }
  ];

  get commandes() {
    return [...this._commandes];
  }

  constructor() { }
}
