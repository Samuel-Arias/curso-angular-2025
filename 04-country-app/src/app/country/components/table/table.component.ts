import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-table',
  imports: [DecimalPipe],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  countries = input.required<Country[]>()
}
