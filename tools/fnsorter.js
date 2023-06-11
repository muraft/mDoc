//Footnote sorter + HTMLizer

const fs=require('fs');

let fnCount=0;
let fnOrder=[];
let result=[];
let refList=new Map();

const fnsorter=function (file, htmlizer=false){
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
      v=htmlizer?v.replace(`[^${num}]`,`<sup class='fn'><a href='#fn${newNum}'>${newNum}</a></sup>`):v.replace(`[^${num}]`,`[^${newNum}]`);
    })
    if(v!==false)result.push(v);
  })
  const newFile=file.replace(/\.md$/,'-mdoc.md');
  result=result.join('\n')+'\n'+fnOrder.reduce((a,b,i)=>a+(htmlizer?
  `\n\t<li id='fn${i+1}'>`+(refList.get(b)||'')+'</li>':
  `[^${i+1}]: `+(refList.get(b)||'')
  +'\n'),htmlizer?"<ol class='fn-list'>":'')+(htmlizer?'\n</ol>':'');
  fs.writeFile(newFile,result,(err)=>{
      if(err)throw err;
      console.log('Process completed, file "'+newFile+'" created successfully');
    }
  )
})
} 

module.exports=fnsorter;