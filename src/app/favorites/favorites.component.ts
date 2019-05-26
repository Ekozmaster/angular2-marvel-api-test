import { Component, OnInit } from '@angular/core';
import { CharacterInfo } from '../character.info';
import { CharactersRequesterService } from '../characters-requester.service';
import { PagerUtility } from '../pager.utility';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private listingSize = 16; // 16 characters / page
  // Map used to provide pagination info
  pager: any = {};

  // Paged characters list
  charsList: CharacterInfo[];
  pagesIndexes: number[];
  constructor(private charRequester: CharactersRequesterService,
              private route: ActivatedRoute) { }

  // Copy to clipboard method found at:
  // https://stackoverflow.com/a/49121680/6115317
  static copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  ngOnInit() {
    this.updatePages(1);
  }

  onSelectPage(pageNumber: number): void {
    if(pageNumber === this.pager.currentPage) { return; }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.updatePages(pageNumber);
  }

  onShareButton() {
    const favoritesData = localStorage.getItem('favoriteChars');
    let favoriteChars: number[] = [];
    if (favoritesData !== null) {
      favoriteChars = JSON.parse(favoritesData) as number[];
      // create a list of item ids in a queryParam syntax
      const itemsQueryParam = 'ids=' + favoriteChars.map((item) => item).join(',');

      // create a link to this page with the queryParams representing the items
      // and copy to user's clipboard.
      FavoritesComponent.copyMessage(window.location.href + `/?${ itemsQueryParam }`);
    }
  }

  // This method basically makes a loop in all favorites data stored by localStorage
  // and performs a single request to a specific id on every iteration, because it seems
  // that Marvel API doesn't allows request with multiple IDs.
  updatePages(pageNumber: number): void {
    const queryParams = this.route.snapshot.queryParams;
    const parsedItemIds = queryParams && queryParams.ids && queryParams.ids.split(',');
    let favoriteChars: number[] = [];
    if (parsedItemIds) {
      favoriteChars = parsedItemIds;
    } else {
      const favoritesData = localStorage.getItem('favoriteChars');
      if (favoritesData !== null) {
        favoriteChars = JSON.parse(favoritesData) as number[];
      }
    }

    this.charsList = [];

    const pageBegin = this.listingSize * (pageNumber - 1);
    const pageEnd = pageBegin + this.listingSize;
    for(let i = pageBegin; i < favoriteChars.length && i < pageEnd; i++) {
      this.charRequester.getCharacterByID(favoriteChars[i]).subscribe(
        responseData => {
          const responseChar = responseData.data.results[0];
          // TODO: Push characters sorted in this list, cause nor the async requests returns in the same order
          // they were requested, neither do the user insert favorite characters sorted.
          this.charsList.push({ id: responseChar.id,
                                name: responseChar.name,
                                description: responseChar.description,
                                img_src: responseChar.thumbnail.path + '.' + responseChar.thumbnail.extension,
                                favorited: CharactersRequesterService.checkCharacterIsFavorited(responseChar.id)});
        }
      );
    }
    this.pager = PagerUtility.getPager(favoriteChars.length, pageNumber, this.listingSize);
    this.pagesIndexes = [];
    for (let i = this.pager.startPage; i <= this.pager.endPage; i++) {
      this.pagesIndexes.push(i);
    }
  }

}
