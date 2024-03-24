
# About The framework
Homeostatic is a javascript framework that helps you to build you a website that can adapt to different screens, technically a flexible website. It is especially useful to the new web developers who don't want to dive deep into complex frameworks for building a flexible website and just want to get started. So, utmost effort has been taken to keep the framework simple.

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
 <div data-h-parent="x" data-h-parenttype="real" >
 ```
Here `x` is the name of the real parent. Make sure each real parent has a unique name.

Now set a number between 0 to 100 which homeostatic will use as percentage and that percent of the screen width will be the width of the real parent when the screen width is less than the width of the real parent. 
```
<div data-h-parent="x" data-h-parenttype="real" data-h-managewidth="60%">
```
You can also give homeostatic a class name which will be included in the class list of the real parent for any other modification you want to bring in the real parent when screen width is less than the width of the real parent.
```
<div data-h-parent="x" data-h-parenttype="real" data-h-managewidth="60%" data-h-managestyle="newStyleClass">
```
It is not mandatory to provide a value as percentage and a class name . If you wish, you can omit any one or both.
If you don't provide a value as percentage homeostatic will not handle the element when screen width is smaller than its width. 
But _**do not**_ keep the value of percentage blank like this:
```
<div data-h-parent="x" data-h-parenttype="real" data-h-managewidth="">
```
If screen width becomes larger than the width of the real parent after the page is loaded (may be due to resizing window or rotating phone) , Homeostatic undoes all the changes it made.
# Adding Children To Real Parent
Any DOM element can be a child of one or more than one real parent. The child element may or may not be DOM child of that real parent.
```
<div data-h-parent="x" data-h-parenttype="real" data-h-managewidth="60%">
  <span data-h-childof="x"></span>
</div>
```
There are 4 types of child. They are:
- Dead : These kind of children vanish when screen width is less than the width of 
  the real parent.
  ```
  <span data-h-childof="x" data-x-childtype="dead">
  ```
- Manage : You will provide a value as percentage and that percent of the width of 
  real parent ( _**not the width of the screen**_ ) will be the width of the child
  when the screen width is less than the width of its real parent.
  ```
  <span data-h-childof="x" data-x-childtype="manage" data-x-managewidth="60%">
  ```
  You can also use `inRatio` and in that case the width of the child will be
  adjusted with its real parent accordingthe ratio of their initial width.
  ```
  <span data-h-childof="x" data-x-childtype="manage" data-x-managewidth="inRatio">
  ```
  If you wish you may not provide the percentage value , but _**don't**_ leave 
  blank.
  You can also provide a class name which will be added to the class list of the 
  child.
  ```
  <span data-h-childof="x" data-x-childtype="manage" data-x- 
  managestyle="newStyleClass">
  ```
- Take Birth : These kind of children appears when the screen width is less than the 
  width of its real parent .
  ```
   <span data-h-childof="x" data-x-childtype="takeBirth">
  ```
  If you want you can provide a percentage value.
  ```
   <span data-h-childof="x" data-x-childtype="takeBirth" data-x-managewidth="60%">
  ```
  But you can not give class name here. You have to design the element initially 
  considering how it should look when the screen width is less than the width of 
  its real parent.
- Get Out : These kind of children vanishes from where it is now and then will 
  reappear as DOM child of any element which is treated as foster parent by 
  Homeostatic. (Details about foster parent will be given later)
  ```
  <span data-h-childof="x" data-x-childtype="getOut,y">
  ```
  `y` is the name of the foster parent.You can also provide a percentage value and 
  that percent of width of the foster parent will be the width of the child when 
  the screen width is less than that of foster parent (not **real parent**) . You 
  can add class name which will be added to its class list in that case. 
  ```
  <span data-h-childof="x" data-x-childtype="getOut,y" data-x-managewidth="60%" 
  data-x-managestyle="newStyleClass">
  ```
An element can be child of more than one real parent, in that case you can handle that like this:
```
 <span data-h-childof="x,z" data-x-childtype="getOut,y" data-x-managewidth="60%" 
  data-z-childtype="manage" data-z-managewidth="70%">
```
An element can also be a child and a real parent at the same time.
# Set Up Foster Parent 
Foster parents are elements which recieve the `getOut` type children when the screen width becomes less than the width of real parent of those children. The children are recieved as DOM children of the foster parent.
```
<div data-h-parent="y" data-h-parenttype="foster">
```
You can also provide a percentage value and that percent of screen width will be its width when the screen width is less than the width of the foster parent. You can also provide a class name.
```
<div data-h-parent="y" data-h-parenttype="foster" data-h-managestyle="newStyleClass" data-h-managewidth="60%">
```

  
  
    
