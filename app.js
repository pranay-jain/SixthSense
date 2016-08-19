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

function search(response){
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

function concat(words){
	for(i=0;i<words.length-1;i++)
	{
		sentence = sentence + words[i] + ", ";
	}

	sentence = sentence + words[words.length-1] + ".";
	return sentence;
}

function displayall(response){
	console.log(response.results[0]["result"]["tag"]["classes"]);
}

Clarifai.initialize({
  'clientId': 'fw6QnKRV-VB2FxNf70DXd9rGdVoslKTFpjzTrDYU',
  'clientSecret': 'creWnamzmCcHta6VtJD3nAojUapH5R60dnFVBhbj'
});

Clarifai.getTagsByUrl(
  'http://www.creativeboom.com/uploads/articles/23/23148daab9620ec0fcbfb96893653a1335525fcc_860.jpg'
).then(
   function(response) {
    search(response);
    console.log(concat(words));
    //displayall(response);
  },
  function(err){
    console.log(err);
  }
);
