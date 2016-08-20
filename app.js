//Abhinav Thukral
//8/20/2016
//SixthSense photo analysis API response
var Clarifai = require('clarifai');
var http = require("http");
var url = require('url');

var s;

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
  'https://scontent.fdel1-1.fna.fbcdn.net/v/t35.0-12/14044899_1087745107986760_1250302854_o.jpg?oh=2ce31d85c32f147043d0412a1f0b8dba&oe=57B90294'
).then(
   function(response) {
    filter(response); //Select responses from API
    //Get sentence here
  	s = concat(words);
    //displayall(response); //Display all responses from the API
  },
  function(err){
    console.log(err);
  }
);

http.createServer(function(req, res) {
  if (req.method === 'POST' && req.url === '/echo') {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      var sub = body.substring(5,body.length-1);
      Clarifai.getTagsByImageBytes(sub).then(
   				function(response) {
    			filter(response);
  				s = concat(words);
  				console.log(s);
  			},
  			function(err){
    			console.log(err);
  			}
		);
    })
  } else if (req.method === 'GET' && req.url === '/echo') {
    res.end(s);
  } else {
    response.statusCode = 404;
    response.end();
  }

}).listen(3000,"0.0.0.0");