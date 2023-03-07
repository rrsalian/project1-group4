class budget {
    budget = 0;
    expense = 0;
    balance = 0;
    transactions = [];   // array of objects

    constructor(transactions) {  // initialize the object
        this.transactions;
    }

    addTransaction(category, text, amount) {
        let transaction = {};
        transaction.id = ++budget.counter;
        transaction.category = category;
        transaction.text = text;
        transaction.amount = amount;
        this.transactions.push(transaction);
        this.updateValues();
        return transaction;  //  {id: 2, category: 'Expense', text: 'Entertainment', amount: 20}
    }

    deleteTransaction(id) {
        const index = this.transactions.findIndex(element => element.id = +id);
        this.transactions.splice(index, 1);  // remove an expense/budge from the transactions
        this.updateValues();
    }

    getSumByCategory(array) {
        let categoryArr = [];
        const elements = this.transactions;
        let arrObjs = [];
        let total = 0;

        for(let i = 0 ; i < array.length; i++) {
            arrObjs = elements.filter( element => element.text === ''? element.category === array[i]: element.text === array[i]);
            
            total = arrObjs.reduce( (a,b) => {
                return a + b.amount;
            },0);
            total = parseFloat(total).toFixed(2);
            categoryArr.push({text:array[i], total:total});  // this will be used in the graph
        }       
        return categoryArr;  
        /*
            Summary by Category - 
            [{text: 'Entertainment', total: '29.65'},
             {text: 'Food', total: '54.59'},
             {text: 'Clothing', total: '57.11'},
             {text: 'Bills', total: '106.12'}]
        */
    }

    updateValues() {
        let budgetAmt = 0;
        let expenseAmt = 0;

        for (const transaction of this.transactions) {
            if (transaction.category === "budget")
                budgetAmt = budgetAmt + transaction.amount;
            else
                expenseAmt = expenseAmt + transaction.amount;
        }
                
        this.budget = parseFloat(budgetAmt).toFixed(2)
        this.expense = parseFloat(expenseAmt).toFixed(2);
        this.balance = budgetAmt - expenseAmt;
    }
}