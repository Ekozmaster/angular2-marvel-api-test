import { Component, OnInit, Input } from '@angular/core';
import { CharacterInfo, mockChars } from './../character.info';
import { PagerUtility } from '../pager.utility';
import { CharactersRequesterService  } from '../characters-requester.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters-listing',
  templateUrl: './characters-listing.component.html',
  styleUrls: ['./characters-listing.component.css']
})
export class CharactersListingComponent implements OnInit {
  @Input() idsToSearch: number[] = [];
  private listingSize = 16; // 16 characters / page
  // Map used to provide pagination info
  pager: any = {};

  // Paged characters list
  charsList: CharacterInfo[];
  pagesIndexes: number[];

  constructor(private route: ActivatedRoute,
              private charRequester: CharactersRequesterService) {
    // This component is reused in more than one route/page/part of the application,
    // so as the parameters in the URL changes, it must be aware of when it should refresh,
    // like when user submit some search in the search bar, it directs from home to
    // /search/:searchFilter but stills using CharacterListingComponent to show the results.
    this.route.params.subscribe(val => { this.updatePages(1); });
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

  updatePages(pageNumber: number): void {
    const searchFilter = this.route.snapshot.paramMap.get('searchFilter');
    this.charRequester.getCharacters(this.idsToSearch, searchFilter, this.listingSize, (pageNumber - 1) * this.listingSize).subscribe(
      responseData => {
        this.charsList = [];
        for(const curChar of responseData.data.results) {
          this.charsList.push({ id: curChar.id,
                                name: curChar.name,
                                description: curChar.description,
                                img_src: curChar.thumbnail.path + '.' + curChar.thumbnail.extension,
                                favorited: CharactersRequesterService.checkCharacterIsFavorited(curChar.id)});
        }

        this.pager = PagerUtility.getPager(responseData.data.total, pageNumber, this.listingSize);
        this.pagesIndexes = [];
        for (let i = this.pager.startPage; i <= this.pager.endPage; i++) {
          this.pagesIndexes.push(i);
        }
      }
    );


  }

}
