class budget {
    budget = 0;
    expense = 0;
    balance = 0;
    transactions = [];

    constructor(transactions) {
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
        return transaction;
    }

    deleteTransaction(id) {
        const index = this.transactions.find(element => element.id = id);
        this.transactions.splice(index, 1);
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
            categoryArr.push({text:array[i], total:total});
        }       
        return categoryArr;
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