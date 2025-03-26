import { CountryAPIResp } from "../interfaces/countriesAPIResponse.interface";
import { Country } from "../interfaces/country.interface";

export class CountryMapper {
    static respCountryToCountry(respCountry: CountryAPIResp): Country {
        return {
            capital: respCountry.capital.join(', '),
            cca2: respCountry.cca2,
            flag: respCountry.flag,
            flagSvg: respCountry.flags.svg,
            name: respCountry.translations['spa'].common ?? respCountry.name.common,
            population: respCountry.population,
        }
    }

    static respCountriesToCountries(countries: CountryAPIResp[]): Country[] {
        return countries.map( this.respCountryToCountry )
    }
}