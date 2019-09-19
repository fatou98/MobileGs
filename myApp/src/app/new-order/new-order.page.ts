import { Component, OnInit } from '@angular/core';

import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Customer } from '../customer';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File) { }
customers:Customer[]
  ngOnInit() {
    this.customers=JSON.parse(localStorage.getItem('customers'))
  }
  
  pickImage(sourceType) {
    const options: CameraOptions = {
    quality: 100,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    console.log(imageData);
    
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    }
    async selectImage() {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
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
  
   
   

}
