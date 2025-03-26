import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  search(query: any) {
    console.log({query})
  }
}
