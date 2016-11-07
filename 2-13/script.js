function render(dataToRender) {
  var selector = d3.select('body')
                   .selectAll('div')
                   .data(dataToRender);
  var entering = selector.enter();
  entering.append('div')
          .text(function(d){
            return d;
          });
  selector.text(function(d){return d;});
}

render([1,3,5]);