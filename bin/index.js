#! /usr/bin/env node
const fs=require('fs');
const args=process.argv.slice(2);
const file=args[0];
if(!file)return console.log('File is required!')

let fnCount=0;
let fnOrder=[];
let result=[];
let refList=[];

if(!file.endsWith('.md'))return console.log('Only md file is supported');
fs.readFile(file,'utf8',(err,data)=>{
  if(err)return console.log('File not found!');
  const line=data.split('\n');
  
  line.forEach(v=>{
    fnFound=v.match(/\[\^\d+\]:?/g)||[];
    fnFound.forEach(fn=>{
      const num=Number(fn.match(/\[\^(\d+)\]/)[1]);
      
      if(fn.endsWith(':')){
        refList.push(num);
        return;
      }
      let newNum=num;
      if(num!=fnCount+1)newNum=fnCount+1;
      fnOrder.push(num);
      fnCount=newNum;
      v=v.replace(`[^${num}]`,`[^${newNum}]`);
    })
    result.push(v);
  })
  console.log(result.join('\n'))
})

