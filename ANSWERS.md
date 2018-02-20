## Number 1

- haven't found anything unusual (?) //Need to finish.
- There are .gitignores in client, server, and lab-3-angular...blakerochteam, 
- Having more than one .gitignore is helpful for keeping what you want to ignore separate. Different folders have different files and need to ignore different things. Plus, from my understanding, it also sets up a sort of 'ignoring' hierarchy, where 'rules' get more specific about what to ignore the deeper you get into the file.
- These ignores interact with each other kind of like parents and children in programing. If you have a .gitignore in your project folder, everything in your project pertaining to the contents of ignore will be ignored. However if you have an ignore in a folder of your project folder, only things in that folder and deeper will be affected.


##Number 2

- Much like .gitignores, different tasks require different things to be used to built them. There is no point in building with dependencies or tasks for a server accessing a database if you're building for a client.

##Number 3

- The code for the menu is defined in client/src/app/app.component.html where it is defined, the contents of the nav bar is defined, and finally the nav bar is given an icon and a name to display beside it.
- All of the work for this is being done client side, and on one 'page'; we are tricking the browser into thinking it is multiple with the use of urls. 
- Each button / label in the nav menu is routed to a different sets of typescript to run. Each also have their own components to display, all being done using angular.

##Number 4

- This is the typescript that allows us to request information from the api, which goes through the server / database to get.
- It is not done just in user-list.component.ts because we want to be able to access and inject these services into any other part of our application. We *could* do it in user-list.component.ts but that isn't good practice. In the Angular's words, a service is something with a narrow, well defined purpose. Our component.ts can then use these services, and if we wanted to use them somewhere else as well, then we can. (https://angular.io/guide/architecture)
