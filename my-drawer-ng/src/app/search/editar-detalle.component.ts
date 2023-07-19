import { Component, Input, ViewContainerRef } from "@angular/core";
//import { ModalDialogParams } from "@nativescript-angular/modal-dialog";
import { ModalDialogOptions, ModalDialogParams, ModalDialogService, instantiateSupportedAnimationDriver } from "@nativescript/angular";
import { DetalleModel } from "./detalle.model";
import { TextField } from "@nativescript/core";


@Component({
    selector: "modal-content",
    template: `
    <StackLayout margin="25" horizontalAlignment="center" verticalAlignment="center">
        <Label text="Editar Elemento"></Label>    
        <TextField 
        type="text" 
        [text]="prompt" 
        hint="Editar elemento"        
        (textChange)="cambios($event)"
        required
        ></TextField>
        <Label *ngIf="this.texto.length <= 0" text= "      Campo obligatorio!!!      "></Label>
        <Label *ngIf="this.texto.length > 0 && this.texto.length < 3" text="Se necesitan minimo 3 caracteres"></Label>

        <StackLayout orientation="horizontal" marginTop="12">
        <Button text="ok" (tap)="ok()" *ngIf="this.texto.length >= 3"></Button>
        <Button text="cancel" (tap)="close()"></Button>
        </StackLayout>
    </StackLayout>
  `
})
export class DialogContent {
    public prompt: string;
    public texto: string;
    constructor(private params: ModalDialogParams) {
        this.prompt = params.context.promptMsg;
        
    }

    cambios(args) {
        // returnPress event will be triggered when user submits a value
        let textField = args.object as TextField
        this.texto = textField.text
    }

    public ok() {
        this.params.closeCallback(this.texto);
    }

    public close() {
        this.params.closeCallback('close');    
  }
}

