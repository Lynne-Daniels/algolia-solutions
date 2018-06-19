const algoliasearch = require('algoliasearch');

const client = algoliasearch('KKSCWMQ6I2', 'TODO use master key');

var index = client.initIndex('contacts');

var contactsJSON = [{
	"objectID": 2,
	"name": "Thirsty Bear",
	"address": "661 Howard St.",
	"area": "San Francisco Bay Area",
	"city": "San Francisco",
	"country": "US",
	"image_url": "https://www.opentable.com/img/restimages/2.jpg",
	"mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=2",
	"payment_options": ["AMEX", "Diners Club", "JCB", "MasterCard", "Visa"],
	"phone": "4159740905",
	"postal_code": "94105",
	"price": 2,
	"reserve_url": "http://www.opentable.com/single.aspx?rid=2",
	"state": "CA",
	"_geoloc": {
		"lat": 37.78565,
		"lng": -122.399734
	}}];

index.addObjects(contactsJSON, function(err, content) {
  if (err) {
    console.error(err);
  }
});n