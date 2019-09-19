import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Mesure } from '../mesure';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  form: FormGroup;
  private mesures: Mesure[];
  croppedImagepath = '';
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private alertService: AlertService
    ) { }

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
    pickImage(sourceType) {
      const options: CameraOptions = {
        quality: 100,
        sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

    async selectImage() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
      await actionSheet.present();
  }


  save() {
    const customer = this.form.value;
    if (localStorage.getItem('customers')) {
      const customers = JSON.parse(localStorage.getItem('customers'));
      customers.push(customer);
      localStorage.setItem('customers', JSON.stringify(customers));

    } else {
      const customers = [];
      customers.push(customer);
      localStorage.setItem('customers', JSON.stringify(customers));

    }
    this.alertService.presentToast('Cient ajouté avec succès.');
  }
}
