import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit(): void {
    
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // Trigger validation messages
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    localStorage.clear();

    this.http.get<any>(
      "https://www.learnerai-dev.theall.ai/v1/vid/generateVirtualID",
      { params: { username ,password} }
    ).subscribe(
      (response) => {
        if(response){
          if (response.virtualID) {
            localStorage.setItem("profileName", username);
            localStorage.setItem("virtualId", response.virtualID);
            localStorage.setItem("contentSessionId", uuidv4());
            this.router.navigate(['/ta']);
          } 
        }
       else {
          alert("Enter correct username and password");
        }
      },
      (error) => {
        console.error("Error occurred:", error);
        alert("An error occurred. Please try again later.");
      }
    );
  }
}
