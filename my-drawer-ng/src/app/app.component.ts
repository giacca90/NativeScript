import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application, Color, Label, View, action } from '@nativescript/core'
import { EditComponent } from './editar-comp.component'
import { ToastDuration, Toasty } from '@triniwiz/nativescript-toasty'
import { MenuService } from './services/menu.service'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase
  @ViewChild("home") home: ElementRef;
  @ViewChild("browse") browse: ElementRef;
  @ViewChild("search") search: ElementRef;
  @ViewChild("featured") featured: ElementRef;
  @ViewChild("entrada") entrada: ElementRef;
  @ViewChild("settings") settings: ElementRef;


  @ViewChild("Texthome") Texthome: ElementRef;
  @ViewChild("Textbrowse") Textbrowse: ElementRef;
  @ViewChild("Textsearch") Textsearch: ElementRef;
  @ViewChild("Textfeatured") Textfeatured: ElementRef;
  @ViewChild("Textentrada") Textentrada: ElementRef;
  @ViewChild("Textsettings") Textsettings: ElementRef;

  constructor(private router: Router, 
    private routerExtensions: RouterExtensions,  
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    public archivado: MenuService,
    public borrado: MenuService) 
    {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }

  gesto(s: string)  {
    switch (s) {
      case 'home':
        
        const home = <View>this.home.nativeElement;
        
    home.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => home.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.home, this.Texthome))
    )
        break;
      case 'browse':
        
        const browse = <View>this.browse.nativeElement;
        browse.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => browse.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.browse, this.Textbrowse))
    )
        break;
      case 'search':
        
        const search = <View>this.search.nativeElement;
        search.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => search.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.search, this.Textsearch))
    )
        break;
      case 'featured':
        
        const featured = <View>this.featured.nativeElement;
        featured.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => featured.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.featured, this.Textfeatured))
    )
        break;
      case 'entrada':
        
        const entrada = <View>this.entrada.nativeElement;
        entrada.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => entrada.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.entrada, this.Textentrada))
    )
        break;
      case 'settings':
        
        const settings = <View>this.settings.nativeElement;
        settings.animate({
      backgroundColor: new Color('blue'),
      duration: 500,
      delay: 500
    }).then(() => settings.animate({
      backgroundColor: new Color('white'),
      duration: 500,
      delay: 500
    }).then(() => this.popup(this.settings, this.Textsettings))
    )
        break;
    }
  }

  popup(s: ElementRef, v: ElementRef)  { 
    const elemento = s.nativeElement;
    const texto = v.nativeElement;
    const nombre: string = texto.get('text');
    const texthome = <View>this.Texthome.nativeElement;
    let options = {
      title: "Editar elemento "+nombre,
      message: "Choose your race",
      cancelButtonText: "Cancel",
      actions: ["Editar", "Archivar", "Eliminar"]
  };
  
  action(options).then((result) => {
      switch(result) {
        case 'Editar':
//          texto.set('text', 'Prueba')
          let options: ModalDialogOptions = {
            context: { promptMsg: nombre },
            viewContainerRef: this.viewContainerRef,
          };
          this.modalService
            .showModal(EditComponent, options)
            .then((dialogResult: string) => {
              if (dialogResult != "close") {
//                x.edit(dialogResult)
                texto.set('text', dialogResult)
                const toast = new Toasty({ text: "Elemento Editado" }).setToastDuration(
                  ToastDuration.SHORT
                );
                toast.show();
              } else {
                const toast = new Toasty({ text: "Elemento No Editado" }).setToastDuration(
                  ToastDuration.SHORT
                );
                toast.show();
              }
            });

        break

        case 'Archivar':
          this.archivado.archivar(s)
           const elem =<View>s.nativeElement;
           elem.destroyNode();
          const toast2 = new Toasty({ text: "Elemento Archivado" }).setToastDuration(
            ToastDuration.SHORT
          );
          toast2.show();
        break  

        case 'Eliminar':
          this.borrado.borrar(s)
          const elem2 =<View>s.nativeElement;
           elem2.destroyNode();
          const toast3 = new Toasty({ text: "Elemento Borrado" }).setToastDuration(
            ToastDuration.SHORT
          );
          toast3.show();
        break
      }
  });
  }
}
