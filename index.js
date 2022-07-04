import ip from 'ip';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

import isUp from 'is-up';


//Covid
const dada = await fetch('https://disease.sh/v3/covid-19/all');
const datad = await dada.json();
//Ethereum
const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR');
const eth = await response.json();
const ether = JSON.stringify(eth);

//Serruriers
puppeteer.use(pluginStealth());
async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="company-container"]/div[3]/div/div[1]/div/div[2]/div[1]/a')
    const txt = await el.getProperty('textContent');
    const name1 = await txt.jsonValue();
    
    const [el2] = await page.$x('//*[@id="company-container"]/div[3]/div/div[1]/div/div[2]/div[2]/div/div[3]/span')
    const txt2 = await el2.getProperty('textContent');
    const number1 = await txt2.jsonValue();

    const [el3] = await page.$x('//*[@id="company-container"]/div[1]/div/div[1]/div/div[2]/div[1]/a')
    const txt3 = await el3.getProperty('textContent');
    const name2 = await txt3.jsonValue();

    const [el4] = await page.$x('//*[@id="company-container"]/div[1]/div/div[1]/div/div[2]/div[2]/div/div[3]/span')
    const txt4 = await el4.getProperty('textContent');
    const number2 = await txt4.jsonValue();

    const [el5] = await page.$x('//*[@id="company-container"]/div[2]/div/div[1]/div/div[2]/div[1]/a')
    const txt5 = await el5.getProperty('textContent');
    const name3 = await txt5.jsonValue();

    const [el6] = await page.$x('//*[@id="company-container"]/div[2]/div/div[1]/div/div[2]/div[2]/div/div[3]/span')
    const txt6 = await el6.getProperty('textContent');
    const number3 = await txt6.jsonValue();
    
    const [el7] = await page.$x('//*[@id="company-container"]/div[4]/div/div[1]/div/div[2]/div[1]/a')
    const txt7 = await el7.getProperty('textContent');
    const name4 = await txt7.jsonValue();

    const [el8] = await page.$x('//*[@id="company-container"]/div[4]/div/div[1]/div/div[2]/div[2]/div/div[3]/span')
    const txt8 = await el8.getProperty('textContent');
    const number4 = await txt8.jsonValue();

    const [el9] = await page.$x('//*[@id="company-container"]/div[5]/div/div[1]/div/div[2]/div[1]/a')
    const txt9 = await el9.getProperty('textContent');
    const name5 = await txt9.jsonValue();

    const [el10] = await page.$x('//*[@id="company-container"]/div[5]/div/div[1]/div/div[2]/div[2]/div/div[3]/span')
    const txt10 = await el10.getProperty('textContent');
    const number5 = await txt10.jsonValue();

   //J'affiche les 5 que dans le tableau dans le mail
    const myJSON = name1 + " - " + number1 + " / " + name2 + " - " + number2  ;
    const myJS = name1 + " - " + number1 + " <br/> " + name2 + " - " + number2 +" <br/> "+name3 + " - " + number3 + " <br/> " + name4 + " - " + number4 +" <br/> " + name5 + " - " + number5  ;
    const tablehtml = "<style> table { width: 100%; } td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; } </style><table><tr><th>Title</th><th>Description</th><th>Value</th></tr><tr><th>IP</th><th>L'IP que vous utilisez</th><th>"+ ip.address()+"</th></tr><tr><th>Ethereum</th><th>Le cours de l'Etheureum</th><th>"+ ether.replace(/[^\d.-]/g, '')+"</th></tr><tr><th>Intranet</th><th>L'intranet d'epitech digital</th><th>"+await isUp('https://epitech.eu') + "</th></tr><tr><th>Covid-19</th><th>Cas covid depuis le début</th><th>"+datad.cases+"</th></tr><tr><th>Serrurier</th><th>Liste des serruriers à Boulogne</th><th>"+myJS+"</th></tr></table>"
    ;

//Table
    const array = [

        {title: 'ip', description: 'LIP que vous utilisez', value:ip.address() },
        {title: 'Eth', description: "Le cours de l'Eth", value:ether.replace(/[^\d.-]/g, '')},
        {title: 'Intranet', description: "L'intranet d'Epitech Digital",value: await isUp('https://epitech.eu') },
        {title: 'Covid-19', description: "Cas covid depuis le début", value: datad.cases},
       {title: 'Serrurier', description: "Liste serrurier à Boulogne", value: myJSON}
    ]
    
    const da = array.reduce((acc, {title, ...x}) => { acc[title] = x; return acc}, {})
    
    console.table(da)
    async function main() {
      let testAccount = await nodemailer.createTestAccount();
  
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      let info = await transporter.sendMail({
        from: '"Taha " <taha@example.com>', 
        to: "emir@example.com",
        subject: "Node JS",
        text: "Hello world?", 
        html: tablehtml
      });
    
      console.log("Message sent: %s", info.messageId);
    
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);  
}



scrapeProduct('https://www.cylex-locale.fr/boulogne-billancourt/serrurier/');


 //Node Mailer
 