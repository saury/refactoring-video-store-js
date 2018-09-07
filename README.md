# Refactoring

This is a code base for doing steps following the article [refactoring video store js](https://www.martinfowler.com/articles/refactoring-video-store-js/).

## Flow chart

![Flow chart](https://www.martinfowler.com/articles/refactoring-video-store-js/video-js_main.png)

## Instructions:

### `origin.js`

This initial video store code is the js version of original example in 1st version Refactoring.

This statement function is an example of the smell [Long Method](http://my.safaribooksonline.com/0-201-485672/ch03lev1sec2).

### `decomposed.js`

Decomposing the origin one into several functions:

* Turn logical chunks of code into their own functions using [Extract Method](https://refactoring.com/catalog/extractMethod.html).

* use [Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html) to turn temporary variables into a function

### `parameter-dispatch`

Specify the output format as an argument to the statement function by using [Add Parameter](https://refactoring.com/catalog/addParameter.html),

### `top-level-fns`

* move nested fns to the top context. **Deal with function that doesn't refer to any others 1st**.

* Declaring some partially-applied local functions

### `classes`

* wrap the data in objects
* apply [Move Method](https://refactoring.com/catalog/moveMethod.html) to function doesn't call any others

### `transform`

* add data middleware to transform the customer data structure so that it has all the data the printing functions need

## Todo list:

- [ ] Add unit test
