import { Component, OnInit } from '@angular/core';
import { CharacterInfo, mockChars } from './../character.info';
import { PagerUtility } from '../pager.utility';

@Component({
  selector: 'app-characters-listing',
  templateUrl: './characters-listing.component.html',
  styleUrls: ['./characters-listing.component.css']
})
export class CharactersListingComponent implements OnInit {
  // Map used to provide pagination info
  pager: any = {};

  // Paged characters list
  charsList : CharacterInfo[];
  pagesIndexes : number[];

  constructor() { }

  ngOnInit() {
    this.updatePages(1);
  }

  onSelectPage(pageNumber: number): void {
    if(pageNumber === this.pager.currentPage) return;
    this.updatePages(pageNumber);
  }

  updatePages(pageNumber: number): void {
    this.pager = PagerUtility.getPager(mockChars.length, pageNumber, 10);
    this.charsList = mockChars.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.pagesIndexes = [];
    for(let i = this.pager.startPage; i <= this.pager.endPage; i++) {
      this.pagesIndexes.push(i);
    }
  }

}
