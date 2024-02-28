import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'pattern', message: 'Ingrese un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Debe confirmar la contraseña.' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden.' }
    ],
    'name': [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    'last_name': [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ]
  };
  registerMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
  ) { 
    this.registerForm = this.formBuilder.group({
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
      ),
      confirmPassword: [
        '', Validators.required
      ],
      name: [
        '', Validators.required
      ],
      last_name: [
        '', Validators.required
      ],
    }, 
    {validator: this.passwordMatchValidator('password', 'confirmPassword')}
    );
  }
  passwordMatchValidator(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordControl = group.controls[passwordKey];
      const confirmPasswordControl = group.controls[confirmPasswordKey];

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
  ngOnInit() {
  }

  register(register_data: any) {
    console.log(register_data);
    this.authService.loginUser(register_data).then(res => {
      this.registerMessage = res;
      this.storage.set('userLoggedIn', true);
      this.navCtrl.navigateForward('/home');
    }).catch(err => {
      this.registerMessage   = err;
    });
  }
  goToLogin(){
    this.navCtrl.navigateBack("/login");
  }
}