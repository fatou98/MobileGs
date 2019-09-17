import { Component, OnInit } from '@angular/core';
import { CommandesService } from './commandes.service';
import { Commande } from './commande.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {
  loadedCommandes: Commande[];
  finishedCommandes: Commande[];
  private commandesSub: Subscription;

  constructor(private commandesService: CommandesService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
      this.loadedCommandes = this.commandesService.commandes;
      this.finishedCommandes = this.loadedCommandes;
    }

  onEdit(commandeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'home', 'tabs', 'commandes', 'edit', commandeId]);
    console.log('Editing command', commandeId);
  }

  onDelete(commandeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'home', 'tabs', 'commandes']);
    console.log('Deleting command', commandeId);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.authService.userId.pipe(take(1)).subscribe(userId => {
      if (event.detail.value === 'encours') {
        this.finishedCommandes = this.loadedCommandes.filter(
          commande => commande.userId !== userId && commande.statutCommande === true
        );
      } else {
        this.finishedCommandes = this.loadedCommandes.filter(
          commande => commande.userId !== userId && commande.statutCommande === false
        );
      }
    });
  }
}
