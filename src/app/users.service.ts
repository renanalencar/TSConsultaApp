import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [
    {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone : '1-770-736-8031 x56442', website : 'hildegard.org'}
  ];

  backEndURL: string;

  constructor(private http: HttpClient) {
    this.backEndURL = this.getBackEndUrl();
   }

  getUsers() {
    return this.users;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.backEndURL}/users`);
    // return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }

  getUser(id: number): Observable<any> {
    // return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return this.http.get(`${this.backEndURL}/users/${id}`);
  }

  getBackEndUrl(): string {
    // const segements = document.URL.split('/');
    // const reggie = new RegExp(/localhost/);
    // return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://jsonplaceholder.typicode.com';
    return `https://jsonplaceholder.typicode.com`;

  }
}
