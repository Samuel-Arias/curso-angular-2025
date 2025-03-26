import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryAPIResp } from '../interfaces/countriesAPIResponse.interface';
import { map, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private httpClient = inject(HttpClient)

  searchByCapital(query: string) {
    query = query.toLowerCase()

    return this.httpClient.get<CountryAPIResp[]>(`${API_URL}/capital/${query}`).pipe(
      map(respCountries => CountryMapper.respCountriesToCountries(respCountries))
    )
  }
}
