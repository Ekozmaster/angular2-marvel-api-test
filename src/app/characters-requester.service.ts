import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CharacterInfo } from './character.info';

const pubAccessKey = 'bcead32b5872a5c7ea802173b3f165f7';

@Injectable({
  providedIn: 'root'
})
export class CharactersRequesterService {
  private marvelAPIUrl = 'https://gateway.marvel.com/v1/public/characters';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: '*/*' }),
    params: new HttpParams().set('apikey', pubAccessKey )
  };

  constructor(private http: HttpClient) { }

  static checkCharacterIsFavorited(id: number): boolean {
    const favoritesData = localStorage.getItem('favoriteChars');
    let favoriteChars: number[] = [];
    if (favoritesData !== null) {
      favoriteChars = JSON.parse(favoritesData) as number[];
    }
    if (favoriteChars.some(o => o === id)) { return true; }
    return false;
  }

  // Pass a empty string on 'nameStartsWith' to not filter by name.
  getCharacters(nameStartsWith: string, limit: number, offset: number): Observable<any> {
    // Setting timestamp, limit, offset and name filter params for the request.
    let params = new HttpParams().set('apikey', pubAccessKey )
                      .set('ts', Date.now().toString())
                      .set('limit', limit.toString())
                      .set('offset', offset.toString());
    if (typeof nameStartsWith !== 'undefined' && nameStartsWith) { params = params.set('nameStartsWith', nameStartsWith); }

    this.httpOptions.params = params;

    return this.http.get<any>(this.marvelAPIUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('getHeroes', []))
      );
  }

  getCharacterByID(id: number): Observable<any> {
    // Setting timestamp, limit, offset and name filter params for the request.
    let params = new HttpParams().set('apikey', pubAccessKey )
                      .set('ts', Date.now().toString())
                      .set('id', id.toString());
    this.httpOptions.params = params;

    return this.http.get<any>(this.marvelAPIUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('getHeroes', []))
      );
  }

  // Get multiple characters by a array of IDs
  getCharactersByID(ids: number[], limit: number, offset: number): any[] {
    let results : any[] = [];
    for(const charID of ids) {
      let params = new HttpParams().set('apikey', pubAccessKey )
      .set('ts', Date.now().toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('id', ids.toString());
      this.httpOptions.params = params;
      let result : any;
      this.http.get<any>(this.marvelAPIUrl, this.httpOptions).subscribe(
        data => { results.push(data); }
      );
    }
    return results;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
