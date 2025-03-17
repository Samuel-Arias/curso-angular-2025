import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number
  name: string
  power: number
}

@Component({
  imports: [],
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
  name = signal('')
  power = signal(0)

  characters = signal<Character[]>([
    { id: 1, name: 'Goku',  power: 9000 },
    // { id: 2, name: 'Vegetta',  power: 8000 },
    // { id: 3, name: 'Piccolo',  power: 3000 },
    // { id: 4, name: 'Yamcha',  power: 500 },
    // { id: 5, name: 'Gohan',  power: 7000 },
    // { id: 6, name: 'Majin Bu',  power: 10000 },
    // { id: 7, name: 'Bulma',  power: 10 },
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
