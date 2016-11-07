var url_json = "walking_dead_s5.json";

d3.json(url_json, function(error, data){
  convert_data(error, data);
});

var convert_data = function(error, data){
  if (error) {
    console.log(error);
    return;
  }

  if (data) {
    var convertedData = data.map(function(d){
      return d.USViewers;
    });
    console.log(convertedData);
    scale_data(convertedData);
  }
};

var scale_data = function(data){
  var minViewership = d3.min(data);
  var maxViewership = d3.max(data);

  var minBarHeight = 100, maxBarHeight = 400;

  var yScale = d3.scaleLinear()
    .domain([minViewership, maxViewership])
    .range([minBarHeight, maxBarHeight]);

  console.log(minViewership + ' -> ' + yScale(minViewership));
  console.log(maxViewership + ' -> ' + yScale(maxViewership));
};
