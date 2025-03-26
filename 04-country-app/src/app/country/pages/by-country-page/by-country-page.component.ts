import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  search(query: string) {
    console.log({query})
  }
}
