// Mathmatical methods and variables
module.exports = {
  operators : ['+','-','/','*'],
  randomNumber: function(min,max,integer) {
    if (integer) {
      return Math.floor(Math.random() * (max - min) + min);
    } else{
      return Math.random() * (max - min) + min;
    }
  },
  calculate : function(first,operator,second){
    var answer = '';
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
      case '+':
        answer = first + second;
        break;
      case '-':
        answer = first - second;
        break;
      case '*':
        answer = first * second;
        break;
      case '/':
        if (second === 0) {
          throw new Error("Division by zero not allowed.");
        } else{
          answer = first / second;
        }
        break;
      default:
        throw new Error("Invalid operator.");
    }

    return answer;
  }
};
