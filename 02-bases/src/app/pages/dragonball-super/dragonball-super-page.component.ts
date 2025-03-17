import { Component, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";

interface Character {
  id: number
  name: string
  power: number
}

@Component({
  imports: [CharacterListComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {
  name = signal('')
  power = signal(0)

  characters = signal<Character[]>([
    { id: 1, name: 'Goku',  power: 9000 },
    { id: 2, name: 'Vegetta',  power: 8000 },
  ])

  addCharacter({ name, power }: Partial<Character>) {
    if (!name || !power) return

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name,
      power
    }

    this.characters.update(characters => [...characters, newCharacter])
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }
}
