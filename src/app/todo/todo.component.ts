import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  task: string = '';
  tasks: Task[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case 'active': return this.tasks.filter(t => !t.completed);
      case 'completed': return this.tasks.filter(t => t.completed);
      default: return this.tasks;
    }
  }

  addTask() {
    if (this.task.trim()) {
      this.tasks.push({ name: this.task.trim(), completed: false });
      this.task = '';
      this.saveTasks();
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  editTask(task: Task) {
    task.editing = true;
  }

  saveEditedTask(task: Task) {
    task.editing = false;
    this.saveTasks();
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  clearAll() {
    this.tasks = [];
    this.saveTasks();
  }
}
