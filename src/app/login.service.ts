import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../Interfaces/IUsuarioLogin';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint:string = environment.endPointRest;
  private apiUrl: string = this.endPoint+ "CuentasUsuario/Login"

  constructor(private http:HttpClient, private router: Router) { }
  //register(user: UserInterface){
  //  return this.htp.post(this.baseUrl+'Register',user);
 // }


  login(user: UsuarioLogin){
   console.log("datos: "+JSON.stringify(user));
   return this.http.post(this.apiUrl,user);
  }

  get getDocument(){
    return localStorage.getItem('usuario');
  }

  get isAutenticado(){
    return !!localStorage.getItem('token_value');
  }

  logout(){
    localStorage.removeItem('expiration');
    localStorage.removeItem('token_value');
    this.router.navigateByUrl('/salir');

  }
}


