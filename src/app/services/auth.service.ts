import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loginUser(credential: any) {
    return new Promise((accept, reject) => {
      if (credential.email === 'samuelg2197@gmail.com' && credential.password === '123456') {
        accept('login correcto');
      } else {
        reject('/login incorrecto');
      }
      
    });
  
  }

  isValidUserData(userData: any): boolean {
    if (userData && userData.email && userData.password && userData.name && userData.last_name) {
      return true;
    }
    return false;
  }
  
  register(userData: any) {
    return new Promise((accept, reject) => {
      if (this.isValidUserData(userData)) {
        accept(userData);
      } else {
        reject('Los datos del usuario no son válidos');
      }
    });
  }
  
}

