//Abhinav Thukral
//8/20/2016
//SixthSense photo analysis API response
var Clarifai = require('clarifai');
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
				'man',
				'woman',
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
  'https://scontent.xx.fbcdn.net/v/t34.0-0/p206x206/14081328_10209729945946523_2020620020_n.jpg?_nc_ad=z-m&oh=9a0d28d6829552d25f05bbde81e1609d&oe=57BA1291'
).then(
   function(response) {
    filter(response); //Select responses from API
    //Get sentence here
    console.log(concat(words));
    //displayall(response); //Display all responses from the API
  },
  function(err){
    console.log(err);
  }
);
