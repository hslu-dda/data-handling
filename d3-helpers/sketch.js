function setup() {
  createCanvas(400, 400);
  d3.csv('./data/selbstwirksamkeit.csv', d3.autoType).then(data => {

    let sortedData = d3.sort(data, (d) => d["Value"])
    console.log("Sorted: ", sortedData)

    let minimum = d3.min(data, (d) =>  d["Value"]);
    console.log("Minimum", minimum)

    let maximum = d3.max(data, (d) => d["Value"]);
    console.log("Maximum Value", maximum)

    let groupedData = d3.group(data, (d) => d["Faktor"]);
    console.log("Grouped: ", groupedData);

    let groupedMigration = groupedData.get("Migrationshintergrund")
    console.log("Migration Group Content:", groupedMigration)

  })
}
