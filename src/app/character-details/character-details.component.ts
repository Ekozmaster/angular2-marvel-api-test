import { Component, OnInit, Input } from '@angular/core';
import { CharacterInfo } from './../character.info';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharactersRequesterService } from '../characters-requester.service';


@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  charInfo: CharacterInfo;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private charRequester: CharactersRequesterService) { }

  ngOnInit() {
    this.charRequester.getCharacterByID(+this.route.snapshot.paramMap.get('id')).subscribe(
      responseData => {
        const responseChar = responseData.data.results[0];
        this.charInfo = { id: responseChar.id,
                          name: responseChar.name,
                          img_src: responseChar.thumbnail.path + '.' + responseChar.thumbnail.extension,
                          favorited: CharactersRequesterService.checkCharacterIsFavorited(responseChar.id),
                          description: responseChar.description };
      }
    );
  }

  goBack() {
    this.location.back();
  }

  // This button acts as a toggle, add/remove to/from favorites. favoriteChars is a array of 'id's.
  onFavoritesButton() {
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
