
function getFormatedTime(){

const now = new Date().toLocaleTimeString('en-us',{
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});;

const date = now.split(',')[0].split(' ');
const time = now.split(',')[1];
return `${date[1]} ${date[0]}, ${time}`;
}


document.querySelector('#ewallet-form').addEventListener('submit', function
(e){
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

    if (desc.length > 0 && value.length > 0){
        addItems(type, desc, value);  
        resetForm(); 
    }
    
});

showItem();

function showItem(){
    let items = getItemsFromLS();

    const collection = document.querySelector('.collection');

    for ( let item of items){
        const newHtml = `
        <div class="collection">
            <div class="item">
              <div class="item-description-time"> 
                <div class="item-description">
                  <p>${item.desc}</p>
                </div>
                <div class="item-time">
                  <p>${item.time}</p>
                </div>
              </div>
              <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'} ">
                <p>${item.type}Shs${separator(item.value)}</p>
              </div>
            </div>
        </div>  
        `;
        collection.insertAdjacentHTML('afterbegin', newHtml);
    }

}

function addItems(type, desc, value){

    const time = getFormatedTime();

    const newHtml = `
        <div class="collection">
            <div class="item">
              <div class="item-description-time"> 
                <div class="item-description">
                  <p>${desc}</p>
                </div>
                <div class="item-time">
                  <p>${time}</p>
                </div>
              </div>
              <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'} ">
                <p>${type}Shs${separator(value)}</p>
              </div>
            </div>
        </div>  
        `;    

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);

    addItemToLS(type, desc, value, time);

    showTotalIncome();
    showTotalExpense();
    showTotalBalance();

}


function resetForm(){
   document.querySelector('.add__type').value = '+';
   document.querySelector('.add__description').value = '';
   document.querySelector('.add__value').value = '';

};

function getItemsFromLS(){
    let items = localStorage.getItem('items');

    if(items){
        items = JSON.parse(items);
    }else{
         items = [];
    }

    return items;
}

function addItemToLS(type, desc, value, time){

    let items = getItemsFromLS();

    items.push({desc, time, type, value,});

    localStorage.setItem('items', JSON.stringify(items));
}

showTotalIncome();

function showTotalIncome(){
    let items = getItemsFromLS();

    let totalIncome = 0;
    for (let item of items){
        if(item.type === '+'){
            totalIncome += parseInt(item.value);  
        }

    }
        document.querySelector('.income__amount p').innerText = `Shs ${separator(totalIncome)}`;
}


showTotalExpense();

function showTotalExpense(){
    let items = getItemsFromLS();

    let totalExpense = 0;

    for (let item of items){
        if(item.type === '-'){
            totalExpense += parseInt(item.value);
        }
    }
    document.querySelector('.expense__amount p').innerText = `Shs ${separator(totalExpense)}`;
}


showTotalBalance();

function showTotalBalance(){
    let items = getItemsFromLS();
    let balance = 0;

    for (let item of items){
        if(item.type === '+'){
            balance += parseInt(item.value);
        }else{
            balance -= parseInt(item.value);
        }
    }
    document.querySelector('.balance__amount p').innerText = `Shs ${separator(balance)}`;

    if (balance >= 0){
        document.querySelector('header').className = 'green';
    }else{
        document.querySelector('header').className = 'red';
    }

}

function separator(amount){
    amount = parseInt(amount);
    return amount.toLocaleString();
}