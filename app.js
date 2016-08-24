//Abhinav Thukral
//8/20/2016
//SixthSense photo analysis API response
var Clarifai = require('clarifai');
var http = require("http");
var url = require('url');
var hi = "";
var s,a;

var keywords = ['laptop',
				'computer',
				'people',
				//'no person',
				'table',
				'coffee',
				'paper',
				'tea',
				'cup',
				'desk',
				'book',
				//'man',
				//'woman',
				'wall',
				'chair',
				'window',
				'lamp',
				'curtain',
				'seat',
				'bed',
				'cushion',
				'seat',
				'pillow',
				'sofa',
				'telephone',
				'lake',
				'tree',
				'dog',
				'cat',
				'building',
				'street',
				'vehicle',
				'car',
				'wheel',
				'squirrel',
				'bird',
				'child',
				'girl',
				'boy',
				'flower',
				'adult',
				'pen',
				'phone',
				'mobile',
				'crayon',
				'pencil',
				'sharp'
			   ];

var words = [];
var sentence = "Objects around you are : ";
var klen = keywords.length;

//Filter response by keywords
function filter(response){
	words = [];
	var len = response.results[0]["result"]["tag"]["classes"].length;
    for(i=0;i<len;i++)
    {
    	word = response.results[0]["result"]["tag"]["classes"][i];
    	for(j=0;j<klen;j++)
    	{
    		if(word == keywords[j])
    		{
    			if(word=='sharp')
    				words.push('a sharp object please be careful');
    			else
    				words.push(response.results[0]["result"]["tag"]["classes"][i]);	
    			
    			break;
    		}
    	}
    }
}

//Create a sentence from words array
function concat(words){
	sentence = "Objects around you are : ";
	for(i=0;i<words.length-1;i++)
	{
		sentence = sentence + words[i] + ", ";
	}

	sentence = sentence + words[words.length-1] + ".";
	return sentence;
}

//Display all function
function displayall(response){
	console.log(response.results[0]["result"]["tag"]["classes"]);
}

Clarifai.initialize({
  'clientId': 'fw6QnKRV-VB2FxNf70DXd9rGdVoslKTFpjzTrDYU',
  'clientSecret': 'creWnamzmCcHta6VtJD3nAojUapH5R60dnFVBhbj'
});

Clarifai.getTagsByUrl(
	//Image URL
  'http://abhinavthukral.in/c.jpg'
).then(
   function(response) {
    filter(response); //Select responses from API
    //Get sentence here
  	s = concat(words);
  	console.log(s);
    displayall(response); //Display all responses from the API
  },
  function(err){
    console.log(err);
  }
);

http.createServer(function(req, res) {
	if (req.method === 'POST' && req.url === '/hi') {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      hi = body;
      if(hi=="key=True")
      	a=1;
      else if(hi=="key=False")
      	a=0;
      else
      	a=-1;
      console.log(hi);
     })
  }

  if (req.method === 'GET' && req.url === '/hi') {
    res.end(hi);
    console.log("Sent "+hi);
  }

  if (req.method === 'POST' && req.url === '/echo') {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      var sub = body.substring(6,body.length);
    //console.log(sub);

     })
  } else if (req.method === 'GET' && req.url === '/echo') {

  	Clarifai.getTagsByUrl(
	//Image URL
  'http://cdn.grid.fotosearch.com/CSP/CSP992/k13525739.jpg'
).then(
   function(response) {
    filter(response); //Select responses from API
    //Get sentence here
  	s = concat(words);
  	console.log(s);
    //displayall(response); //Display all responses from the API
  },
  function(err){
    console.log(err);
  }
);

    res.end(s);
  } else {
    res.statusCode = 404;
    res.end();
  }

}).listen(3000,"0.0.0.0");