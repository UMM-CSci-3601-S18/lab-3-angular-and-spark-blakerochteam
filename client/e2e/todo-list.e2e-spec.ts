import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // // queue 100ms wait between test
    // //This delay is only put here so that you can watch the browser do its' thing.
    // //If you're tired of it taking long you can remove this call
    // origFn.call(browser.driver.controlFlow(), function () {
    //     return protractor.promise.delayed(100);
    // });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo Name attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todos');
    });

  it('should check whether all of the fields are empty before entering anything', () => {
    page.navigateTo();
    expect(page.getTodoOwnerField()).toEqual('');
    expect(page.getTodoCategoryField()).toEqual('');
    expect(page.getTodoStatusField()).toEqual('');
    expect(page.getTodoBodyField()).toEqual('');
  });

    it('should type something in filter owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("f");
        expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry, VIDEO GAMES");
        page.backspace();
        page.typeAnOwner("barry");
        expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry, VIDEO GAMES");
    });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("software");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche, SOFTWARE DESIGN");
    for(let i = 0; i < 8; i++){
      page.backspace();
    }
    page.typeACategory("groc");
    expect(page.getUniqueTodo("5889598555fbbad472586a56")).toEqual("Blanche, GROCERIES");
  });

  it('should type something in filter status box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAStatus(false);
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche, SOFTWARE DESIGN");
    for(let i = 0; i < 5; i++){
      page.backspace();
    }
    page.typeAStatus(true);
    expect(page.getUniqueTodo("58895985ae3b752b124e7663")).toEqual("Fry, HOMEWORK");
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("in sunt");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche, SOFTWARE DESIGN");
    for(let i = 0; i < 7; i++){
      page.backspace();
    }
    page.typeABody("deserunt veli");
    expect(page.getUniqueTodo("58895985847a6c1445ec4048")).toEqual("Barry, HOMEWORK");
  });

  it('should type something in filter owner box and status box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnOwner("fry");
    page.typeAStatus(false);
    expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry, VIDEO GAMES");
  });

  it('should type something in filter owner box and category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnOwner("blanche");
    page.typeACategory("groc");
    expect(page.getUniqueTodo("5889598555fbbad472586a56")).toEqual("Blanche, GROCERIES");
  });

  it('should type something in filter category box and body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("groc");
    page.typeABody("do ess");
    expect(page.getUniqueTodo("588959856132e538dcfcf1b8")).toEqual("Roberta, GROCERIES");
  });

  it('should type something in filter owner, status, caetgory and body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnOwner("Workman");
    page.typeAStatus(false);
    page.typeACategory("groceries")
    page.typeABody("tempor");
    expect(page.getUniqueTodo("588959854bfbbd101d622167")).toEqual("Workman, GROCERIES");
    expect(page.getUniqueTodo("588959851a7fe4e2b50d9068")).toEqual("Workman, GROCERIES");
    expect(page.getUniqueTodo("58895985554c936f063e044e")).toEqual("Workman, GROCERIES");
  });




});
