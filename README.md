# Data Handling

## Basics

### Load Data

To load the CSV file we can use the `d3.csv()` function. To avoid problems with asynchronous loading we can use `noLoop()` and `redraw()`.

```js
let data;

function setup() {
  createCanvas(400, 400);
  noLoop();

  d3.csv('./data/selbstwirksamkeit.csv', d3.autoType).then(csv => {
    console.log(csv)
    data = csv;
    redraw();
  });
}
```

### Creating functions and passing arguments

Functions are a great way to define code blocks that you need to call multiple times. By passing arguments you can even make them flexible to your needs. Lastly functions keep your code tiny and easy to read.

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

3. **Calling the Function:** To use the function, you call it by writing its name followed by parentheses. Inside the parentheses, you provide the value you want to pass to the function as an argument. In the first call, we pass `"Alice"` as the argument, so `name` takes the value `"Alice"` inside the function, and `"Hello, Alice!"` is printed to the console. In the second call, we pass `"Bob"`, so `"Hello, Bob!"` is printed.

This example demonstrates the basic structure of a function in JavaScript, how to pass an argument to a function, and how that argument can be used within the function to perform an action (in this case, printing a greeting message). Notice that there's no `return` statement in this function because we are not returning any value from it; instead, we're just performing an action.

### Working with return statements

A return is a powerfull tool to manipulate data while keeping your code nice and tidy! Here's a simple example of a JavaScript function that takes a value, performs an operation on it, and then returns a new value. This function will take a number as input, double it, and return the result:

```js
function doubleValue(inputNumber) {
  return inputNumber * 2;
}

const originalValue = 5;
const newValue = doubleValue(originalValue);

console.log(newValue); // Outputs: 10
```

## Data Manipulation

Let's get to it!

###  Convert percentages to numbers

  1. Use map to iterate over each object in your array.
  2. For each object, extract the percentage value from the "Value" key.
  3. Remove the '%' character and convert the remaining string to a number.
  4. Return a new object with the transformed value or just the value itself, depending on your needs.

```js
// call the function and directly assign the new array with: 
// data = percentageToNumbers(csv);

function percentageToNumbers(inputArray){
  const convertedArray = inputArray.map(obj => {
    // Remove the '%' from 'Value' and convert to number
    const valueAsNumber = parseFloat(obj.Value.replace('%', ''));
    // Return a new object with the converted number
    return { ...obj, Value: valueAsNumber };
  });
  return convertedArray;
}
```

### Filter objects based on values

To group all elements from an array based on a key/value pair and save them in a new separate array, you can use the filter function in JavaScript.

1. We use the filter method on the input array. This method takes a callback function that specifies the filtering condition.
2. The callback function checks each object to see if its `groupKey` (e.g. `'Faktor'`) has a value equal to `groupTrigger` (e.g. `'Migrationshintergrund'`).
3. We specify `groupKey` and `groupTrigger` when we call the function.
4. filter returns a new array `groupedArray` that includes only those objects from the input array where the 'Faktor' is equal to 'Migrationshintergrund'.
5. Finally, we return the new filtered array. 

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

### Find the highest value

1. We use the reduce function to iterate through the array. The reduce function takes a callback function as its first argument. This callback function takes two parameters: prev and current. prev is the accumulator that holds the object with the highest value found so far, and current is the current object being processed.
2. Inside the callback, we compare the value property of prev and current. We use an `if` statement to return the object with the higher value.
3. The result of the reduce function is stored in `highestValueObject`, which will be the object from the array with the highest value.
4. Finally we will return `highestValueObject`.

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

### Finding the Lowest Value

Look at the code to find the highest value, what would you need to change? 

### Sort by key/value

To sort an array wen can use the `sort` function. The function will take two arguments: the array of objects to sort, and a string indicating the sort direction ("asc" for ascending or "desc" for descending). It will return a new array sorted accordingly.

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


## Further ressources

- W3 [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- W3 [JavaScript Array Search](https://www.w3schools.com/js/js_array_search.asp)
- W3 [JavaScript Sorting Arrays](https://www.w3schools.com/js/js_array_sort.asp)

## Credits

Code and documentation made with support by ChatGPT4 🐲. Reviewed by human eyes 🥷. 