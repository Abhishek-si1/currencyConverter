const BASEURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for(let select of dropdowns){
    for(currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if(select.name==='to' && currCode==='INR'){
            option.selected = "selected";
        }else if(select.name==='from' && currCode=== 'USD'){
            option.selected= "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector('form input');
    let amtValue = amount.value;
    if(amtValue=== "" || amtValue < 0){
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${BASEURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtValue*rate;
    let msg = document.querySelector(".msg");
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})