import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  searchFilter: string;
  constructor( private router: Router) { }

  ngOnInit() {
  }

  onSearchSubmit() {
    console.log(this.searchFilter);
    this.router.navigateByUrl('/search/' + this.searchFilter);
  }

}
