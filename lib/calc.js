// Mathmatical methods and variables
module.exports = {
  operators : ['+','-','/','*'],
  randomNumber: function(min,max,integer) {
    if (integer) {
      return Math.floor((Math.random() * max) + min);
    } else{
      return (Math.random() * (max - min) + min);
    }
  }
};
