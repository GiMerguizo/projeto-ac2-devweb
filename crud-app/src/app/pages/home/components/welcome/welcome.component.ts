import { Component } from '@angular/core';

interface Task {
  done: boolean;
  description: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  taskList: Task[] = []

  constructor() {
    this.taskList = [
      {done: false, description: "Clean the house"},
      {done: false, description: "Wash the car"},
      {done: true, description: "Feed the dog"},
    ]
  }

  changeTask(task: Task) {
    task.done = !task.done
  }

}
