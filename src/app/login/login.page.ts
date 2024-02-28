import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   loginForm: FormGroup;
   validation_messages = {
    email: [
      { type: "required", message: "El correo es obligatorio." },
      { type: "pattern", message: "Correo incorrecto." }
    ],
    password: [
      { type: "required", message: "La contraseña es obligatoria." },
      { type: "pattern", message: "Contraseña incorrecta." }
    ]
   };
    loginMessage: any;
   constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
   ){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required, 
          Validators.pattern("^[a-zA-Z0,-9_.+]+@[a-zA-Z0-9.]+$"),
          Validators.maxLength(30),
          Validators.minLength(5)
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5), // Mínimo de 5 caracteres
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Al menos una minúscula, una mayúscula, un número y un carácter especial
        ])
      )
    });
  }

  ngOnInit() {}

  login(login_data: any) {
    console.log(login_data);
    this.authService.loginUser(login_data).then(res => {
      this.loginMessage = res;
      this.storage.set('userLoggedIn', true);
      this.navCtrl.navigateForward('/home');
    }).catch(err => {
      this.loginMessage   = err;
    });
  }
}
