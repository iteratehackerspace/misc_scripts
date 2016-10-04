"use strict";

const nmailer = require('nodemailer'),
      fs = require('fs'),
      password = process.env.ITERATE_EMAIL_PASSWORD,
      email = 'iteratehackerspace@gmail.com',
      msg = `
Բարև Ձեզ,
Ես հայ ծրագրավորող եմ։
Մասնագիտական նորություններից տեղեկացել եմ, որ մի քանի հազար հայ օգտատերերի Ֆեյսբուքյան հաշիվները կոտրվել են հաքերների կողմից, և դրանց մուտքանունն և գաղտնաբառը բաց հրապարակվել է։
Ես որոշեցի էլ–փոստով տեղեկացնել և զգուշացնել բոլոր այն մարդկանց ում էլ–փոստը գտա այդ հրապարակված ցանկերում։ Խորհուրդ եմ տալիս հնարավորինս արագ փոխել Ֆեյսբուքի ձեր գաղտնաբառը։ Կարևոր է փոխել նաև այլ ծառայություններում գաղտնաբառերը, եթե դրանցում օգտագործված գաղտնաբառը նույնն է, ինչ որ օգտագործել էիք Ֆեյսբուքում։
Հարգանքներով,
Էդգար Հարությունյան`;

const transporter =
      nmailer
      .createTransport(`smtps://${email}:${password}@smtp.gmail.com`);

fs.readFile('./emails.txt', 'utf-8', (_, d) => {
  const emails = d.split('\n').map(item => item.split('=')[1]);

  let spot = 0;
  const timer_obj = setInterval(() => {

    const mail_opts = {
      from:'"iterate hackerspace <iteratehackerspace@gmail.com>"',
      to:emails[spot],
      subject:'You got hacked',
      text: msg
    };
    
    transporter.sendMail(mail_opts, (_, __) => {
      console.log('Emailed: ', emails[spot]);
      spot++;
      if (spot === emails.length - 1) clearInterval(timer_obj);
    });

  }, 3000);
  
});
