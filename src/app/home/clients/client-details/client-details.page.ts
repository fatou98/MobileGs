import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ClientsService } from '../clients.service';
import { Client } from '../client.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {
  client: Client;
  private clientSub: Subscription;
  isLoading = false;

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private clientsService: ClientsService,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private router: Router
    ) { }

    ngOnInit() {
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

        // tslint:disable-next-line: use-life-cycle-interface
        ngOnDestroy() {
          if (this.clientSub) {
            this.clientSub.unsubscribe();
          }
        }

      }
