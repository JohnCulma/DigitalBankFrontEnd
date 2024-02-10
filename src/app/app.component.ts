import { Component} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DigitalBank';
  token: string|undefined;
  hide = true;
  loginForm: FormGroup;

  loginData = {
    UserName: 'john.culma',
    Password:'Admin123*.'

  }

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) {
                this.token = undefined;
                this.loginForm = this.formBuilder.group({                  
                  usuario: ['',[Validators.required, this.trimValidator]],
                  contrasena: ['',[Validators.required, this.trimValidator]]
   
                })
  }
   
  login() {

    debugger
    this.loginService.login(this.loginData).subscribe((data:any) => {
      localStorage.setItem('token_value',data.token);
      localStorage.setItem('expiration',data.expiration);   
      localStorage.setItem('usuario', this.loginData.UserName); 
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido',
      showConfirmButton: false,
      timer: 1500
    });
      this.router.navigateByUrl('inicio/dashboard');
    
    },
    (errorData) => 

    Swal.fire({
      icon: 'error',
      title:  errorData.error.message,
      text: errorData.error.displayMessage,
      footer: errorData.error.title
    })     
    );
  }

  trimValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.trim() !== control.value) {
      return { 'whitespace': true };
    }
    return null;
  }
  
  public send() {
    
    console.log("Token "+ JSON.stringify(this.token) +" generated");
    console.debug(`Token [${this.token}] generated`);
  }
}


