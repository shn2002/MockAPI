const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors');
const { Z_DATA_ERROR } = require('zlib');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//1. Bitcoin (BTC) $128bn, 2.Ethereum (ETH) $19.4bn, 3.XRP (XRP) $8.22bn, 
//4. Tether (USDT) $6.4bn, 5. Bitcoin Cash (BCH) $4.1bn, 6.Bitcoin SV (BSV) $3.4bn
//7. Litecoin (LTC) $2.6bn, 8.EOS (EOS) $2.4bn,9.Binance Coin (BNB) $2.4bn,
//10.Tezos (XTZ) $1.5bn
function timestampToDate(timestamp){
    let date = new Date(timestamp * 1000);
    let formattedDate = date.getFullYear()+'-'+((date.getMonth()+1).toString().length===1?'0'+(date.getMonth()+1):(date.getMonth()+1))+'-'+(date.getDate().toString().length===1?'0'+date.getDate():date.getDate())
    console.log(timestamp)
    console.log(formattedDate)
    return formattedDate
}

function dateToTimestamp(date){
    return new Date(date).getTime()
}

app.get('/currentprice/:currencyCode/:cryptocurrencyCode',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/prices.json');
    let myArray = JSON.parse(rawdata);
    const {currencyCode,cryptocurrencyCode} = req.params
    let list = new Object();
    let dataArray=[];
    dataArray.push(myArray[cryptocurrencyCode][currencyCode])
    list.list=dataArray;
    res.json(list);
})


app.get('/cryptocurrencies',cors(), (req, res, next) => {
    let list = new Object();
    let coinArray=['BTC','ETH','XRP','USDT','BCH'];
    list.list=coinArray;
    res.json(list);
});

app.get('/cryptocurrency/:code',cors(), (req, res, next) => {
    const {code} = req.params
    let fullName
    switch(code) {
        case 'BTC':
          fullName ='Bitcoin'
          break;
        case 'ETH':
          fullName ='Ethereum'
          break;
        case 'XRP':
          fullName ='Ripple'
          break;
        case 'USDT':
          fullName ='Tether'
          break;
        case 'BCH':
          fullName ='Bitcoin Cash'
          break;  
      }
      res.json(fullName) 
})


app.get('/currencies',cors(), (req, res, next) => {
    let list = new Object();
    let coinArray=['USD','EUR','CNY','JPY','GBP']
    list.list=coinArray
    res.json(list);
});

app.get('/currency/:code',cors(), (req, res, next) => {
    const {code} = req.params
    let fullName
    switch(code) {
        case 'USD':
          fullName ='United States Dollar'
          break;
        case 'EUR':
          fullName ='Euro'
          break;
        case 'CNY':
          fullName ='China Yuan Renminbi'
          break;
        case 'JPY':
          fullName ='Japanese yen'
          break;
        case 'GBP':
          fullName ='Great Britain pound (sterling)'
          break;  
      }
      res.json(fullName) 
})

app.get('/daterange',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/historialPrice.json');
    let myArray = JSON.parse(rawdata);
    let list = new Object();
    let dateArray=[];
    let jsonData=myArray[0].Data.Data

    jsonData.forEach((element) => {
        dateArray.push(timestampToDate(element.time))
    });
    list.list=dateArray;
    res.json(list);
});
//http://localhost:5000/price/JPY/BTC/High/2020-07-01/2020-07-05
app.get('/price/:currencyCode/:cryptocurrencyCode/:fromDate/:toDate',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/historialPrice.json');
    let myArray = JSON.parse(rawdata);
    
    let list = new Object();
    let result=[];
    const {currencyCode,cryptocurrencyCode,fromDate,toDate} = req.params
    //console.log(fromDate)
    //console.log(toDate)
    myArray.forEach((element) => {
         if(element.Message===currencyCode+cryptocurrencyCode){
             let newdata=element.Data.Data
             newdata.forEach((item) => {
                let priceObj = new Object();
                priceObj.time=timestampToDate(item.time)  
                //priceObj.price=priceType.toLowerCase()==='high'?item.high:priceType.toLowerCase()==='low'?item.low:item.open
                //console.log(new Date(timestampToDate(priceObj.time)))
                //console.log(new Date(fromDate))
                priceObj.high = item.high
                priceObj.low = item.low
                priceObj.open = item.open
                if (new Date(priceObj.time)>=new Date(fromDate)&&new Date(priceObj.time)<=new Date(toDate)){
                    result.push(priceObj) 
                }
             })
             list.list=result;
             res.json(list); 
         }
    });
});


app.get('/profiles',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/profiles.json');
    let profiles = JSON.parse(rawdata);
    res.json(profiles);
});

app.get('/companies',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/profiles.json');
    let myArray = JSON.parse(rawdata);
    let companies='{ "data": { "list": ['
    myArray.data.list.forEach(function (value) {
        companies+='"'+value.symbol+'",'
      });
    companies =companies.slice(0,companies.length-1)
    companies +='] } }'
    const data =JSON.parse(companies);
    res.json(data);
});

app.get('/reports',cors(), (req, res, next) => {
    const rawdata = fs.readFileSync('data/reports.json');
    let reports = JSON.parse(rawdata);
    res.json(reports);
});


app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message
        })

    }
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
