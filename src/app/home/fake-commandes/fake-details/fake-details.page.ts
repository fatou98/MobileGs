import { Component, OnInit } from '@angular/core';
import { Client } from '../../clients/client.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ClientsService } from '../../clients/clients.service';
import { AuthService } from 'src/app/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-fake-details',
  templateUrl: './fake-details.page.html',
  styleUrls: ['./fake-details.page.scss'],
})
export class FakeDetailsPage implements OnInit {
  client: Client;
  private clientSub: Subscription;
  isLoading = false;
  isValid = false;
  finished = false;
  finished2 = false;

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
        onFinish() {
          this.finished = !this.finished;
        }

        onFinish2() {
          this.finished2 = !this.finished2;
        }

        // tslint:disable-next-line: use-life-cycle-interface
        ngOnDestroy() {
          if (this.clientSub) {
            this.clientSub.unsubscribe();
          }
        }

      }

