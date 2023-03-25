#! /usr/bin/env node
const fs=require('fs');
const args=process.argv.slice(2);
const file=args[0];
if(!file)return console.log('File is required!')

let fnCount=0;
let fnOrder=[];
let result=[];
let refList=new Map();

if(!file.endsWith('.md'))return console.log('Only md file is supported');
fs.readFile(file,'utf8',(err,data)=>{
  if(err)return console.log('File not found!');
  const line=data.split('\n');
  
  line.forEach(v=>{
    fnFound=v.match(/\[\^\d+\]:?/g)||[];
    fnFound.forEach(fn=>{
      const num=Number(fn.match(/\[\^(\d+)\]/)[1]);
      
      if(fn.endsWith(':')){
        refList.set(num,v.match(/\:(.*)/)[1]);
        v=false;
        return;
      }
      let newNum=num;
      if(num!=fnCount+1)newNum=fnCount+1;
      fnOrder.push(num);
      fnCount=newNum;
      v=v.replace(`[^${num}]`,`[^${newNum}]`);
    })
    if(v!==false)result.push(v);
  })
  const newFile=file.replace(/\.md$/,'-markdoc.md');
  result=result.join('\n')+fnOrder.reduce((a,b,i)=>a+`\n[^${i+1}]: `+(refList.get(b)||''),'');
  fs.writeFile(newFile,result,(err)=>{
      if(err)throw err;
      console.log('Process completed, file "'+newFile+'" created successfully');
    }
  )
})

