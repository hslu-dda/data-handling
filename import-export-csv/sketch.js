
let importData;
let exportData;

function setup() {
  createCanvas(400, 400);
  d3.csv('./data/selbstwirksamkeit.csv', d3.autoType).then(csv => {
    console.log(csv);

    // when you are done with your data manipulation, use this function to export your new data
    // the first argument is your data array, the second the filename of the export
    // attention: this is executed on each save / reload!
    downloadCSV(csv, 'users.csv');
  })
}

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