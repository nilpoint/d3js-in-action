/*
To check this, let's examine the result using the developer tools. If you right-click on A in the browser, and select inspect item, the tools will open. Next, open the properties panel.
*/
var selector = d3.select('body')
  .selectAll('div')
  .data([10, 20, 30, 40, 50]);