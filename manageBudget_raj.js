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
        return transaction;   
    }

    deleteTransaction(id) {
        const index = this.transactions.find(element => element.id = id);
        this.transactions.splice(index,1);
    }

    updateValues() {
        let budgetAmt = 0;
        let expenseAmt = 0;

        for (const transaction of this.transactions) {
            console.log(transaction.category);
            if (transaction.category === "Budget") 
                budgetAmt = budgetAmt + transaction.amount;
            else
                expenseAmt = expenseAmt + transaction.amount;            
        }      
        
        this.budget  = budgetAmt;
        this.expense = expenseAmt;
        this.balance = budgetAmt - expenseAmt;
    }
}