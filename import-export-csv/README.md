# Data Import & Export

A script that imports a csv file and exports another one. You can use it to export your data after manipulating it according to your needs.

The export is handled by the function `downloadCSV()` which expects the data to export and the filename as arguments.


```js
// call the function with the arguments
downloadCSV(arrayToExport, "export.csv")

// the export function
function downloadCSV(arrayOfObjects, fileName = 'export.csv') {
  // Step 1: Convert Array of Objects to CSV String
  const csvRows = [];
  const headers = Object.keys(arrayOfObjects[0]);
  csvRows.push(headers.join(',')); // Add header row

  for (const obj of arrayOfObjects) {
      const values = headers.map(header => {
          const escaped = ('' + obj[header]).replace(/"/g, '\\"'); // Escape double quotes
          return `"${escaped}"`; // Wrap values in double quotes to handle commas and line breaks
      });
      csvRows.push(values.join(','));
  }
  const csvString = csvRows.join('\n');

  // Step 2: Create a Blob from CSV String
  const blob = new Blob([csvString], { type: 'text/csv' });

  // Step 3: Create a Download Link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName; // Set the file name for download

  // Step 4: Trigger the Download
  document.body.appendChild(link); // Add link to the DOM
  link.click(); // Programmatically click the link to trigger the download

  document.body.removeChild(link); // Remove link from the DOM
  URL.revokeObjectURL(url); // Clean up by revoking the object URL
}
```