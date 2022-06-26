/*
  INIZIO DICHIARAZIONE MODULI DA UTILIZZARE
*/

/*chiamo il modulo express*/
const express = require('express');



/*applico express su app*/ 
const app = express();

/*chiamo il modulo ejs*/ 
const res= require('ejs');


/*richiamo il modulo fs*/
const data = require('fs');
const { parse } = require('path');
const { Console } = require('console');


/*
  FINE DICHIARAZIONE DEI MODULI DA UTILIZZARE
*/ 


/* INIZIO SETTAGGI PRINCIPALI*/

//intermediario per json files
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//lettore file json
const dataReader = data.readFileSync('public/cars.json');

//parser del file json
const parser = JSON.parse(dataReader);

//uso di file statici come css e immagini
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/img',express.static(__dirname + 'public/img'));
app.use('/js',express.static(__dirname + 'public/js'));

//set sulla cartella views per le pagine html
app.set('views','./views');

//stabilisco il motore di template
app.set('view engine','ejs');


//set della porta del localhost
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

/* FINE SETTAGGI PRINCIPALI*/



/* INIZIO RENDERING DI TUTTE LE VIEW*/ 

//get della pagina principale
app.get('',(req,res)=>{
  res.render('index');
});

//get della pagina per aggiungere veicoli
app.get('/addCar',(req,res)=>{
  res.render('addCar');
});


app.get('/charts',(req,res)=>{
  res.render('charts');
});
/*FINE RENDERING DI TUTTE LE VIEW*/

//post dei dati per salvare nuovi veicoli nel file cars.json
app.post('/public',(req,res)=>{
  
  //assegno a car le info inviate dalla post
  const car = req.body;
  let name = req.body.name.toLowerCase();
  console.log(name);
  
  let check=false;
  if(car != undefined)
  {
    //controllo che non venga inserita un veicolo già registrato
    for (let index = 0; index < parser.length; index++) {
      if(name==parser[index].name){
       check=true;
      }
    }

    if(check){
      res.status('400').send("this car is already registered");
    }

    else
    {
      //push() ritorna la nuova lunghezza del vett quindi lo assegno all'id
      req.body.id=parser.push(car);

      //converto in numeri i valori che mi interessano di ogni oggetto json
      req.body.acceleration=parseFloat(req.body.acceleration);
      req.body.speed=parseFloat(req.body.speed);
      req.body.weight=parseFloat(req.body.weight);
      req.body.horses=parseFloat(req.body.horses);


      //aggiorno il file
      data.writeFileSync("public/cars.json",JSON.stringify(parser));

      //risposta del server
      res.status(200).send('car added');
    }

    
    
  }
});


//post per eliminare le auto nel file cars.json
app.delete('/deleteCar',(req,res)=>{
  
  const id = req.body.id;
  //controllo che l'id inviato non sia nullo
  if(id != null){
    for(let i=0; i < parser.length; i++){
       if(parser[i].id==id){
        parser.splice(id-1,1);
        data.writeFileSync("public/cars.json",JSON.stringify(parser));
        res.send("car deleted");
       }
    }
    res.send("cannot find a car with that id");
  }
});


//aggiornamento dati veicolo
app.put('/editStats',(req,res)=>
{
  let check=false;
  let id= req.body.id;
  let stable= req.body.stable;
  let acc = req.body.acceleration;
  let speed = req.body.speed;
  let horses = req.body.horses;
  let weight = req.body.weight;
  if(id != null)
  {
    for(let i=0; i < parser.length; i++)
    {
      if(parser[i].id==id)
      {
        check=true;
        if(speed == undefined || acc == undefined || weight == undefined  || stable == undefined  || horses == undefined  || res.name == undefined)
        {
          res.status('400').send('ERROR! maybe you have sent an uncompleted request(all fields required)');
        }
        else{
          parser[i].acceleration=acc;
          parser[i].stable=stable;
          parser[i].horses= horses;
          parser[i].weight=weight;
          parser[i].speed=speed;
          data.writeFileSync("public/cars.json",JSON.stringify(parser));
          res.status('200').send("car with id number: " + id + " updated");
         
        }
      }
      res.status('404').send("no car found with the id n°: " + id + "please check the car id...");
    }
  };
});
