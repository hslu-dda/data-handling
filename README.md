# Data Handling

Hello fellow data enthusiast 🌈. This is a repository with some helpful Javascript code to handle data. For the documentation keep reading, for the code take a look at [custom-data-manipulation](./custom-data-manipulation/), at [d3-helpers](./d3-helpers/) and at [import-export-csv](./import-export-csv/).

**Table of Content**

Basics: 

- [Creating CSVs](creating-csvs)
- [Loading Data](#loading-data)
- [Working with Objects](#working-with-objects)
- [Data Iteration and Loops](#data-iteration-and-loops)

Functions:

- [Creating functions and passing arguments](#creating-functions-and-passing-arguments)
- [Using Return](#using-return)
- [Arrow Syntax](#arrow-syntax)

Custom Data Manipulation: 

- [Convert percentages to numbers](#convert-percentages-to-numbers)
- [Filter objects based on values](#filter-objects-based-on-values)
- [Find the highest value](#find-the-highest-value)
- [Find the lowest Value](#find-the-lowest-Value)
- [Sort by key and value](#sort-by-key-and-value)

D3 Helper Functions

- [sort, min, max, & group functions](#d3-helper-functions)

## Basics

### Creating CSVs

When you export a CSV file from Excel you may have noticed that it uses a semicolon (`;`) instead of a comma (`,`) as a delimiter. This is because we are based in Europe and Excel assumes that you have commas within numbers. Therefore it chooses the semicolon to avoid problems. To export CSVs with commas by default you can set the language of Excel to English on Mac. For this go to _Systemeinstellungen > Sprache & Region > Apps_. Then select Excel and set English as default language. You may need to restart Excel. 

### Loading Data

To load the CSV file we can use the `d3.csv()` function. For this to work you need to include the [D3 Library](https://d3js.org/getting-started#d3-in-vanilla-html). To avoid problems with asynchronous loading we can use `noLoop()` and `redraw()`.

```js
let data;

function setup() {
  createCanvas(400, 400);
  noLoop(); // stop the draw

  d3.csv('./data/selbstwirksamkeit.csv', d3.autoType).then(csv => {
    console.log(csv)
    data = csv;
    redraw(); // when data is loaded, redraw
  });
}
```

### Working with Objects

Objects always have a key/value pair. You need the key to access the value. For example: The key `Faktor` allows you to access the value `Migrationshintergrund`.

```js
let arrayOfObjects = [
  {'Faktor': 'Migrationshintergrund', 'Value': '33.2%'}, 
  {'Faktor': 'Migrationshintergrund', 'Value': '32.9%'}, 
  {'Faktor': 'Migrationshintergrund', 'Value': '31.7%'}, 
]

// access the first object
let firstObj = arrayOfObjects[0];

// access "Faktor" from the first object, outputs "Migrationshintergrund"
firstObj["Faktor"]

// access "Value" from the first object, outputs 33.2%
firstObj["Value"]

// now the ouptut is 33.2 as a number, not a string
firstObj["Value"] = 33.2

// now the output is something totally different
firstObj["Value"] = 'banana'
```

Sometimes you see `firstObj.Faktor` instead of `firstObj["Faktor"]`. Technically this leads to the same result. Using `firstObj["Faktor"]` has proven to be more versatile.

### Data Iteration and Loops

Usually we have data in array format. To access each item in the array we need to loop over it. There a different ways to iterate over an array. Following are two common ones: 

```js
for (let i = 0; i < arrayOfObjects.length; i++) {
  // log each object
  console.log(arrayOfObjects[i]);
  // log the Faktor of each object
  console.log(arrayOfObjects[i]["Faktor"])
}
```

An alternate way is using `forEach`. This only works for arrays.

```js
arrayOfObjects.forEach((obj) => {
    // log each object
  console.log(obj);
  // log the Faktor of each object
  console.log(obj["Faktor"])
})
```

Both ways lead to the same result and it is your personal preference which way you use. It is important to know `forEach` because you will likely come across it in tutorials on the web.

## Functions

Functions are a great way to define code blocks that you need to call multiple times. By passing arguments you can make them flexible to your needs. Functions keep your code tidy and easy to read.

### Creating Functions and passing Arguments

```js
// Defining the function
function greetPerson(name) {
  console.log("Hello, " + name + "!");
}

// Calling the function and passing an argument
greetPerson("Alice");

// Calling the function again with a different argument
greetPerson("Bob");
```

1. **Defining the Function:** The `greetPerson` function is defined using the `function` keyword followed by the function name `greetPerson`. Inside the parentheses, `name` is listed as the parameter of the function. This means that `greetPerson` expects to receive one argument when it is called.
   
2. **The Function Body:** Inside the curly braces `{}` is the body of the function, where we write what the function should do. In this case, it uses `console.log` to print a greeting message to the console. The `+` operator is used to concatenate (join together) the strings "Hello, ", the value of `name`, and "!", forming a personalized greeting.

3. **Calling the Function:** To use the function, you call it by writing its name followed by parentheses. Inside the parentheses, you provide the value you want to pass to the function as an argument. In the first call, we pass `"Alice"` as the argument, so `name` takes the value `"Alice"` inside the function, and `"Hello, Alice!"` is printed to the console. In the second call, we pass `"Bob"`, so `"Hello, Bob!"` is printed. The order of the function definition and calling the function doesn't play a role. Once defined, functions can be accessed from anywhere in the code.

### Using Return

Often, after the function has been executed, you want to "get" the result (e.g. a manipulated data array) to continue working. For this purpose, functions can not only receive arguments, they can also "return" (send back). Here's an example of a JavaScript function that takes a value, performs an operation on it, and then returns a new value. To access the returned result you create a new variabel (e.g. `let newValue`) and the function assigns the result to this variable.

```js
function doubleValue(inputNumber) {
  return inputNumber * 2;
}

let originalValue = 5;
let newValue = doubleValue(originalValue); // the function returns the result and saves it into "newValue"

console.log(newValue); // Outputs 10, the result of the function
```

### Arrow Syntax

Sometimes you see functions written with the _arrow syntax_ that got introduced into Javascript in 2015. It aimes at making the code more concise but can lead to confusion if you never saw it. Basically it does the same as a regular function, it is just written differently. 

```js
// old but still valid way to write a function
function doubleValue(inputNumber) {§1
  return inputNumber * 2;
}

// the same function written with the arrow syntax
const doubleValue = (inputNumber) => {
  return inputNumber * 2;
}

// the same function written on just one line
const doubleValue = (inputNumber) => inputNumber * 2;
```

## Custom Data Manipulation

Libraries like D3 provide many helpful functions to manipulate your data. But sometimes you need more control and create your own custom function. Here are a few examples.

###  Convert percentages to numbers

This is a relatively unusual task, but the Obsan data entails percentages that are strings not numbers (e.g. `'95%'`). 

```js
// call the function and directly assign the new array with: 
// data = percentageToNumbers(csv);

function percentageToNumbers(inputArray){
  const convertedArray = inputArray.map(obj => {
    // Remove the '%' from 'Value'
    const justNumber = obj[Value]replace('%', '')
    // convert to data type number
    const valueAsNumber = parseFloat(justNumber);
    // Reassign the new number-value
    obj[Value] = valueAsNumber;
    // Return the object to the array
    return obj;
  });
  return convertedArray;
}
```

1. Use map to iterate over each object in your array.
2. For each object, extract the percentage value from the "Value" key.
3. Remove the '%' character and convert the remaining string to a number.
4. Return a new object with the transformed value or just the value itself, depending on your needs.

The same function can also be written using a `for loop`:

```js
function percentageToNumbers(inputArray) {
  for (let i = 0; i < inputArray.length; i++) {
    let withoutSign = inputArray[i]["Value"].replace("%", "");
    let asNumber = parseFloat(withoutSign);
    inputArray[i]["Value"] = asNumber;
  }
  return inputArray;
}
```

### Filter objects based on values

To filter all elements from an array based on a key/value pair and save them in a new separate array, you can use the filter function in JavaScript.

```js
// call the function and directly assign the new array with: 
// migrationData = groupByValue(data, "Faktor", "Migrationshintergrund");

function groupByValue(inputArray, groupKey, groupTrigger) {
  const groupedArray = inputArray.filter((obj) => {
    // test if the obj has a value of 'groupTrigger' in 'groupKey'
    if (obj[groupKey] === groupTrigger) {
      return true; // Keep this object in the new array
    } else {
      return false; // Do not include this object in the new array
    }
  });
  return groupedArray;
}
```

1. We use the filter method on the input array. This method takes a callback function that specifies the filtering condition.
2. The callback function checks each object to see if its `groupKey` (e.g. `'Faktor'`) has a value equal to `groupTrigger` (e.g. `'Migrationshintergrund'`).
3. We specify `groupKey` and `groupTrigger` when we call the function.
4. filter returns a new array `groupedArray` that includes only those objects from the input array where the 'Faktor' is equal to 'Migrationshintergrund'.
5. Finally, we return the new filtered array. 

You can also use `for loop` and `if` to achieve the same result:

```js
function filterObjects(inputArray, groupKey, groupTrigger) {
  let newArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][groupKey] == groupTrigger) {
      // safe into newArray
      newArray.push(inputArray[i])
    }
  }
  // send all found objects back
  return newArray;
}
```

### Find the highest value

```js
// call the function and directly assign the highest value with: 
// highestValue = getHighestValue(data);

function getHighestValue(inputArray){
  const highestValueObject = inputArray.reduce((prev, current) => {
    // Test each element against each other
    if (prev.Value > current.Value) {
      return prev;
    } else {
      return current;
    }
  });
  // return the highest value object that you found
  return highestValueObject;
}
```

1. We use the reduce function to iterate through the array. The reduce function takes a callback function as its first argument. This callback function takes two parameters: prev and current. prev is the accumulator that _holds the object with the highest value found so far_, and current is the current object being processed.
2. Inside the callback, we compare the value property of prev and current. We use an `if` statement to return the object with the higher value.
3. The result of the reduce function is stored in `highestValueObject`, which will be the object from the array with the highest value.
4. Finally we will return `highestValueObject`.

### Find the lowest Value

Look at the code to find the highest value, what would you need to change? 

### Sort by key and value

To sort an array we can use the `sort` function. The function will take two arguments: the array of objects to sort, and a string indicating the sort direction ("asc" for ascending or "desc" for descending). It will return a new array sorted accordingly.

```js
// call the function and directly assign the new array with: 
// migSortedAscending = sortArray(migrationData, "asc", "Value")

function sortArray(inputArray, sortOrder, sortByKey) {
  // Create a copy of the array to avoid modifying the original array
  const sortedArray = [...inputArray];

  // Use the sort method with a comparison function
  sortedArray.sort((a, b) => {
    if (sortOrder === "asc") {
      // For ascending order, compare the value keys directly
      if (a[sortByKey] < b[sortByKey]) {
        return -1;
      }
      if (a[sortByKey] > b[sortByKey]) {
        return 1;
      }
      return 0; // a and b are equal
    } else if (sortOrder === "desc") {
      // For descending order, reverse the comparison
      if (a[sortByKey] > b[sortByKey]) {
        return -1;
      }
      if (a[sortByKey] < b[sortByKey]) {
        return 1;
      }
      return 0; // a and b are equal
    }
  });

  // Return the sorted array
  return sortedArray;
}
```

1. We first make a copy of the input array using the spread operator `[...inputArray]` to ensure we don't modify the original array.
2. We then use the `sort` method of the array, which modifies the array in place. The `sort` method takes a comparison function that defines the sort order. Based on the `sortOrder` argument ("asc" or "desc"), we adjust the comparison logic within this function.
3. In the comparison function, we use `if` statements to compare the `value` keys of the objects according to the specified sort order.
4. Finally, we return the sorted copy of the array.

## D3 Helper Functions

Many of the above "hand-made" data manipulation can be achieved with built in D3 functions, here are some examples: 

```js
// sortes the array based on the values in "Value"
let sortedData = d3.sort(data, (d) => d["Value"])

// get the minimum of "Value"
let minimum = d3.min(data, (d) =>  d["Value"]);

// get the maximum of "Value"
let maximum = d3.max(data, (d) => d["Value"]);

// groups the array based on values in "Faktor"
// this returns a map object
let groupedData = d3.group(data, (d) => d["Faktor"]);

// to access the data in a map object you need to use "get"
let groupedMigration = groupedData.get("Migrationshintergrund")
```

## Questions & Problems

**When we apply the `.map()` function on an array it also changes the original array. For example in the function `percentageToNumbers` we used above.**

Some array functions automatically create a "deep copy" of an array with no reference to earlier instances, for example `.filter()`. Others, like `.map()` have an effect on the original instance, even if we assign it to a new variable. We can avoid this with the following code: 

```js
const deepCopiedArray = JSON.parse(JSON.stringify(inputArray));
```

1. Starting with the Original: You have an array or object, referred to as inputArray in this case. You want to make a new version of it that looks exactly the same but is completely independent. This means changes to the new version won't affect the original, and vice versa.
2. JSON.stringify(inputArray): This part of the code takes your original array or object (inputArray) and converts it into a string format. JSON stands for JavaScript Object Notation, which is a way of representing data as a string. This string describes all the details of your array or object, like a blueprint, but it's not something you can directly modify or work with as if it were the original array or object.
3. JSON.parse(...): Now, you have a string that represents your original array or object. The next step is to turn this string back into a JavaScript array or object. That's what JSON.parse() does. It takes the string created by JSON.stringify() and reconstructs a new array or object from it.
4. Deep Copy Created: The result of JSON.parse(JSON.stringify(inputArray)) is a new array or object that is a deep copy of the original. "Deep copy" means that all levels of the array or object have been copied, including nested arrays and objects. It's not just the top level that's been duplicated; everything inside, no matter how many layers deep, has been copied as well.
5. Why This Matters: When you modify the new array or object (deepCopiedArray), these changes will not affect the original inputArray at all, because the deep copy is completely independent. This is particularly useful when you need to work with or manipulate data but also need to preserve the original state of the data for other purposes.

## Further ressources

- W3 [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- W3 [JavaScript Array Search](https://www.w3schools.com/js/js_array_search.asp)
- W3 [JavaScript Sorting Arrays](https://www.w3schools.com/js/js_array_sort.asp)

## Credits

Code and documentation made with support by ChatGPT4 🐲. Reviewed by human eyes 🥷. 