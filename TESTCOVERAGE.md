#### Highlights Todo Name attribute

We made this test to make sure that the client can see the the title "todos" on top of the page.
We checked this by checking whether the title at page is the same with what we are expecting.

#### Check whether all fields are empty before inserting anything.

We made this test to make sure all of our fields are empty, this is to avoid the fields having a value in it already which might return
the wrong todos. 
We checked this by checking the fields at the top of the page that you can put values in.

##### Getting todos with the Owner, Category, Status and Body fields

We want to check if whether after putting a value in the owner field, it returns the todos whose owner has that value.
After testing this, we remove the value and put in another vaue to make sure other todos are returning, and not the pervious one
with the previous values.
We did this by putting in a value, and then check the first the todo if it is the correct thing.
We did these same tests for Category, Status, and Body too.

#### Getting todos with Owner and Category, Category and Body, and all of the fields

We want to check whether putting in value in both owner and category returns the right todos. So, we want to check whether putting
values in multiple fields returns the right todos.
We did this by putting in values in both the owner and category field.

We did the same thing for Category and Body, and then we did it by putting in values in all of the fields.

we felt these were the tests that captures the key behaviours.

