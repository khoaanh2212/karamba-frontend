var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require("cors");
var faker = require('faker');

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.json());

app.post('/api/admin/login', function (req, res) {
  if (req.headers.authorization === 'Basic YWRtaW46MTIzNA==') {
    res.status(200).json({"username": "admin", "token": "06f90d42-3e05-42a5-acec-66d2585e0600"});
  } else {
    res.status(400).json({"message": "Bad authentication"});
  }
});

app.get('/api/public/dealer/application/accepted/:token', function (req, res) {
  if (req.params.token !== 'false-token') {
    res.status(200).json({
      "status": 0,
      "data": {
        "id": "8eae06b7-b086-4288-85a7-7689a2908fdc",
        "vendorName": "JUJU",
        "name": "JAJA",
        "phone": "ads",
        "email": "snosfer@gmail.com",
        "howArrivedHere": "google"
      }
    });
  } else {
    res.status(404).json({"status": 404, "data": "ERROR"});
  }
});

app.post('/api/public/dealer', function (req, res) {
  if (req.body.address !== 'false-address') {
    res.status(200).json({"status": 0, "data": "OK"});
  } else {
    res.status(500).json({"status": 0, "data": "ERROR"});
  }
});

app.post('/api/dealer/cars', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json({"status": 0, "data": "OK"});
  }
});

app.delete('/api/dealer/application/:id', function (req, res) {
  if (req.params.id !== 'false-id') {
    res.status(200).json({"status": 0, "data": null});
  } else {
    res.status(400).json({"message": "Bad request"});
  }
});

app.get('/api/dealer/messages/thread/:threadId', function(req, res) {
  res.status(200).json({"status":0,"data":{"chatWith":"gordo","messages":[{"type":"send","image":{"url":"\/images\/avatars\/5753659e-7e8b-45d8-8504-582d9dfbd78b.png"},"content":"dsadsdsda","sendDate":"2016-09-30 10:09:04","downloads":[]},{"type":"receive","image":null,"content":"Hola\n","sendDate":"2016-10-14 10:40:52","downloads":[]},{"type":"receive","image":null,"content":"feliz cumplea\u00f1oss!!","sendDate":"2016-10-14 10:41:13","downloads":[]}]}});
});

app.post('/api/dealer/messages/thread/:threadId', function(req, res) {
  res.status(200).json({});
});

app.get('/api/dealer/application', function (req, res) {
  res.status(200).json({
    "status": 0,
    "data": [{
      "id": "1fa05437-8cda-4d17-846b-a75545af22a2",
      "vendorName": "Dealer Name 02",
      "name": "Vendor Name 02",
      "vendorRole": "Vendor Role 02",
      "phone": "666112233",
      "email": "fake02@email.com",
      "howArrivedHere": "Friends"
    },
      {
        "id": "3c5ba2b7-1716-4f33-a98e-6872d0fdfd40",
        "vendorName": "Dealer Name 14",
        "name": "Vendor Name 14",
        "vendorRole": "Vendor Role 14",
        "phone": "666112233",
        "email": "fake14@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "4692dcea-95ae-45b4-a720-8c42798c2082",
        "vendorName": "Dealer Name 05",
        "name": "Vendor Name 05",
        "vendorRole": "Vendor Role 05",
        "phone": "666112233",
        "email": "fake05@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "4987a24d-8211-44a9-99ab-5e5dcfa5da71",
        "vendorName": "Dealer Name 06",
        "name": "Vendor Name 06",
        "vendorRole": "Vendor Role 06",
        "phone": "666112233",
        "email": "fake06@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "4a875250-1284-4834-a711-64b201980d4c",
        "vendorName": "Dealer Name 13",
        "name": "Vendor Name 13",
        "vendorRole": "Vendor Role 13",
        "phone": "666112233",
        "email": "fake13@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "5675600d-6766-4170-9471-8a130667a228",
        "vendorName": "Dealer Name 04",
        "name": "Vendor Name 04",
        "vendorRole": "Vendor Role 04",
        "phone": "666112233",
        "email": "fake04@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "56e85c75-3306-4263-865c-cc31f3d30c34",
        "vendorName": "Dealer Name 11",
        "name": "Vendor Name 11",
        "vendorRole": "Vendor Role 11",
        "phone": "666112233",
        "email": "fake11@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "7d994cf8-2bda-4613-951b-8bc0e3ffe92c",
        "vendorName": "Dealer Name 18",
        "name": "Vendor Name 18",
        "vendorRole": "Vendor Role 18",
        "phone": "666112233",
        "email": "fake18@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "9b0969df-421b-43f6-b5d9-985afb7a03a3",
        "vendorName": "Dealer Name 19",
        "name": "Vendor Name 19",
        "vendorRole": "Vendor Role 19",
        "phone": "666112233",
        "email": "fake19@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "ad24ffd5-7a26-4d62-9617-0f1782ab1dd7",
        "vendorName": "Dealer Name 08",
        "name": "Vendor Name 08",
        "vendorRole": "Vendor Role 08",
        "phone": "666112233",
        "email": "fake08@email.com",
        "howArrivedHere": "Friends"
      },
      {
        "id": "af9868e9-5e7b-428c-b443-8e3fe93c3189",
        "vendorName": "Dealer Name 03",
        "name": "Vendor Name 03",
        "vendorRole": "Vendor Role 03",
        "phone": "666112233",
        "email": "fake03@email.com",
        "howArrivedHere": "Friends"
      }]
  });
});

app.post('/api/public/dealer/application/create', function (req, res) {
  if (typeof req.body.vendorName === 'undefined' || req.body.vendorName === '') {
    res.status(300).json({"status": 0, "data": 'invalid dealer application'});
  } else {
    res.status(200).json({"status": 0, "data": null});
  }
});

app.post('/api/dealer/application/:id', function (req, res) {
  if (req.params.id !== 'false-id') {
    res.status(200).json({"status": 0, "data": null});
  } else {
    res.status(400).json({"message": "Bad request"});
  }

});
app.post('/api/dealer/login', function (req, res) {
  //  -> fake:fake
  switch (req.headers.authorization) {
    case "Basic ZmFrZTpmYWtl": //fake:fake
      res.status(400).json({
        "message": "Bad authentication"
      });
      break;
    case "Basic Zmlyc3Q6Zmlyc3Q=": //first:first
      res.status(200).json(getDealerProfile(true));
      break;
    default:
      res.status(200).json(getDealerProfile(false));
  }
});

app.post('/api/dealer/current', function (req, res) {
      return res.status(200).json({"status": 0, "data": {
        "avatar": "http://2.bp.blogspot.com/-rscYau_uPsM/Tzr34Us2HMI/AAAAAAAAB0Q/gtjnks_Gpw4/s200/avatar.jpg",
        "background": "http://image.redbull.com/rbx00498/0001/2/600/445/inarticle_eaurouge_3231231.jpg",
        "profile": {
          "name": "Tag Heuer BMW M Models",
          "address": "Weissbier Strasse 46\n Köln\n Deutschland",
          "zipCode": "08011",
          "vendorName": "Max Verstappen",
          "vendorRole": "Number One Driver",
          "email": "email3",
          "schedule": "Mon - Sun \n 9:00 AM - 6:00 PM",
          "deliveryConditions": "Delivery conditions for Red Bull Racing units \n leading delivery for fast and secure \n Tag Heuer Motors",
          "specialConditions": "Special condifitons for Hungaro Ring and Red Bull Ring circuits,\n Azerbajan Street Circuit discount for the first Europian GP \n outisde of Europe",
          "phoneNumber": null,
          "firstUse": true,
          "generalConditions": [
            {"id": 1, "text": "CONDITION_1"},
            {"id": 3, "text": "CONDITION_3"}
          ]
        },
        "conditions": [
          {"id": 1, "text": "CONDITION_1"},
          {"id": 2, "text": "CONDITION_2"},
          {"id": 3, "text": "CONDITION_3"},
          {"id": 4, "text": "CONDITION_4"}
        ]
      }});
  });

app.get('/api/dealer/current', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json({
      "status": 0,
      "data": {
        "avatar": "http://2.bp.blogspot.com/-rscYau_uPsM/Tzr34Us2HMI/AAAAAAAAB0Q/gtjnks_Gpw4/s200/avatar.jpg",
        "background": "http://image.redbull.com/rbx00498/0001/2/600/445/inarticle_eaurouge_3231231.jpg",
        "profile": {
          "name": "Tag Heuer BMW M Models",
          "address": "Weissbier Strasse 46\n Köln\n Deutschland ",
          "zipCode": "08011",
          "vendorName": "Max Verstappen",
          "vendorRole": "Number One Driver",
          "email": "email3",
          "schedule": "Mon - Sun \n 9:00 AM - 6:00 PM",
          "deliveryConditions": "Delivery conditions for Red Bull Racing units \n leading delivery for fast and secure \n Tag Heuer Motors",
          "specialConditions": "Special condifitons for Hungaro Ring and Red Bull Ring circuits,\n Azerbajan Street Circuit discount for the first Europian GP \n outisde of Europe",
          "phoneNumber": null,
          "firstUse": true,
          "generalConditions": [
            {"id": 1, "text": "CONDITION_1"},
            {"id": 3, "text": "CONDITION_3"}
          ]
        },
        "conditions": [
          {"id": 1, "text": "CONDITION_1"},
          {"id": 2, "text": "CONDITION_2"},
          {"id": 3, "text": "CONDITION_3"},
          {"id": 4, "text": "CONDITION_4"}
        ]
      }
    });
  }
});

app.get('/api/car/brands', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json(
      {"status":0,"data":[{"name":"Abarth"},{"name":"Alfa Romeo"},{"name":"Audi"},{"name":"Bentley"},{"name":"BMW"},{"name":"BYD"},{"name":"Citro\u00ebn"},{"name":"Dacia"},{"name":"DS"},{"name":"Ferrari"},{"name":"Fiat"},{"name":"Ford"},{"name":"Honda"},{"name":"Hyundai"},{"name":"Infiniti"},{"name":"Jaguar"},{"name":"Jeep"},{"name":"Kia"},{"name":"Lamborghini"},{"name":"Lancia"},{"name":"Land Rover"},{"name":"Lexus"},{"name":"Maserati"},{"name":"Mazda"},{"name":"Mercedes-Benz"},{"name":"MINI"},{"name":"Mitsubishi"},{"name":"Nissan"},{"name":"Opel"},{"name":"Peugeot"},{"name":"Porsche"},{"name":"Renault"},{"name":"Rolls-Royce"},{"name":"SEAT"},{"name":"Skoda"},{"name":"Smart"},{"name":"SsangYong"},{"name":"SUBARU"},{"name":"Suzuki"},{"name":"Toyota"},{"name":"Volkswagen"},{"name":"Volvo"}]}
    );
  }
});

app.get('/api/car/brands/:brand/models', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json({"status":0,"data":[{"brand":"SEAT","name":"Alhambra","year":"2017"},{"brand":"SEAT","name":"Ateca","year":"2017"},{"brand":"SEAT","name":"Ibiza","year":"2017"},{"brand":"SEAT","name":"Mii","year":"2017"},{"brand":"SEAT","name":"Nuevo Le\u00f3n","year":"2016"},{"brand":"SEAT","name":"Toledo","year":"2017"}]});
  }
});

app.get('/api/car/packs/:vehicleid', function(req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json(
      {
        "status": 0,
        "data": [
          {
            "id":1611,
            "title":" Paquete Business (no para clientes particulares)",
            "extrasIncluded": [
              " Telefon\u00eda de confort con conexi\u00f3n ampliada para smartphone",
              " Sistema de navegaci\u00f3n Professional",
              " Cuadro de instrumentos multifuncional",
              " Faros antiniebla de LED",
              " Speed Limit Info",
              " Paquete de iluminaci\u00f3n",
              " Paquete de compartimentos"
            ],
            "prices":6668.25,
            "type":"PVP"
          },
          {
            "id":1511,
            "title":" Paquete de servicios ConnectedDrive",
            "extrasIncluded":[
              " Servicios ConnectedDrive",
              " Real Time Traffic Information",
              " Concierge Services",
              " Remote Services"
            ],
            "prices":862.98,
            "type":"PVP"
          }]
      }
    );
  }
});

app.get('/api/dealer/cars', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json(
      {
        "status": 0,
        "data": {
          "Abarth": [
            {"brand": "Abarth", "name": "500", "year": "2016", "available": true},
            {"brand": "Abarth", "name": "124 Spider", "year": "2016", "available": false},
            {"brand": "Abarth", "name": "500C", "year": "2016", "available": false}],
          "Audi": [
            {"brand": "Audi", "name": "R8", "year": "2016", "available": false},
            {"brand": "Audi", "name": "RS Q3", "year": "2017", "available": false},
            {"brand": "Audi", "name": "RS3", "year": "2016", "available": false},
            {"brand": "Audi", "name": "RS6", "year": "2017", "available": false},
            {"brand": "Audi", "name": "RS7", "year": "2017", "available": true},
            {"brand": "Audi", "name": "S1", "year": "2017", "available": false},
            {"brand": "Audi", "name": "S3", "year": "2017", "available": false},
            {"brand": "Audi", "name": "S4", "year": "2015", "available": false},
            {"brand": "Audi", "name": "S5", "year": "2016", "available": true},
            {"brand": "Audi", "name": "S5", "year": "2017", "available": false},
            {"brand": "Audi", "name": "S6", "year": "2017", "available": false},
            {"brand": "Audi", "name": "S7", "year": "2017", "available": false},
            {"brand": "Audi", "name": "S8", "year": "2017", "available": true},
            {"brand": "Audi", "name": "SQ5", "year": "2017", "available": true},
            {"brand": "Audi", "name": "SQ7", "year": "2017", "available": false},
            {"brand": "Audi", "name": "TT", "year": "2017", "available": false},
            {"brand": "Audi", "name": "TTS", "year": "2017", "available": false}]
        }
      }
    );
  }
});

app.get('/api/car/brands/:brand/models/:model', function (req, res) {
  res.json(require('./resp/api-car-brand-model.json'));
});

app.get('/api/car/vehicle/:vehicleid', function(req, res) {
  res.json(require('./resp/api-car-vehicle-id.json'))
});

app.get('/api/car/vehicle/:vehicleid/:packageId', function(req, res) {
  res.json(require('./resp/api-car-vehicle-id.json'))
});

app.get('/api/dealer/stock', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.json(require('./resp/stock.json'));
  }
});

app.get('/api/dealers/offers', function (req, res) {
    res.json(require('./resp/opportunities.json'));
});

app.post('/api/dealers/offer/:offerId', function (req, res) {
  res.status(200).json({"status": 0, "data": "OK"});
});

// Added 12/09/2016
app.get('/api/dealer/statistic', function (req, res) {
  res.json(require('./resp/statistic.json'));
});

// Added 29/09/2016
app.get('/api/client/appliances/:offerId/offers', function (req, res) {
  res.json(require('./resp/client-offers.json'));
});

// Added 29/09/2016
app.get('/api/client/message/:dealerId', function (req, res) {
  res.json(require('./resp/messages.json'));
});

app.get('/api/client/messages/thread/:offerId', function(req, res) {
  res.status(200).json({"status":0,"data":{"chatWith":"gordo","messages":[{"type":"send","image":{"url":"\/images\/avatars\/5753659e-7e8b-45d8-8504-582d9dfbd78b.png"},"content":"dsadsdsda","sendDate":"2016-09-30 10:09:04","downloads":[]},{"type":"receive","image":null,"content":"Hola\n","sendDate":"2016-10-14 10:40:52","downloads":[]},{"type":"receive","image":null,"content":"feliz cumplea\u00f1oss!!","sendDate":"2016-10-14 10:41:13","downloads":[]}]}});
});

// Added 05/10/2016
app.get('/api/dealer/conversations', function (req, res) {
  res.json(require('./resp/conversations.json'));
});

app.get('/api/dealers/offer/:id', function (req, res) {
  res.json(require('./resp/opportunityDetails.json'));
});

app.post('/api/dealer/stock', function(req, res) {
  res.json(require('./resp/stock.json'));
});

app.post('/api/client/login', function (req, res) {
  switch (req.headers.authorization) {
    case "Basic dGVzdF9lbWFpbEB0ZXN0LmNvbTpzb21lX3Bhc3N3b3Jk": //test_email@test.com:some_password
      res.status(200).json(getClientProfile());
      break;
    case "Basic dXNlckB0ZXN0LmNvbTp1c2Vy": //user@test.com:user
      res.status(200).json(getClientProfile());
      break;
    default:
      res.status(400).json({
        "message": "Bad authentication"
      });
  }
});

app.post('/api/public/client', function (req, res) {
  res.status(200).json({"status": 0, "data": "OK"});
});

// Added 13/10/2016
app.post('/api/client/current', function (req, res) {
  res.status(200).json({"status": 0, "data": "OK"});
});

// Added 17/10/2016
app.get('/api/client/review/:clientId/dealers', function (req, res) {
  res.json(require('./resp/dealers-list.json'));
});

// Added 17/10/2016
app.get('/api/client/gifts', function (req, res) {
  res.json(require('./resp/gifts.json'));
});

app.post('/api/client/appliances', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json({"status": 0, "data": "OK"});
  }
});

app.get('/api/client/appliances', function (req, res) {
  if (req.headers['x-token'] === 'false-token') {
    res.status(404).send('NOT FOUND');
  } else {
    res.status(200).json({
      "status": 0,
      "data": [{
        "id": "70f6769e-c791-4694-90e1-cb14d1208e1d",
        "brand": "Audi",
        "photo": "https:\/\/sslphotos.jato.com\/PHOTO400\/SSCE\/AUDI\/A3\/2016\/4SA.JPG",
        "model": "A3",
        "createdDate": "",
        "packageName": "Paquete Black line",
        "extrasName": ["C\u00e1mara trasera", "APS. Sistema de aparcamiento ac\u00fastico plus con indicaci\u00f3n selectiva y asistencia deaparcamiento"],
        "color": "Marr\u00f3n Beluga (metalizado)",
        "numberOfOffers": 0,
        "numberOfNewOffers": 0
      }, {
        "id": "9ca1156d-2eba-42a8-b5e3-78c8515bd489",
        "brand": "Audi",
        "photo": "https:\/\/sslphotos.jato.com\/PHOTO400\/SSCE\/AUDI\/A3\/2016\/4SA.JPG",
        "model": "A3",
        "createdDate": "",
        "packageName": "Paquete Black line",
        "extrasName": ["C\u00e1mara trasera", "APS. Sistema de aparcamiento ac\u00fastico plus con indicaci\u00f3n selectiva y asistencia deaparcamiento"],
        "color": "Marr\u00f3n Beluga (metalizado)",
        "numberOfOffers": 2,
        "numberOfNewOffers": 3
      }, {
        "id": "9ca1156d-2eba-42a8-b5e3-78c8515bd489",
        "brand": "Audi",
        "photo": "https:\/\/sslphotos.jato.com\/PHOTO400\/SSCE\/AUDI\/A3\/2016\/4SA.JPG",
        "model": "A3",
        "createdDate": "",
        "packageName": "Paquete Black line",
        "extrasName": ["C\u00e1mara trasera", "APS. Sistema de aparcamiento ac\u00fastico plus con indicaci\u00f3n selectiva y asistencia deaparcamiento"],
        "color": "Marr\u00f3n Beluga (metalizado)",
        "numberOfOffers": 2,
        "numberOfNewOffers": 3
      }]
    });
  }
});

app.get('/api/client/offer/:offerId/dealer', function (req, res) {
  res.json(require('./resp/dealerOfferDetails.json'));
});

app.delete('/api/client/appliances/:id', function (req, res) {
  if (req.params.id !== 'false-id') {
    res.status(200).json({"status": 0, "data": null});
  } else {
    res.status(400).json({"message": "Bad request"});
  }
});

function getDealerProfile(firstUse) {
  return {
    "token": "923c5197-7132-40b1-99d3-e3516be5d9a4",
    "first_use": firstUse
  };
}

function getClientProfile() {
  return {
    "token": "90ce5422-98a8-45b6-800c-9f61c6ee44f8",
    "data": {
      "avatar": "http://2.bp.blogspot.com/-rscYau_uPsM/Tzr34Us2HMI/AAAAAAAAB0Q/gtjnks_Gpw4/s200/avatar.jpg",
      "background": "http://image.redbull.com/rbx00498/0001/2/600/445/inarticle_eaurouge_3231231.jpg",
      "profile": {
        "name": "Tag Heuer BMW M Models",
        "address": "Weissbier Strasse 46\n Köln\n Deutschland ",
        "zipCode": "08011",
        "vendorName": "Max Verstappen",
        "vendorRole": "Number One Driver",
        "email": "email3",
        "schedule": "Mon - Sun \n 9:00 AM - 6:00 PM",
        "phoneNumber": null,
        "firstUse": true
      }
    }
  };
}

app.listen(8000);
