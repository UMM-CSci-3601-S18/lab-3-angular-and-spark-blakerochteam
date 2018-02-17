import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Todo} from './todo';
import {TodoComponent} from './todo.component';
import {TodoListService} from './todo-list.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Todo component', () => {

  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoListServiceStub: {
    getTodosById: (todoId: string) => Observable<Todo>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodosById: (todoId: string) => Observable.of([
        {
          _id: 'blanche_id',
          owner: 'Blanche',
          status: false,
          category: 'software design',
          body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.'
        },
        {
          _id: 'fry_id',
          owner: 'Fry',
          status: true,
          category: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
          body: 'homework'
        },
        {
          _id: 'down_id',
          owner: 'Down',
          status: false,
          category: 'Officia nisi nulla eiusmod fugiat ex nulla amet reprehenderit velit. Ullamco elit non aliquip consectetur.',
          body: 'groceries'
        }
      ].find(todo => todo._id === todoId))
    };

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoComponent = fixture.componentInstance;
    });
  }));

  it('can retrieve Blanche by ID', () => {
    todoComponent.setId('blanche_id');
    expect(todoComponent.todo).toBeDefined();
    expect(todoComponent.todo.owner).toBe('Blanche');
    expect(todoComponent.todo.status).toBe(false);
    expect(todoComponent.todo.body).toBe("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.");
    expect(todoComponent.todo.category).toBe("software design");
  });

  it('returns undefined for Santa', () => {
    todoComponent.setId('Santa');
    expect(todoComponent.todo).not.toBeDefined();
  });

});
