import { Component, OnInit } from '@angular/core';
import { Commande } from '../../commandes/commande.model';
import { Subscription } from 'rxjs';
import { Client } from '../../clients/client.model';
import { CommandesService } from '../../commandes/commandes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { ClientsService } from '../../clients/clients.service';
import { take, switchMap } from 'rxjs/operators';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-fake-termine',
  templateUrl: './fake-termine.page.html',
  styleUrls: ['./fake-termine.page.scss'],
})
export class FakeTerminePage implements OnInit {
  loadedCommandes: Commande[];
  finishedCommandes: Commande[];
  private commandesSub: Subscription;
  client: Client;
  private clientSub: Subscription;
  isLoading = false;
  isValid = false;
  archived = false;

  constructor(private commandesService: CommandesService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private clientsService: ClientsService,
              private alertCtrl: AlertController,
    ) { }

    ngOnInit() {
      this.loadedCommandes = this.commandesService.commandes;
      this.finishedCommandes = this.loadedCommandes;

      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('clientId')) {
          this.navCtrl.navigateBack('/home/tabs/clients');
          return;
        }
        this.isLoading = true;
        let fetchedUserId: string;
        this.authService.userId
        .pipe(
          take(1),
          switchMap(userId => {
            if (!userId) {
              throw new Error('Found no user!');
            }
            fetchedUserId = userId;
            return this.clientsService
            .getClient(paramMap.get('clientId'));
          })
          )
          .subscribe(
            client => {
              this.client = client;
              this.isLoading = false;
            },
            error => {
              this.alertCtrl
              .create(
                {
                  header: 'An error occurred!',
                  message: 'Could not load client',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.router.navigate(['/home/tabs/clients']);
                      }
                    }
                  ]
                })
                .then(alertEl => alertEl.present());
              }
              );
            });
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

              archive() {
                this.archived = !this.archived;
              }

              // tslint:disable-next-line: use-life-cycle-interface
              ngOnDestroy() {
                if (this.clientSub) {
                  this.clientSub.unsubscribe();
                }
              }

            }

