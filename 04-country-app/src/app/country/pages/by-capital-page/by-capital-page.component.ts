import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService)
  isLoading = signal(false)
  isError = signal<string | null>(null)
  countries = signal<Country[]>([])

  search(query: any) {
    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)

    this.countryService.searchByCapital(query).subscribe({
      next: countries => {
        this.isLoading.set(false)
        this.countries.set(countries)
      },
      error: err => console.error(err)
    })
  }
}
