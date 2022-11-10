//Storing the currency symbols in an object in order to execute in select/option tag
let currency_symbol = {
  ARS: "AR",
  AWG: "AW",
  AUD: "AU",
  AZN: "AZ",
  BSD: "BS",
  BBD: "BB",
  BYN: "BY",
  BZD: "BZ",
  BMD: "BM",
  BOB: "BO",
  BAM: "BA",
  BWP: "BW",
  BGN: "BG",
  BRL: "BR",
  BND: "BN",
  KHR: "KH",
  CAD: "CA",
  KYD: "KY",
  CLP: "CL",
  CNY: "CN",
  COP: "COP",
  CRC: "CR",
  HRK: "HR",
  CUP: "CU",
  CZK: "CZ",
  DKK: "DK",
  DOP: "DO",
  XCD: "XC",
  EGP: "EG",
  SVC: "SV",
  EUR: "EU",
  FKP: "FK",
  FJD: "FJ",
  GHS: "GH",
  HKD: "HK",
  INR: "IN",
  ILS: "IL",
  JMD: "JM",
  JPY: "JP",
  LRD: "LR",
  MYR: "MY",
  MUR: "MU",
  MXN: "MX",
  NPR: "NP",
  ANG: "AN",
  NZD: "NZ",
  NGN: "NG",
  PKR: "PK",
  RUB: "RU",
  SAR: "SA",
  SCR: "SC",
  SGD: "SG",
  ZAR: "ZA",
  UAH: "UA",
  AED: "AE",
  GBP: "GBP",
  USD: "US",
  UYU: "UY",
};

//Accessing the SELECT TAG associated with "FROM COUNTRY"
const Fromcurrency = document.getElementById("Fromcurrency");
/*/ mysterious😂 way of appending currency-symbol
 to countryflag url and showcasing in img tag; whenever a select is clicked and an option is selected.
/*/
Fromcurrency.onclick = () => {
  //Basically extracting the first two letters of currency-symbol using array/method(slice)
  const from = Fromcurrency.value.slice(0, -1);
  //Converting the result above into a "lowercase"
  const fromcur = from.toLowerCase();
  //Accessing the IMG TAG, in order inserting imgs once an OPTION is selected
  const USA = document.getElementById("USA");
  //COUNTRYFLAG API stored in temperal literal

  const url = `https://flagcdn.com/${fromcur}.svg`;
  USA.src = url;
};

//Accessing the SELECT TAG associated with "TO COUNTRY"
const Tocurrency = document.getElementById("Tocurrency");
/*/ mysterious😂 way of appending currency-symbol
 to countryflag url and showcasing in img tag; whenever a select is clicked and an option is selected.
/*/
Tocurrency.onclick = () => {
  const To = Tocurrency.value.slice(0, -1);
  const tocur = To.toLowerCase();
  //Accessing the IMG TAG, in order inserting imgs once an OPTION is selected
  const NGN = document.getElementById("NGN");
  //COUNTRYFLAG API stored in temperal literal
  const link = `https://flagcdn.com/${tocur}.svg`;
  NGN.src = link;
};

//DROPLIST is essentially used to access individually the SELECT TAGS
const droplist = document.querySelectorAll(".Droplist select");
//LOOPING through droplist
for (let i = 0; i < droplist.length; i++) {
  for (currency in currency_symbol) {
    let selected;
    if (i == 0) {
      selected = currency == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency == "NGN" ? "selected" : "";
    }
    //optiontag basically takes in  iterator from FOR-IN as value and automatically appends the selected CURRENCY SYMBOL
    let optiontag = `<option value="${currency}" ${selected}>${currency}</option> `;
    droplist[i].insertAdjacentHTML("beforeend", optiontag);
  }
}

// function for running exchange rate calculation
const btn = document.getElementById("convert");
btn.onclick = () => {
  //calling the INPUTVALUE function whenever EXCHANGE RATE BTN is clicked
  inputvalue();
  voiceout();
  //This logic literally rotates the EXCHANGE-IMG whenever  EXCHANGE RATE BTN is clicked
  const animation = document.querySelector(".exchange-img");
  animation.classList.toggle("active");
};

// function for grabbing the input value
function inputvalue() {
  const input = document.getElementById("input");
  const value = input.value;
  //if the user doesnt enter any value or enters 0 as a value, 1 should be appended automatically.
  if (value == "" || value == "0") {
    input.value = "1";
    value = 1;
  }
  //API stored in variable with "FROMCURRENCY.VALUE" associated
  const url = `https://v6.exchangerate-api.com/v6/8e31d4ce13203ad156b55e30/latest/${Fromcurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      //Obtaining result from "FROMCURRENCY.VALUE" when "TOCURRENCY.VALUE" is entered
      const Exchangerate = json.conversion_rates[Tocurrency.value];
      const total = (value * Exchangerate).toFixed(2);

      //Accessing the "EXCHANGE RATE TXT" HTML TAG for inserting the result into

      const Exchangeratetxt = document.getElementById("Exchangeratetxt");
      Exchangeratetxt.innerText = `${value} ${Fromcurrency.value} = ${total}  ${Tocurrency.value}`;
    });
  .catch ( () => {
    Exchangeratetxt.innerText = alert("Something went wrong")
  })
}

function voiceout() {
  //voicing out the EXCHANGE RATE TXT
  const voice = Exchangeratetxt.innerText;
  let speech = new SpeechSynthesisUtterance();

  // speakout properties
  speech.lang = "en-NG";
  speech.text = `${voice}`;
  speech.volume = 30;
  speech.pitch = 1;
  speech.rate = 1;

  window.speechSynthesis.speak(speech);
}
