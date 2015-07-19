// helper.js
module.exports = {
  log : function(message){
    console.log(new Date().toISOString() + ' - ' + message);
  },
  parse : function(query){
    var regex = /^(\d+(?:\.\d+)?)([+\-*\/])(\d+(?:\.\d+)?)\=$/;
    var results = query.match(regex);
    if (results){
      results.shift();
    }
    return results;
  }
};
