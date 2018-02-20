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

    it('should type something in filter owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("f");
        expect(page.getUniqueTodo("58895985c1849992336c219b")).toEqual("Fry, VIDEO GAMES");
        page.backspace();
        page.typeAnOwner("barry")
        expect(page.getUniqueTodo("588959856f0b82ee93cd93eb")).toEqual("Barry, VIDEO GAMES");
    });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("software");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche, SOFTWARE DESIGN");
    page.backspace();
    page.typeACategory("groc")
    expect(page.getUniqueTodo("5889598555fbbad472586a56")).toEqual("Blanche, GROCERIES");
  });

    // it('should click on the age 27 times and return 3 elements', () => {
    //     page.navigateTo();
    //     page.typeAnOwner("blanche");
    //
    //     expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche, SOFTWARE DESIGN ID: 58895985a22c04e761776d54");
    //
    //     expect(page.getUniqueTodo("58895985186754887e0381f5")).toEqual("Blanche, SOFTWARE DESIGN ID: 58895985186754887e0381f5");
    //
    // });
});
