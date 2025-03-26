import { Component, output, signal } from '@angular/core';
import { Character } from '../../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './dragonball-character-add.component.html',
  styles: ``
})
export class DragonballCharacterAddComponent {
  name = signal('')
  power = signal(0)

  newCharacter = output<Character>()

  addCharacter({ name, power }: Partial<Character>) {
    if (!name || !power) return

    const newValue: Character = {
      id: Math.floor(Math.random() * 1000),
      name,
      power
    }

    this.newCharacter.emit(newValue)
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }
}
