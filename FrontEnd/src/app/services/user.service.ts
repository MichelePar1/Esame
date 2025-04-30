import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected http = inject(HttpClient);

  
  register(user: User){
    console.log(user)
    return this.http.post<User>('/api/register', user)  

  }
}
