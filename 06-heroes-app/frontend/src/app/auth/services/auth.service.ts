import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environments.baseUrl;
  private user?: User;

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;

    // structuredClone hace un clone del json de this.user, para evitar pasar la referencia
    return structuredClone( this.user );
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  login ( email: string, password: string ): Observable<User> {
    return this.httpClient.get<User>(`${ this.baseUrl }/users/1`, {})
    .pipe(
      tap( user => this.user = user ), // En el primer tap guardar el usuario en la propiedad del servicio
      tap( user => localStorage.setItem( 'token', 'asdjkjhdsa!@#$#%3asdy1asdadasdad5454' ) ), // En el segundo tap almacenamos a modo de token para hacer persistente el inicio de sesion
      catchError(
        error => {
          console.warn(error);
          return of(error)
          
        }
      )
    );
  }

  logOut (): void {
    this.user = undefined;
    localStorage.clear();
  }
}
