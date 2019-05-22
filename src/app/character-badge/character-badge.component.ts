import { Component, OnInit, Input } from '@angular/core';
import { CharacterInfo } from './../character.info'

@Component({
  selector: 'app-character-badge',
  templateUrl: './character-badge.component.html',
  styleUrls: ['./character-badge.component.css']
})
export class CharacterBadgeComponent implements OnInit {
  @Input() charInfo : CharacterInfo;

  constructor() { }

  ngOnInit() {
  }

}
