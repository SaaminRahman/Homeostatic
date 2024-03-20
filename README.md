
# About The framework
Homeostatic is a javascript framework that helps you to build you a website that can adapt to different screens, technically a flexible website. It is especially usefull to the new web 
developers who don't want to dive deep into complex frameworks for building a flexible website and just want to get started. So,utmost effort has been taken to keep the framework simple.

# Integrate Homeostatic To Your Project
There are two ways to integrate Homeostatic in your project. They are:
 1. Using NPM (Node Package Manager):
 2. Using CDN (Content Delivery Network):

# Initialize Homeostatic
After integating Homeostatic, import the `homeostatic` object to your javascript file:


```
  import { homeostatic } from "./homeostatic.js";
```
Configure `homeostatic` object according to your HTML:

```
  homeostatic.configure();
```
Run the framework:

```
  homeostatic.run();
```
 (Just paste the code to your javascript file if you do not understand anything, details will be given later)

# Set Up A Real Parent
 Any HTML element which act as a container of other children HTML elements can be a real parent. 
 ```
 <div data-h-parent="myrealparent" data-h-parenttype="real" >
 ```
Here `myrealparent` is the name of the real parent. Make sure each real parent has a unique name.

Now set a number between 0 to 100 which homeostatic will use as percentage and that percent of the screen width will be the width of the real parent when the screen width is less than the width of the real parent. 
```
<div data-h-parent="myrealparent" data-h-parenttype="real" data-h-managewidth="90%">
```
You can also give homeostatic a class name which will be included in the class list of the real parent by homeostatic for any other modification you want to bring in the real parent when screen width is less than the width of the real parent.
```
<div data-h-parent="myrealparent" data-h-parenttype="real" data-h-managewidth="90%" data-h-managestyle="newStyleClass">
