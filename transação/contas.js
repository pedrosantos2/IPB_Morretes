const TransactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const InputValor = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage.getItem('transictions'));
let transictions = localStorage.getItem('transictions') !== null ? localStorageTransactions : [];

const remove = ID => {
    transictions = transictions.filter(transaction => transaction.id !== ID)
    uptadeLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction =>{
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const AmountSemMenos = Math.abs(transaction.amount); 
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${AmountSemMenos}</span>
    <button class="delete-btn" onClick="remove(${transaction.id})">
    x
    </button>
`

    TransactionUl.append(li)

    
   
}

const updateBalancoValor = () => {
    const transactionsAmounts = transictions
    .map(transaction => transaction.amount);
    const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
    const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value ) => accumulator + value, 0)
    ).toFixed(2);
    

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}



const init = () => {
    TransactionUl.innerHTML = '';
    transictions.forEach(addTransactionIntoDOM);
    updateBalancoValor();
}

init();

const uptadeLocalStorage = () => {
    localStorage.setItem('transictions', JSON.stringify(transictions));
}

const generateId = () => Math.round(Math.random() * 100000)

form.addEventListener('submit', evento => {
    evento.preventDefault();

    
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = InputValor.value.trim();

    if(inputTransactionName.value.trim() === '' || InputValor.value.trim() === '') {
        alert('Por favor, Preencha todos os campos!')
        return;
    }

    const transaction =  {
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }
  
    transictions.push(transaction);
    init();
    uptadeLocalStorage();

    inputTransactionName.value = ''
    InputValor.value = ''
})


