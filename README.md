# MarkDoc (On progress)
MarkDoc is a tool to help you write a document with markdown better

## Installation

1. Install nodejs
2. Clone this repository
```
$ git init
$ git clone https://github.com/muraft/markdoc
```
3. Install the package globally
```
$ npm i -g
```
4. The tool is ready to use!

## Current features
### 1. Automatic footnote sorter
```
mdoc fnsorter fileName.md
```
Before:
```
Lorem ipsum[^1], dolor sit amet[^6], consectetur adipiscing elit.[^3]
Pellentesque aliquam sollicitudin nibh[^2],

ac fringilla nibh elementum a. Ipsum2[^1]
Aliquam eu accumsan ex.[^5]

[^1]: ipsum.com
[^2]: nibh.com 
[^3]: elit.com
[^5]: ex.com 
[^6]: amet.com 
```
After:
```
Lorem ipsum[^1], dolor sit amet[^2], consectetur adipiscing elit.[^3]
Pellentesque aliquam sollicitudin nibh[^4],

ac fringilla nibh elementum a. Ipsum2[^5]
Aliquam eu accumsan ex.[^6]

[^1]:  ipsum.com
[^2]:  amet.com 
[^3]:  elit.com
[^4]:  nibh.com 
[^5]:  ipsum.com
[^6]:  ex.com  
```
### 2. HTMLizer (Unfinished) 
Convert markdown to HTML format, can only convert the footnote format for now. 
```
$ mdoc htmlizer
```
Before:
```
Footnote example[^1]

[1]: Example.com
```
After:
```
Footnote example<sup class='fn'><a href='#fn1'>1</a></sup>

<ol class='fn-list'>
	<li id='fn1'> Example.com</li>
</ol>
```
Reminder: This tool will also sort the footnote automatically 