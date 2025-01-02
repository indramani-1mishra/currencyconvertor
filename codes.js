let select = document.getElementsByTagName("select");

document.addEventListener("DOMContentLoaded", () => {
  // Filling the select dropdowns with country options
  for (let key in countryList) {
    var option1 = document.createElement('option');

    
    option1.value = countryList[key];


    option1.textContent = key;

    select[0].appendChild(option1);
    option1.classList.add('raj22');
    option1.setAttribute('data', key); 
        
    var option2 = document.createElement('option');
    option2.value = countryList[key];
    option2.textContent = key;
    option2.setAttribute('data', key);  // Set the key as a custom attribute 'data'
    select[1].appendChild(option2);

    option2.classList.add('raj22');
  }

  // Adding event listener for flag change on select[0]
  select[0].addEventListener('change', () => {
    let imag = document.querySelector(".flag");
    console.log(imag.src);
    imag.src = `https://flagsapi.com/${select[0].value}/flat/64.png`;
    console.log(imag.src);
  });

  // Adding event listener for flag change on select[1]
  select[1].addEventListener('change', () => {
    let imag = document.querySelector(".flag1");
    console.log(imag.src);
    imag.src = `https://flagsapi.com/${select[1].value}/flat/64.png`;
  });

  let button = document.getElementById("btn");

  // Example usage: Fetching the exchange rate and calculating the converted amount
  button.addEventListener('click', async () => {
    let amount = document.getElementById("amount");
    let amtvlu = amount.value;
    console.log(amtvlu);

    // If amount is empty or less than or equal to 0, reset to 1
    if (amtvlu <= 0 || amtvlu === '') {
      amount.value = 1;
      amtvlu = 1;  // Update amtvlu after resetting the amount input
    }

    // Use `getAttribute('data')` to get the selected country key
    var fromCurrencyKey = select[0].options[select[0].selectedIndex].getAttribute('data');
    var toCurrencyKey = select[1].options[select[1].selectedIndex].getAttribute('data');

    console.log("From Currency (Key): ", fromCurrencyKey);
    console.log("To Currency (Key): ", toCurrencyKey);

    // Correct URL format for the API call
    let URL = `https://v6.exchangerate-api.com/v6/d00a6ec3ac39e1082aa40cbb/latest/${fromCurrencyKey}`;
    console.log("API URL: ", URL);

    // Fetching exchange rates
    const response = await fetch(URL);
    const data = await response.json();

    if (data.result === "success") {
      // Getting the exchange rate for the selected currency
      let rate = data.conversion_rates[toCurrencyKey];
      console.log(`Exchange rate for ${toCurrencyKey}:`, rate);
      let amountST= document.getElementById('convertedCurrency');

      // Calculating the converted amount
      let convertedAmount = amtvlu * rate;
      amountST.innerHTML = `${fromCurrencyKey}: ${amtvlu}to ${toCurrencyKey} ${convertedAmount.toFixed(2)}`;  // Rounding to 2 decimal places
      console.log("Converted Amount: ", convertedAmount);
    } else {
      console.log("Error in fetching exchange rate");
    }
  });
});
