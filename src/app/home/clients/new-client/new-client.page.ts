import { Component, OnInit } from '@angular/core';
import { FormGroup, EmailValidator, FormControl, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {
  form: FormGroup;
  private mesures: number[];

  constructor(private clientsService: ClientsService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

    ngOnInit() {

      this.form = new FormGroup({
        image: new FormControl(null),
        nom: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        prenom: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        adresse: new FormControl(null, {
          updateOn: 'blur'
        }),
        email: new FormControl(null, {
          updateOn: 'blur'
        }),
        telephone: new FormControl(null, {
          updateOn: 'blur'
        }),
        epaule: new FormControl(null, {
          updateOn: 'blur'
        }),
        col: new FormControl(null, {
          updateOn: 'blur'
        }),
        manche: new FormControl(null, {
          updateOn: 'blur'
        }),
        LongBoubou: new FormControl(null, {
          updateOn: 'blur'
        }),
        poitrine: new FormControl(null, {
          updateOn: 'blur'
        }),
        tourVentre: new FormControl(null, {
          updateOn: 'blur'
        }),
        tourBras: new FormControl(null, {
          updateOn: 'blur'
        }),
        ceinture: new FormControl(null, {
          updateOn: 'blur'
        }),
        bassin: new FormControl(null, {
          updateOn: 'blur'
        }),
        LongGenou: new FormControl(null, {
          updateOn: 'blur'
        }),
        tourGenou: new FormControl(null, {
          updateOn: 'blur'
        }),
        bas: new FormControl(null, {
          updateOn: 'blur'
        }),
        LongPantalon: new FormControl(null, {
          updateOn: 'blur'
        }),
        tourCuisse: new FormControl(null, {
          updateOn: 'blur'
        })
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

    onCreateClient() {
      if (!this.form.valid || !this.form.get('image').value) {
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
        message: 'Creating client...'
      })
      .then(loadingEl =>  {
        loadingEl.present();
        this.clientsService
        .uploadImage(this.form.get('image').value)
        .pipe(
          switchMap(uploadRes => {
            return this.clientsService.addClient(
              uploadRes.imageUrl,
              this.form.value.nom,
              this.form.value.prenom,
              this.form.value.adresse,
              this.form.value.email,
              this.form.value.telephone,
              this.mesures,
              new Date(),
              new Date()
              );
            })
            )
            .subscribe(() => {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigate(['/home/tabs/clients']);
            });
          });
        }
      }
