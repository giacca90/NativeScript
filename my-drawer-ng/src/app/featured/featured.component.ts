import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, Color, View } from '@nativescript/core'
import * as SocialShare from "@nativescript/social-share";
import { ImageSource } from "@nativescript/core";
import { ToastDuration, Toasty } from "@triniwiz/nativescript-toasty";
import * as camera from "@nativescript/camera";
import * as ism from "@nativescript/core/image-source"

@Component({
  selector: 'Featured',
  templateUrl: './featured.component.html',
})
export class FeaturedComponent implements OnInit {
  @ViewChild("layout") layout: ElementRef;
 
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  prueba()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      backgroundColor: new Color('blue'),
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      backgroundColor: new Color('white'),
      duration: 1500,
      delay: 750
    }))
  }

  prueba2()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      rotate: 360,
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      rotate: -360,
      duration: 1500,
      delay: 750
    }))
  }

  prueba3()  {
    const layout = <View>this.layout.nativeElement;
    layout.animate({
      scale: {x:2, y:2},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:1, y:1},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:0.5, y:0.5},
      duration: 1500,
      delay: 750
    }).then(() => layout.animate({
      scale: {x:1, y:1},
      duration: 1500,
      delay: 750
    }))
    )
    )
  }

  prueba4() {
//    let image: ImageSource =<ImageSource>ImageSource.fromResourceSync("~app/images/playstore-icon");
let image: ImageSource =ImageSource.fromFileOrResourceSync("res://stop_app");

     SocialShare.shareImage(image);
//    SocialShare.shareImage(image);
  }

  prueba5()  {
    const options = {
      width: 300,
      height: 300,
      keepAspectRatio: false,
      saveToGallery: true
  };
    camera.requestCameraPermissions().then(
      function success() {     
        console.log("acceso conseguido!!!");
       camera.takePicture(options)
      .then((imageAsset) => {
          console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
          console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
          console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
          ism.fromAsset(imageAsset).then((imageSource) => 
          SocialShare.shareImage(imageSource)
          ).catch((err) => console.log("Error => "+err));
          
      }).catch((err) => {
          console.log("Error -> " + err.message);
      });
    },
      function failure() {
        const toast = new Toasty({ text: "Error al acceder a la Camara!!!" }).setToastDuration(
          ToastDuration.SHORT
        );
        toast.show();
      }
  );
  }
}
