import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


interface Task {
  done: boolean;
  description: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  taskList: Task[] = []
  signupForm: FormGroup;

  constructor(private router: Router) {
    this.taskList = [
      {done: false, description: "Clean the house"},
      {done: false, description: "Wash the car"},
      {done: true, description: "Feed the dog"},
    ]

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  changeTask(task: Task) {
    task.done = !task.done
  } 

  onSubmit() {
    console.log("New user added with success!")
    console.log(this.signupForm.value);

    this.router.navigate(["/app/add-user"])
  }

  onEdit() {
    this.router.navigate(["/app/edit-user"])
  }

  onDelete() {
    console.log("Excluindo usuário.")
  }

}

