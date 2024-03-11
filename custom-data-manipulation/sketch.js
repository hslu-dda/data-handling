let data;
let migrationData;
let highestValue;
let migSortedAscending;

function setup() {
  createCanvas(400, 400);
  noLoop();

  d3.csv("./data/selbstwirksamkeit.csv", d3.autoType).then((csv) => {
    console.log("Loaded data: ", csv);

    data = percentageToNumbers(csv);
    console.log("Data with numbers: ", data);

    migrationData = groupByValue(data, "Faktor", "Migrationshintergrund");
    console.log("Migration Data", migrationData);

    highestValue = getHighestValue(migrationData);
    console.log("Highest Value", highestValue);

    migSortedAscending = sortArray(migrationData, "asc", "Value")
    console.log("Migration Sorted Ascending:", migSortedAscending);
  });
}

// convert Value: '95%' to Value: 95
function percentageToNumbers(inputArray){
  const convertedArray = inputArray.map(obj => {
    // Remove the '%' from 'Value'
    const justNumber = obj.Value.replace('%', '')
    // convert to data type number
    const valueAsNumber = parseFloat(justNumber);
    // Reassign the new number-value
    obj.Value = valueAsNumber;
    // Return the object to the array
    return obj;
  });
  return convertedArray;
}

// Create an array only with elements that contain groupKey: groupTrigger
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

function getHighestValue(inputArray) {
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
