import { Component, OnInit, Input } from '@angular/core';
import { CharacterInfo } from './../character.info';

@Component({
  selector: 'app-character-badge',
  templateUrl: './character-badge.component.html',
  styleUrls: ['./character-badge.component.css']
})
export class CharacterBadgeComponent implements OnInit {
  @Input() charInfo: CharacterInfo;
  constructor() { }

  ngOnInit() {
  }

  // This button acts as a toggle, add/remove to/from favorites. favoriteChars is a array of 'id's.
  onFavoritesButton() {
    event.stopPropagation();
    const favoritesData = localStorage.getItem('favoriteChars');
    let favoriteChars: number[] = [];
    if (favoritesData !== null) {
      favoriteChars = JSON.parse(favoritesData) as number[];
    }
    if (favoriteChars.some(o => o === this.charInfo.id)) {
      favoriteChars.splice(favoriteChars.indexOf(this.charInfo.id));
      this.charInfo.favorited = false;
    } else {
      favoriteChars.push(this.charInfo.id);
      this.charInfo.favorited = true;
    }
    localStorage.setItem('favoriteChars', JSON.stringify(favoriteChars));
  }

}
