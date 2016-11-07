var url_csv = "walking_dead_s5.csv";

d3.csv(url_csv, function(error, data){
  convert_data(error, data);
});

var convert_data = function(error, data){
  if (error) {
    console.log(error);
    return;
  }

  if (data) {
    /**
     * The function that is passed to the .map() returns a new JavaScript 
     * object for each item in the array data. This new object consists of only
     * the three specified properties. These objects are all collected by .map()
     *  and stored in the mappedAndConverted variable.
     */
    var convertedData = data.map(function(d){
      /**
       * Note that Episode and USViewers are now numeric values. This is 
       * accomplished by applying the unary + operator, which will convert a
       *  string to its appropriate numeric type.
       */
      return {
        Episode: +d.Episode,
        USViewers: +d.USViewers,
        Title: d.Title
      };      
    });
    console.log(convertedData[0]);
  }
};

