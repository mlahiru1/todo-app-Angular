import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  template: `<app-todo></app-todo>`
})
export class AppComponent {}
