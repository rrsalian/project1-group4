(function () {

    const transactions = [];
    budget.counter = 0;
    let myBudget = new budget(transactions);
    const main = document.getElementById("main");
    const tblContainer = document.createElement("div");
    const table = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const select = document.getElementById('expenseText');
    const expenseOptions = select.options;
    let expenseArr = [];

    table.classList.add("table");

    tblContainer.classList.add("tblContainer");
    main.appendChild(tblContainer);
    tblContainer.appendChild(table);

    let expenseOptionsArr = [];
    for (let i = 0; i < expenseOptions.length; i++) {
        expenseOptionsArr.push(expenseOptions[i].value);
    }

    const addTransactions = document.querySelectorAll(".addTransaction");
    //console.log(addTransactions);
    for (const addTransaction of addTransactions) {
        addTransaction.addEventListener('click', (e) => {
            //console.log(e.target);
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
                transactionType = "Expense";
            }
            transaction = myBudget.addTransaction(transactionType, myText, myAmount);
            expenseArr  = myBudget.getExpenseSummary(expenseOptionsArr);
            console.log(expenseArr);

            buildTable(transaction, tblContainer, table, tblBody);

            document.getElementById('budget').value = myBudget.budget;
            document.getElementById('expense').value = myBudget.expense;
            document.getElementById('balance').value = myBudget.balance;

            document.getElementById('budgetAmount').value = null;
            document.getElementById('expenseAmount').value = null;
        })
        /*
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);
        
                function drawChart() {
                
                    let data = google.visualization.arrayToDataTable([
                    ['Task', 'Hours per Day'],
                    ['Entertainment', 50],
                    ['Food',         100],
                    ['Clothing',      75],
                    ['Bills',        500],
                    ]);
                
                    let options = {
                    title: ''
                    };
                
                    let chart = new google.visualization.PieChart(document.getElementById('piechart'));
                
                    chart.draw(data, options);
                }        
        */
    }
            //Pie Chart code - JI
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        let data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Entertainment', 50], //Still need to work on the code, so these values update properly.
          ['Food',         100], //I just hardcoded ones in to see if it would work.
          ['Clothing',      75], // Anyone have any suggestions?  JI
          ['Bills',        500],
        ]);

        let options = {
          title: ''
        };

        let chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
            //End of Pie Chart code - JI

}())




function buildTable(obj, table, tblBody) {

    let row = document.createElement('tr');

    for (var val of Object.values(obj)) {
        let col = document.createElement('td');
        col.textContent = val;
        //col.style.border = "1px solid green";
        //col.style.padding = "3px";
        row.appendChild(col);
    }

    row.style.columnWidth = "20 px";
    tblBody.appendChild(row);
    table.appendChild(row);
}


//Just making notes as I think of things: 
//Does anyone know how to add that alert if they spend all their budget? JI 
//Even if it's just a pop-up alert - if(balance <= 0) and it returns an alert? JI