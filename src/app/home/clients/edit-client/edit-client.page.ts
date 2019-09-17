import { Component, OnInit, OnDestroy} from '@angular/core';
import { Client } from '../client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
})
export class EditClientPage implements OnInit {
  client: Client;
  form: FormGroup;
  private clientSub: Subscription;
  private mesures: number[];
  clientId: string;
  isLoading = false;

  constructor(private route: ActivatedRoute,
              private clientsService: ClientsService,
              private navCtrl: NavController,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

    ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('clientId')) {
          this.navCtrl.navigateBack('/home/tabs/clients');
          return;
        }

        this.clientId = paramMap.get('clientId');

        this.isLoading = true;

        this.clientSub = this.clientsService
        .getClient(paramMap.get('clientId'))
        .subscribe(client => {
          this.client = client;

          this.form = new FormGroup({
            image: new FormControl(this.client.imageUrl),
            nom: new FormControl(this.client.nom, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            prenom: new FormControl(this.client.prenom, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            adresse: new FormControl(this.client.adresse, {
              updateOn: 'blur'
            }),
            email: new FormControl(this.client.email, {
              updateOn: 'blur'
            }),
            telephone: new FormControl(this.client.telephone, {
              updateOn: 'blur'
            }),
            epaule: new FormControl(this.client.mesures[0], {
              updateOn: 'blur'
            }),
            col: new FormControl(this.client.mesures[1], {
              updateOn: 'blur'
            }),
            manche: new FormControl(this.client.mesures[2], {
              updateOn: 'blur'
            }),
            LongBoubou: new FormControl(this.client.mesures[3], {
              updateOn: 'blur'
            }),
            poitrine: new FormControl(this.client.mesures[4], {
              updateOn: 'blur'
            }),
            tourVentre: new FormControl(this.client.mesures[5], {
              updateOn: 'blur'
            }),
            tourBras: new FormControl(this.client.mesures[6], {
              updateOn: 'blur'
            }),
            ceinture: new FormControl(this.client.mesures[7], {
              updateOn: 'blur'
            }),
            bassin: new FormControl(this.client.mesures[8], {
              updateOn: 'blur'
            }),
            LongGenou: new FormControl(this.client.mesures[9], {
              updateOn: 'blur'
            }),
            tourGenou: new FormControl(this.client.mesures[10], {
              updateOn: 'blur'
            }),
            bas: new FormControl(this.client.mesures[11], {
              updateOn: 'blur'
            }),
            LongPantalon: new FormControl(this.client.mesures[12], {
              updateOn: 'blur'
            }),
            tourCuisse: new FormControl(this.client.mesures[13], {
              updateOn: 'blur'
            })
          });
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Client could not be fetched. Please try again later.',
            buttons: [{text: 'OK', handler: () => {
              this.router.navigate(['home/tabs/clients']);
            }}]
          }).then(alertEl => {
            alertEl.present();
          });
        }
        );
      });
    }


    onImagePicked(imageData: string | File) {
      let imageFile;
      if (typeof imageData === 'string') {
        try {
          imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
        } catch (error) {
          console.log(error);
          return;
        }
      } else {
        imageFile = imageData;
      }

      this.form.patchValue({ image: imageFile });
    }

    onUpdateClient() {
      if (!this.form.valid) {
        return;
      }

      this.mesures = [+this.form.value.epaule,
        +this.form.value.col,
        +this.form.value.manche,
        +this.form.value.LongBoubou,
        +this.form.value.poitrine,
        +this.form.value.tourVentre,
        +this.form.value.tourBras,
        +this.form.value.ceinture,
        +this.form.value.bassin,
        +this.form.value.LongGenou,
        +this.form.value.tourGenou,
        +this.form.value.bas,
        +this.form.value.LongPantalon,
        +this.form.value.tourCuisse
      ];

      this.loadingCtrl.create({
        message: 'Updating client...'
      })
      .then(loadingEl => {
        loadingEl.present();

        this.clientsService
        .uploadImage(this.form.get('image').value)
        .pipe(
          switchMap(uploadRes => {
            return this.clientsService
            .updateClient(
              this.client.id,
              uploadRes.imageUrl,
              this.form.value.nom,
              this.form.value.prenom,
              this.form.value.adresse,
              this.form.value.email,
              this.form.value.telephone,
              this.mesures);
          })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/home/tabs/clients']);
          });
        });

      }

      // tslint:disable-next-line: use-life-cycle-interface
      ngOnDestroy() {
        if (this.clientSub) {
          this.clientSub.unsubscribe();
        }
      }

    }
