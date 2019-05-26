import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersListingComponent } from './characters-listing/characters-listing.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CharactersListingComponent },
  { path: 'detail/:id', component: CharacterDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites/:ids', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search/:searchFilter', component: CharactersListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
