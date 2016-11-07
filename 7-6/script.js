/**
 * # d3.nest() <>

  Creates a new nest operator. The set of keys is initially empty.

  # nest.key(key) <>

  Registers a new key function. The key function will be invoked for each element in the input array and must return a string identifier to assign the element to its group. Most often, the function is a simple accessor, such as the year and variety accessors above. (Keys functions are not passed the input array index.) Each time a key is registered, it is pushed onto the end of the internal array of keys, and the nest operator applies an additional level of nesting.

  # nest.sortKeys(comparator) <>

  Sorts key values for the current key using the specified comparator function, such as d3.ascending or d3.descending. If no comparator is specified for the current key, the order in which keys will be returned is undefined. For example, to sort years in ascending order and varieties in descending order:

  var entries = d3.nest()
      .key(function(d) { return d.year; }).sortKeys(d3.ascending)
      .key(function(d) { return d.variety; }).sortKeys(d3.descending)
      .entries(yields);
  Note that this only affects the result of nest.entries; the order of keys returned by nest.map and nest.object is always undefined, regardless of comparator.

  # nest.map(array) <>

  Applies the nest operator to the specified array, returning a nested map. Each entry in the returned map corresponds to a distinct key value returned by the first key function. The entry value depends on the number of registered key functions: if there is an additional key, the value is another map; otherwise, the value is the array of elements filtered from the input array that have the given key value. If no keys are defined, returns the input array.

  # selection.data([data[, key]]) <>

  Joins the specified array of data with the selected elements, returning a new selection that it represents the update selection: the elements successfully bound to data. Also defines the enter and exit selections on the returned selection, which can be used to add or remove elements to correspond to the new data. The specified data is an array of arbitrary values (e.g., numbers or objects), or a function that returns an array of values for each group. When data is assigned to an element, it is stored in the property __data__, thus making the data “sticky” and available on re-selection.

  The data is specified for each group in the selection. If the selection has multiple groups (such as d3.selectAll followed by selection.selectAll), then data should typically be specified as a function. This function will be evaluated for each group in order, being passed the group’s parent datum (d, which may be undefined), the group index (i), and the selection’s parent nodes (nodes), with this as the group’s parent element. For example, to create an HTML table from a matrix of numbers:

  var matrix = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
  ];

  var tr = d3.select("body")
    .append("table")
    .selectAll("tr")
    .data(matrix)
    .enter().append("tr");

  var td = tr.selectAll("td")
    .data(function(d) { return d; })
    .enter().append("td")
      .text(function(d) { return d; });
  In this example the data function is the identity function: for each table row, it returns the corresponding row from the data matrix.

  If a key function is not specified, then the first datum in data is assigned to the first selected element, the second datum to the second selected element, and so on. A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index. This key function is evaluated for each selected element, in order, being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element. The key function is then also evaluated for each new datum in data, being passed the current datum (d), the current index (i), and the group’s new data, with this as the group’s parent DOM element. The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key, the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.

  For example, given this document:

  <div id="Ford"></div>
  <div id="Jarrah"></div>
  <div id="Kwon"></div>
  <div id="Locke"></div>
  <div id="Reyes"></div>
  <div id="Shephard"></div>
  You could join data by key as follows:

  var data = [
    {name: "Locke", number: 4},
    {name: "Reyes", number: 8},
    {name: "Ford", number: 15},
    {name: "Jarrah", number: 16},
    {name: "Shephard", number: 31},
    {name: "Kwon", number: 34}
  ];

  d3.selectAll("div")
    .data(data, function(d) { return d ? d.name : this.id; })
      .text(function(d) { return d.number; });
  This example key function uses the datum d if present, and otherwise falls back to the element’s id property. Since these elements were not previously bound to data, the datum d is null when the key function is evaluated on selected elements, and non-null when the key function is evaluated on the new data.

  The update and enter selections are returned in data order, while the exit selection preserves the selection order prior to the join. If a key function is specified, the order of elements in the selection may not match their order in the document; use selection.order or selection.sort as needed. For more on how the key function affects the join, see A Bar Chart, Part 2 and Object Constancy.
 */

var url = "lfp_all.csv";

d3.csv(url, function(error, rawData){
  var data = rawData.map(function(d){
    return {
      CountryCode: d.CountryCode,
      CountryName: d.CountryName,
      LifeExp: +d.LifeExp,
      FertRate: +d.FertRate,
      Population: +d.Population,
      Region: d.Region,
      Year: d.Year
    };
  });

  var nested = d3.nest()
    .key(function(d) { return d.Year; })
    .sortKeys(d3.ascending)
    .map(data);

  var minBubbleSize = 5, maxBubbleSize = 50;
  var margin = {
    left: maxBubbleSize, 
    top: maxBubbleSize,
    bottom: maxBubbleSize, 
    right: maxBubbleSize
  };
  var axisPadding = 10;
  var graphWidth = 500, graphHeight = 400;
  var totalWidth = graphWidth + margin.left + margin.right;
  var totalHeight = graphHeight + margin.top + margin.bottom;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight);

  var lifeExpectancy = data.map(function(d) { return d.LifeExp; });
  var fertilityRate = data.map(function(d) { return d.FertRate; });
  var population = data.map(function(d) { return d.Population; });
  var regions = data.map(function(d) { return d.Region; });

  // x scale
  var xScale = d3.scaleLinear()
    .domain([d3.min(lifeExpectancy), d3.max(lifeExpectancy)])
    .range([0, graphWidth]);

  // y scale
  var yScale = d3.scaleLinear()
    .domain([d3.max(fertilityRate), 0])
    .range([0, graphHeight]);

  // pop scale
  var popScale = d3.scaleLinear()
    .domain(d3.extent(population))
    .range([minBubbleSize, maxBubbleSize]);

  var uniqueRegions = d3.set(regions).values();
  var regionColorMap = d3.scaleOrdinal()
    .domain(uniqueRegions)
    .range(d3.schemeCategory10);

  var yAxis = d3.axisLeft().scale(yScale);
  var yAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + (margin.left - axisPadding) + ',' + margin.top + ')')
    .call(yAxis);
  styleAxisNodes(yAxisNodes);

  var xAxis = d3.axisBottom().scale(xScale);
  var xAxisNodes = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + (totalHeight-margin.bottom+axisPadding) + ')')
    .call(xAxis);
  styleAxisNodes(xAxisNodes);

  // year label
  var yearLabel = svg.append('g')
    .append('text')
    .attr('transform', 'translate(40, 450)')
    .attr('font-size', '75');

  // Then a group is created to contain the bubbles. 
  // The rendering function will select this group each time it is called:
  var bubblesHolder = svg.append('g');

  // It starts by declaring the interval for which each year should be drawn 
  // (10 times per second):
  var interval = 100;

  /*
    This function first extracts the rows for the specific year, and then binds
     the data to the circles in the bubblesHolder group. The call to .data()
     also specifies that CountryCode will be used as the key. This is very 
     important, because as we move from year to year, D3.js will use this to 
     map the existing bubbles to the new data, making decisions based on this 
     the key on which to enter-update-exit the circles.
  */
  function render(year) {
    console.log('Year: ' + year);
    var dataForYear = nested.get(year);
    console.log(dataForYear[0]);
    var bubbles = bubblesHolder
      .selectAll('circle')
      .data(dataForYear, function(d){
        return d.CountryCode;
      });

    bubbles.enter()
      .append('circle')
      .each(setItemAttributes);

    bubbles.transition()
      .duration(interval)
      .each(setItemAttributes);

    // Finally, there is a case where occasionally a country disappears from
    // the data, so we will remove any bubbles in the scenario.
    bubbles.exit().remove();

    yearLabel.text(year);
  };

  function setItemAttributes(d){
    d3.select(this)
      .attr('cx', xScale(d.LifeExp))
      .attr('cy', yScale(d.FertRate))
      .attr('r', popScale(d.Population))
      .attr('style', "fill:" + regionColorMap(d.Region) + ";" +
          "fill-opacity:0.5;" +
          "stroke:" + regionColorMap(d.Region) + ";");
  };

  // Get the start and ending year
  var minYear = d3.min(data, function(d){return d.Year;});
  var maxYear = d3.max(data, function(d){return d.Year;});

  var currentYear = minYear;
  render(currentYear);

  /*
    Note that this code returns true every time it is called. This makes it a 
    one-shot timer. But before returning true, if we need to render another 
    year, we start another timer.
  */
  var callback = function() {
    return function(){
      currentYear++;
      
      if(currentYear <= maxYear){
        render(currentYear);
        d3.timer(callback(), interval);
      }
      return true;
    };
  };

  // start the timer for the first time
  d3.timer(callback(), interval);
});

function styleAxisNodes(axisNodes) {
  axisNodes.selectAll('.domain')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
  
  axisNodes.selectAll('.tick line')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
}