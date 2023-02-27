(function () {

    const transactions = [];
    budget.counter = 0;
    let myBudget = new budget(transactions);
    const mainContainer = document.getElementById("mainContainer");
    const tblContainer = document.createElement("div");
    const table = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tblContainer.classList.add("tblContainer");

    mainContainer.appendChild(tblContainer);
    tblContainer.appendChild(table);

    const addTransactions = document.querySelectorAll(".addTransaction");
    console.log(addTransactions);
    for (const addTransaction of addTransactions) {
        addTransaction.addEventListener('click', (e) => {
            console.log(e.target);
            let transaction = {};
            let myText = "";
            let myAmount = 0;
            let transactionType = "";

            if (e.target.name === "addBudget") {
                myAmount = +document.getElementById('budgetAmount').value;
                transactionType = "Budget";
            }
            else {
                myText = document.getElementById('expenseText').value;
                myAmount = +document.getElementById('expenseAmount').value;
                transactionType = "Entertainment";
            }

            transaction = myBudget.addTransaction(transactionType, myText, myAmount);

            buildTable(transaction, tblContainer, table, tblBody);
        })
    }
}())

function buildTable(obj, table, tblBody) {

    let row = document.createElement('tr');

    for (var val of Object.values(obj)) {
        let col = document.createElement('td');
        col.textContent = val;
        col.style.border = "1px solid green";
        col.style.padding = "10px";
        row.appendChild(col);
    }

    row.style.columnWidth = "20 px";
    tblBody.appendChild(row);
    table.appendChild(row);
}