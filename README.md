# About The framework
Homeostatic is a javascript framework that helps you to build you a website that can adapt to different screens, technically a responsive website. It is especially useful to the new web developers who don't want to dive deep into complex frameworks for building a responsive website and just want to get started. So, utmost effort has been taken to keep the framework simple.

# Integrate Homeostatic To Your Project
There are two ways to integrate Homeostatic in your project. They are:
 1. Using NPM (Node Package Manager): Install the package from terminal:
    ```
    npm install homeostatic
    ```
    A file named Homeostatic.js will be downloaded. Link this to your HTML file:
    ```
    <head>
      <script src="./homeostatic.js" defer>
    </head>
    ``` 
 2. Using CDN (Content Delivery Network): This is easier for new web developers. Add this to your HTML file (Use a version number in the place of `version` after `homeostatic@` part in the source url of script):
    ```
    <head>
      <script src="https://cdn.jsdelivr.net/npm/homeostatic@version/homeostatic.js" defer>
    </head>
    ```
  You can use any version number available after `homeostatic@` part in the url. The available latest version is 1.0.2
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
If screen width becomes larger than the width of the real parent after the page is loaded (may be due to resizing window or rotating phone) , Homeostatic undoes all the changes it made.

![Real Parent GIF](https://github.com/SaaminRahman/Homeostatic/assets/163336763/2ee8ec6f-b326-4f25-944f-0a1191ba235c)

# Adding Children To Real Parent
Any DOM element can be a child of one or more than one real parent. The child element may or may not be DOM child of that real parent.

```
<div data-h-parent="x" data-h-parenttype="real" data-h-managewidth="60%">
  <span data-h-childof="x"></span>
</div>
```
There are 4 types of child. They are:
- **Dead** : These kind of children vanish when screen width is less than the width of 
  the real parent.
  
  ```
  <span data-h-childof="x" data-x-childtype="dead">
  ```
- **Manage** : You will provide a value as percentage and that percent of the width of 
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
  <span data-h-childof="x" data-x-childtype="manage" data-z-managestyle="newStyleClass">
  ```
- **Take Birth** : These kind of children appears when the screen width is less than the 
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
- **Get Out** : These kind of children vanishes from where it is now and then will 
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
![Untitled video - Made with Clipchamp (1)](https://github.com/SaaminRahman/Homeostatic/assets/163336763/325e891f-8705-4a76-a920-08e59e91a5c6)

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
`y` is the name of the step parent. Make sure every foster parent has a unique name.
You can also provide a percentage value and that percent of screen width will be its width when the screen width is less than the width of the foster parent. You can also provide a class name.

```
<div data-h-parent="y" data-h-parenttype="foster" data-h-managestyle="newStyleClass" data-h-managewidth="60%">
```
# Accessing width using CSS variables
Homeostatic creates CSS variables for all the parents (real and foster) and their children which stores their width. To get the width of a real or foster parent use the variable `--<real parent name>-width` in CSS. To get the width of a child of a real parent, use `--<real parent name>-<child number>-width`.Child number can easily derived from the sequence they are arranged in your HTML file i.e the child that appears in top most position relative to other children in your HTML file has child number 1 . Alterantively, you can get that number from homeostatic object. When a child of type `getOut` goes under custody of a foster parent, its width can also be accessed using `--<**real** parent name>-<child number>-widthWhenGotOut`

# Things To Be Noted
1. You should not keep any percentage value blank like this:
   
   ```
   <span data-h-childof="x,z" data-x-childtype="getOut,y" data-x-managewidth="" 
   data-z-childtype="manage" data-z-managewidth=" ">
   ```
   If do not want to manage width , then just don't mention anything.
2. When you want to modify any parent or child by providing a class name to Homeostatic , unless your CSS declaration for that class has higher specificity than the existing CSS 
   declaration the modifications will not come into existance. For example consider the following scenario:
   
   **HTML**:
   
   ```
   <span data-h-childof="x" data-x-childtype="manage" data-z-managestyle="newStyleClass" style="border:2px solid red;">
   ```
   **CSS**:
   ```
   .newStyleClass{
   border : 2px solid green;
   }
   ```
   Here you will not find your desired change because the inline style declaration has a higher specificity than the declarations in a class. You can solve the issue in this way:

   ```
   .newStyleClass{
   border : 2px solid green !important;
   }
   ```
   You can learn more about specificity from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) or [web.dev](https://web.dev/learn/css/specificity).
4. Do not try to change width of any parent or child through the class whose name you provide for other modifications. As the class is added by Homeostatic after managing width , 
   Homeostatic will not be able to take care of that.
5. If you find anything wrong please check the console and it may solve your problem . Homeostatic logs the mistakes you make while using the framework in details.
   ![Screenshot 2024-03-28 094058](https://github.com/SaaminRahman/Homeostatic/assets/163336763/c9e6d7e2-03dc-408d-82df-e8df481bce69)

# Reporting Issues
If you find any bug or have a feature request, please use [Github issue](https://github.com/SaaminRahman/Homeostatic/issues) to inform.

  
    
