# Angular | Skeleton App
This repo contains a simple skeleton for an Angular app using Bower, Gulp and Less.

The app
-------------

####Architectural design
This project is developed in a modular way and implement the MVC pattern.
Each features represent a module (for example: login, home, admin...)
Each module contains files related to it (for example: login-controller.js, login.html, login.css)

####Design
On this seed project, you can use two different design:

- on branch <i>master</i> : we use Bootstrap, UI-Bootstrap and Font-Awesome
- on branch <i>material</i> : we use Angular Material

#####ES6
This project use ECMAScript 6. Since not all browsers are up to date with this version of javascript, a gulp task using BabelJs change ES6 code to ES5 so you can code in ES6.

#####Javascript guideline
This project try to follow javascript best practices. To do so, we follow the Airbnb javascript style guide.
See more : https://github.com/airbnb/javascript

##### Angular code guideline
This project follows the angular code guideline of John Papa and Todd Motto, and also the angular git commit guideline :
* John Papa :  https://github.com/johnpapa/angular-styleguide#iife
* Todd Motto : https://github.com/toddmotto/angularjs-styleguide
* Angular Git commit guideline : https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit
