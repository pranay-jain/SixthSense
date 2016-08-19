var Clarifai = require('clarifai');

var keywords = ['laptop',
				'computer',
				'people',
				'no person',
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
				'adult'
			   ];

var identified = [];

var klen = keywords.length;

function search(response){
	var len = response.results[0]["result"]["tag"]["classes"].length;
    for(i=0;i<len;i++)
    {
    	for(j=0;j<klen;j++)
    	{
    		if(response.results[0]["result"]["tag"]["classes"][i] == keywords[j])
    		{
    			identified.push(response.results[0]["result"]["tag"]["classes"][i]);
    			break;
    		}
    	}
    }

    console.log(identified);
}

Clarifai.initialize({
  'clientId': 'fw6QnKRV-VB2FxNf70DXd9rGdVoslKTFpjzTrDYU',
  'clientSecret': 'creWnamzmCcHta6VtJD3nAojUapH5R60dnFVBhbj'
});

Clarifai.getTagsByUrl(
  'https://scontent.fdel1-1.fna.fbcdn.net/v/t35.0-12/14074409_10209730035548763_1779764836_o.jpg?oh=719ccdd2c9adeccbb881a72fb0033905&oe=57B90C68'
).then(
   function(response) {
    search(response);
  },
  function(err){
    console.log(err);
  }
);
