var num = Number("25.00"); // The Number() only visualizes the type and is not needed
var roundedString = num.toFixed(2);
var rounded = Number(roundedString);

var num2 = 25.02;

var result = rounded + num2;

console.log(result.toFixed(2));
