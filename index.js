document.querySelector('#ewallet-form').addEventListener('submit', function
(e){
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

    console.log(type, desc, value);

    const newHtml = `
    <div class="collection">
        <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${desc}</p>
            </div>
            <div class="item-time">
              <p>13 Sep, 10:45 AM</p>
            </div>
          </div>
          <div class="item-amount expense-amount">
            <p>${type}$${value}</p>
          </div>
        </div>
    </div>
    `;

    const collection = document.querySelector('.collection');

    collection.insertAdjacentHTML('afterbegin', newHtml);
})

