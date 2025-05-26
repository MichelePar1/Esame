import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected http = inject(HttpClient);

  
  register(user: User){
    return this.http.post<User>('/api/register', user)  
  }

fetchUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
}
