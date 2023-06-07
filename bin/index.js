#! /usr/bin/env node
const fs=require('fs');
const args=process.argv.slice(2);
const command=args[0];
const file=args[1];
if(!file)return console.log('File is required!')

const commandPath='tools/'+command+'.js';
if(fs.existsSync(commandPath)){
  const commandFunction=require('../' +commandPath);
  commandFunction(file);
}else{
  console.error('Command not found!')
}

