import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CharacterInfo, mockChars } from './character.info';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = mockChars;
    return {characters};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(characters: CharacterInfo[]): number {
    return characters.length > 0 ? Math.max(...characters.map(character => character.id)) + 1 : 1;
  }
}
