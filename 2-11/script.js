var selector = d3.select('body')
                 .selectAll('div')
                 .data([10, 20, 30]);

var entering = selector.enter();

entering.append('div')
        .text(function(d){
          return d;
        });