//import { ToastDuration, Toasty } from '@triniwiz/nativescript-toasty';

export class DetalleModel {
    static id: number = 0;
    public name: string;

    constructor()  {
        DetalleModel.id++;
        this.name = 'Oferta '+DetalleModel.id;
    }

    edit(n: string)  {
        this.name = n;
    }
}


