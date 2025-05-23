import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showPassword: boolean = false;
  showRegister: boolean = false;
  showRegisterPassword: boolean = false;
  showRegisterConfirmPassword: boolean = false;

  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('password')?.updateValueAndValidity();
      if (this.registerForm.get('confirmPassword')?.value) {
        this.registerForm.get('confirmPassword')?.updateValueAndValidity();
      }
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      if (this.registerForm.get('password')?.value) {
        this.registerForm.get('confirmPassword')?.updateValueAndValidity();
      }
    });

    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      this.loginForm.get('email')?.markAsTouched();
    });

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.loginForm.get('password')?.markAsTouched();
    });
  }

  private passwordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const errors: ValidationErrors = {};
      
      if (!hasUpperCase) errors['noUpperCase'] = true;
      if (!hasLowerCase) errors['noLowerCase'] = true;
      if (!hasNumeric) errors['noNumeric'] = true;
      if (!hasSpecialChar) errors['noSpecialChar'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
    } else if (confirmPassword) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRegisterPassword() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  toggleRegisterConfirmPassword() {
    this.showRegisterConfirmPassword = !this.showRegisterConfirmPassword;
  }

  toggleCards() {
    this.showRegister = !this.showRegister;
    if (this.showRegister) {
      this.loginForm.reset();
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.setErrors(null);
        control?.markAsUntouched();
        control?.markAsPristine();
      });
    } else {
      if (!this.loginForm.get('email')?.value) {
        this.registerForm.reset();
        Object.keys(this.registerForm.controls).forEach(key => {
          const control = this.registerForm.get(key);
          control?.setErrors(null);
          control?.markAsUntouched();
          control?.markAsPristine();
        });
      }
    }
  }

  onLogin() {
    Swal.fire({
      title: '¡Bienvenido!',
      text: 'Inicio de sesión exitoso',
      icon: 'success',
      confirmButtonColor: 'rgba(106, 106, 106, 0.3)',
      confirmButtonText: 'Continuar',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm-button'
      }
    }).then(() => {
      this.router.navigate(['/home/info']);
    });
  }

  onRegister() {
    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Bienvenido a la plataforma',
      icon: 'success',
      confirmButtonColor: 'rgba(106, 106, 106, 0.3)',
      confirmButtonText: 'Continuar',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm-button'
      }
    }).then(() => {
      this.router.navigate(['/home/info']);
    });
  }

  get loginEmail() { return this.loginForm.get('email'); }
  get loginPassword() { return this.loginForm.get('password'); }
  get registerName() { return this.registerForm.get('name'); }
  get registerEmail() { return this.registerForm.get('email'); }
  get registerPassword() { return this.registerForm.get('password'); }
  get registerConfirmPassword() { return this.registerForm.get('confirmPassword'); }

  getPasswordError() {
    const errors = this.registerPassword?.errors;
    if (!errors) return '';
    
    if (errors['required']) return 'La contraseña es requerida';
    if (errors['minlength']) return 'La contraseña debe tener al menos 8 caracteres';
    if (errors['noUpperCase']) return 'Debe contener al menos una mayúscula';
    if (errors['noLowerCase']) return 'Debe contener al menos una minúscula';
    if (errors['noNumeric']) return 'Debe contener al menos un número';
    if (errors['noSpecialChar']) return 'Debe contener al menos un carácter especial (!#$%^&*)';
    
    return '';
  }

  getEmailError(isLogin: boolean = false) {
    const control = isLogin ? this.loginEmail : this.registerEmail;
    const errors = control?.errors;
    if (!errors) return '';
    
    if (errors['required']) return 'El email es requerido';
    if (errors['email']) return 'Ingresa un email válido';
    
    return '';
  }

  getNameError() {
    const errors = this.registerName?.errors;
    if (!errors) return '';
    
    if (errors['required']) return 'El nombre es requerido';
    if (errors['minlength']) return 'El nombre debe tener al menos 3 caracteres';
    
    return '';
  }

  getConfirmPasswordError() {
    const errors = this.registerConfirmPassword?.errors;
    if (!errors) return '';
    
    if (errors['required']) return 'La confirmación de contraseña es requerida';
    if (errors['passwordMismatch']) return 'Las contraseñas no coinciden';
    
    return '';
  }

  private showError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: 'rgba(106, 106, 106, 0.3)',
      confirmButtonText: 'Entendido',
      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm-button'
      }
    });
  }
} 