const fnsorter=require('../tools/fnsorter.js');

const htmlizer=function(file){
  //HTMLizer is integrated with fnsorter function
  fnsorter(file, true);
}

module.exports=htmlizer;