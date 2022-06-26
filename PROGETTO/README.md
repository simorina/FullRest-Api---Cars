# RELAZIONE

## Alunno: [Rinaldi Simone](https://github.com/simorina)
## Matricola: 307579
### Sessione Estiva 2022


## Introduzione
### Il progetto realizzato è stato denominato 4WHEELS, il quale rappresenta una restfull API capace di fornire specifiche di veicoli di diverse scuderie. Non solo l'utente potrà visualizzarne i dati ma potrrà anche aggiungere dei nuovi veicoli con le proprie specifiche per poi metterle a confronto con gli altri veicoli.


## Descrizione
#### Il progetto è stato realizzato utilizzando NODEJS, un framework usato per scrivere applicazioni in Javascript lato server. Il file 'application.js' rappresenterà il nostro server che invierà risposte al cliente in base al tipo di richiesta che verrà effettuata e se andrà a buon fine o meno. Per la simulazione del database mi sono avvalso dell'uso di un file in formato JSON, il quale conterrà degli oggetti che simuleranno gli effettivi veicoli. Le operazioni effettuabili in questo progetto sono le CRUD(Create, Read, Update, Delete) operations.


## Moduli utilizzati in NODEJS
### Express : Express è un framework per applicazioni Web Node.js minimale e flessibile che fornisce un solido set di funzionalità per sviluppare applicazioni Web e mobili. Facilita il rapido sviluppo di applicazioni Web basate su Node. Di seguito sono riportate alcune delle caratteristiche principali del framework Express:
#### Consente di configurare middleware per rispondere alle richieste HTTP.
#### Definisce una tabella di routing che viene utilizzata per eseguire diverse azioni in base al metodo HTTP e all'URL.
#### Consente di renderizzare dinamicamente le pagine HTML in base al passaggio di argomenti ai modelli.

### fs: Questo modulo permette, insieme col precedente, di lavorare a stretto contatto con il filesystem della macchina, eseguendo tutte le operazioni tipiche di questo ambito come ad esempio la copia, la rinominazione, la cancellazione, la lettura e la scrittura di file e cartelle.

### ejs: EJS o Embedded Javascript Templating è un motore di creazione di modelli utilizzato da Node.js. Il motore di modelli aiuta a creare un modello HTML con un codice minimo. Inoltre, può iniettare dati nel modello HTML sul lato client e produrre l'HTML finale. EJS è un semplice linguaggio di creazione di modelli che viene utilizzato per generare markup HTML con JavaScript vanilla. Aiuta anche a incorporare JavaScript nelle pagine HTML.


### Struttura Risultante del file 'cars.json', che simulerà il database

| Name          | Stable        | Horses[hp]   | Weight[kg]  | Acceleration[m/s<sup>2</sup>] | Speed[m/s] | id  |
| ------------- | ------------- | --------     | ------------|-------------------------------|------------|-----|
| Veneno        | Lamborghini   |  770         |   1,490     |                11             |  356       |  8  |
| Testarossa    | Ferrari       |  428         |   1,708     |                10             |  304       |  9  |


### Endpoint chiamati con rispettivo tipo di chiamata(CRUD)
#### GET: utilizzato nel progetto per richiamare le view(index.ejs,chart.ejs,addCar.ejs)
#### POST: utilizzato per inserire dati inerenti a nuovi veicoli, l'endpoint chiamato è stato denominato 'public'
#### PUT: utilizzato per modificare dati di veicoli già esistenti tramite l'id del veicolo e la serie di dati ai quali effettuare le modifiche(la richiesta dovrà soddisfare tutti i campi per poter essere considerata valida)
#### DELETE: utilizzata per eliminare i veicoli in base all'id del veicolo
