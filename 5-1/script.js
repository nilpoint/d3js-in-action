var url = "walking_dead_s5.json";

d3.json(url, function(error, data){
  display_data(error, data);
});

var url_tsv = "walking_dead_s5.tsv";
d3.tsv(url_tsv, function(error, data){
  display_data(error, data);
});

var url_csv = "walking_dead_s5.csv";
d3.csv(url_csv, function(error, data){
  display_data(error, data);
});

var display_data = function(error, data){
  if (error) {
    console.log(error);
    return;
  }

  if (data) {
    console.log(data[0]);
  }
};

