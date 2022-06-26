/*Listener nel caricamento della pagina*/
window.addEventListener('load', updateChart);
function updateChart()
{
    /*INIZIO: DATI ED ETICHETTE*/
    const data = {
      datasets: [
        {
          label: 'Speed[m/s]',
          backgroundColor: 'rgba(255,0,0,0.6)',
          borderColor: 'black'
        },

        {
          label: 'Acceleration[m/s^2]',
          backgroundColor: 'rgba(0,255,0,0.6)',
          borderColor: 'black'
        },

        {
          label: 'Horses[hp]',
          backgroundColor: 'rgba(255,255,0,0.6)',
          borderColor: 'black'
        },

        {
          label: 'Weight[Kg]',
          backgroundColor: 'rgba(255,0,255,0.6)',
          borderColor: 'black'
        }
    ]

      
    };
  
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        devicePixelRatio:3
      },
    };
    /*FINE: DATI ED ETICHETTE*/

    var ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(
      ctx,
      config
    );
    let vettore=0;
    let MaxStats={};

    async function fetchData(){
        const response = await fetch('cars.json');
        const datapoints = await response.json();
        return datapoints;
    }

    /*fetch dei dati json e li metto in un vettore di JSON objects*/
    fetchData().then((datapoints)=>{
        //vettore dove salvi gli oggetti per poi filtrare le  info
        vettore=datapoints.map(function(index){
        
        return{
                name:index.name,
                speed: index.speed,
                acceleration: index.acceleration,
                horses: index.horses,
                weight: index.weight,
                stable: index.stable
        };
      })
      
      /*inserimento dataset delle cilindrate*/
      myChart.config.data.datasets[0].data= vettore.map(a => a.speed);

      /*inserimento dataset delle accelerazioni*/
      myChart.config.data.datasets[1].data= vettore.map(a => a.acceleration);
 
      /*inserimento dataset dei cavalli*/
      myChart.config.data.datasets[2].data= vettore.map(c => c.horses);
 
      /*inserimento dataset dei cavalli*/
      myChart.config.data.datasets[3].data= vettore.map(c => c.weight);
      
      /*inserimento dei nomi dei veicoli come etichette*/
      myChart.data.labels=vettore.map(d => d.name + " [ " + d.stable + " ]");

      /*aggiornamento grafico*/
      myChart.update();  
      
      
      car=findMax(vettore,vettore.length);

      //console.log(car.TA)
      document.getElementById('maxAcc').innerHTML=
      car.TA.name + " has the top acc: " + car.TA.value + "[m/s<sup>2</sup>]";

      document.getElementById('maxSpeed').innerHTML=
      car.TS.name + " has the top speed: " + car.TS.value + " [m/s] ";

      document.getElementById('lightestWeight').innerHTML=
      car.TW.name + " has the lightest weight: " + car.TW.value + " [Kg] ";

      document.getElementById('maxHorses').innerHTML=
      car.TH.name + " has more horses: " + car.TH.value + "[cv]";

    
    });
}


function findMax(vettore,l){
  console.log(l)
  let WithTopAcc={};
  let WithLightWeight={};
  let WithMoreHorses={};
  let WithMoreSpeed={};

  let maxSpeed=0;
  let maxHorses=0;
  let maxAcc=0;
  let topWeight=1000000;
  
  for (let index = 0; index < l; index++){
    if(maxSpeed<vettore[index].speed){
      maxSpeed=vettore[index].speed;
      WithMoreSpeed={name:vettore[index].name, value:vettore[index].speed};
    }
    
    if(maxHorses<vettore[index].horses){
      maxHorses=vettore[index].horses;
      WithMoreHorses={name:vettore[index].name, value:vettore[index].horses};
    }

    if(maxAcc<vettore[index].acceleration){
      maxAcc=vettore[index].acceleration;
      WithTopAcc={name:vettore[index].name, value:vettore[index].acceleration};
    }

    if(vettore[index].weight<topWeight){
      topWeight=vettore[index].weight;
      WithLightWeight={name:vettore[index].name, value:vettore[index].weight};
    }
  }

  return{
          TA:WithTopAcc,
          TW:WithLightWeight,
          TH:WithMoreHorses,
          TS:WithMoreSpeed
        };
}




