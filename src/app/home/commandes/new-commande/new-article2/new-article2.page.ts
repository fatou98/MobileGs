import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/home/clients/client.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ClientsService } from 'src/app/home/clients/clients.service';
import { AuthService } from 'src/app/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  selector: 'app-new-article2',
  templateUrl: './new-article2.page.html',
  styleUrls: ['./new-article2.page.scss'],
})
export class NewArticle2Page implements OnInit {
  client: Client;
  private clientSub: Subscription;
  isLoading = false;
  isValid = false;

  form: FormGroup;

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

      this.form = new FormGroup({
            image: new FormControl(null),
            nom: new FormControl(null, {
              updateOn: 'blur',
              validators: [Validators.required]
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

        // tslint:disable-next-line: use-life-cycle-interface
        ngOnDestroy() {
          if (this.clientSub) {
            this.clientSub.unsubscribe();
          }
        }

      }
