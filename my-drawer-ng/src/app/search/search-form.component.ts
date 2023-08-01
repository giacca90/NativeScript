import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NoticiasService } from "../services/noticias.service"

@Component({
    selector: "SearchForm",
    moduleId: module.id,
    templateUrl: "./search-form.component.html"
    
})
export class SearchFormComponent implements OnInit {
    textFieldValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();

    constructor(public noticias: NoticiasService)  {

    }

    ngOnInit(): void {
       
    }

    onButtonTap(): void {
        console.log(this.textFieldValue);
        if (this.textFieldValue.length > 2) {
            this.search.emit(this.textFieldValue);
            console.log("en form "+ this.noticias.favoritos)
        }
    }
}