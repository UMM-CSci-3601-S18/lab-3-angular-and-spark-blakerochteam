import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          _id: 'blanche_id',
          owner: 'Blanche',
          status: true,
          category: 'software design',
          body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.'
        },
        {
          _id: 'fry_id',
          owner: 'Fry',
          status: false,
          category: 'video games',
          body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.'
        },
        {
          _id: 'blake_id',
          owner: 'Blake',
          status: false,
          category: 'video games',
          body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ TodoListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]

    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a todo named \'Blanche\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Blanche')).toBe(true);
  });

  it('contain a todo named \'Fry\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Fry')).toBe(true);
  });

  it('doesn\'t contain a todo named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('has two todo that are in the video games category', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === "video games").length).toBe(2);
  });
  it('todo list filters by name', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = true;
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by name and status', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = true;
    todoList.todoOwner = 'b';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

});

describe('Misbehaving todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
