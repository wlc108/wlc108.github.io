// TO DO: Make it prettier! 
// Display a "Details" chart, breaking down which systems see what. Color doe it.
// e.g. some columns = BLUE = POLICY, some = GREEN = Billing, some = Orange = CHEESE NPPS



// TRY THIS SVG: M 400 150 L 250 150 L 150 150 L 100 200 L 100 300 L 150 350 L 250 350 L 300 350 L 300 450 L 350 500 L 450 500 L 650 500 L 750 500 L 800 450 L 800 200 L 750 150 L 700 150 L 400 150 

$(document).ready(function() {
    init();
   });
   

const testData = [
    ['John', 'Doe', 25],
    ['Jane', 'Doe', 32],
    ['Bob', 'Smith', 42],
  ];

const polData = [
    {
      "PolicyNumber": "55100423651",
      "Status": "Passed",
      "FailureDetails": []
    },
    {
      "PolicyNumber": "55100894512",
      "Status": "Failed",
      "FailureDetails": [
        {
          "HistoryID": "124578",
          "Type": "Endorse",
          "Date": "2022-10-15 11:30",
          "Amount": 27,
          "System": "Billing"
        }
      ]
    },
    {
      "PolicyNumber": "55100128579",
      "Status": "Passed",
      "FailureDetails": []
    },
    {
      "PolicyNumber": "55100976423",
      "Status": "Failed",
      "FailureDetails": [
        {
          "HistoryID": "896541",
          "Type": "Rewrite",
          "Date": "2022-12-22 15:45",
          "Amount": 42,
          "System": "Policy"
        }
      ]
    },
    {
      "PolicyNumber": "55100389754",
      "Status": "Passed",
      "FailureDetails": []
    },
    {
      "PolicyNumber": "55100541239",
      "Status": "Failed",
      "FailureDetails": [
        {
          "HistoryID": "357924",
          "Type": "New",
          "Date": "2022-09-03 08:20",
          "Amount": 18,
          "System": "Billing"
        }
      ]
    },
    {
      "PolicyNumber": "55100692378",
      "Status": "Failed",
      "FailureDetails": [
        {
          "HistoryID": "465123",
          "Type": "Rewrite",
          "Date": "2023-01-08 10:15",
          "Amount": 33,
          "System": "Policy"
        },
        {
          "HistoryID": "789456",
          "Type": "Cancel",
          "Date": "2023-02-28 16:30",
          "Amount": 62,
          "System": "Billing"
        }
      ]
    },
    {
      "PolicyNumber": "55100256842",
      "Status": "Passed",
      "FailureDetails": []
    }
  ];
  


function init() {
    resultsDiv = $("#results")
//    resultsDiv.text("HI!")
//    makeTable(testData)
    
//    doDataNow(polData)
    makeResults(polData)
}

function doDataNow(data) {
    for (let i = 0; i < data.length; i++) {
        const status = data[i]['Status']
        const policyNumber = data[i]['PolicyNumber']
        console.log(`${policyNumber} - ${status}`);
        if (status == "Failed") {
            const details = data[i]['FailureDetails']
            for (let j = 0; j < details.length; j++) {
                const system = details[j]['System']
                const historyId = details[j]['HistoryID']
                const type = details[j]['Type']
                const date = details[j]['Date']
                const amount = details[j]['Amount']
                console.log(` ${historyId} ${type} ${date} ${amount} ${system}  `)
            }
        }

    }
}

function makeResults(data) {
    const resultsDiv = $("#results")

    for (let i = 0; i < data.length; i++) {
        const policyNumber = data[i]['PolicyNumber']
        const status = data[i]['Status']
        console.log(`${policyNumber} - ${status}`);

        const policyDiv = $('<div></div>')
//        const h2 = $('<h2 class="results-pol"></h2>').html(policyNumber, "-", status);
        const h2 = $(`<h2 class="results-pol"><span class="policy">${policyNumber}</span> - <span class="status">${status}</span></h2>`)
        policyDiv.append(h2)

        if (status == "Passed") {
            h2.addClass('results-passed')
        }
        else {
            console.log("In else")
            h2.addClass('results-failed')
            const failureTable = makeFailureTable(data[i]['FailureDetails'])
            console.log("Fail Table: ");
            console.log(failureTable)

            policyDiv.append(failureTable)
    
        }

        


        resultsDiv.append(policyDiv)
    }




}

function  makeFailureTable(data) {
    console.log(    data)
    const table = $('<table>')
    table.append("<thead><tr><th>Source System</th><th>History ID</th><th>Date</th><th>Transaction Type</th><th>Amount</th></tr></thead>")

    const tbody = $('<tbody>')
    
    for (let i = 0; i < data.length; i++) {
        details = [data[i]['System'], data[i]['HistoryID'], data[i]['Type'], data[i]['Date'], data[i]['Amount']]
        const row = $('<tr>')
        for (let j = 0; j < details.length; j++) {
            const cell = $("<td>")
            cell.text(details[j])
            row.append(cell)
        }
        tbody.append(row)
    }

    console.log(tbody)    
    table.append(tbody)
 
    return table;
}

function makeTableq(data) {
    const table = $("<table>")
    table.append("<thead><th>")
    table.append("<td>First</td><td>Last</td><td>Number</td>")
    table.append("</th></thead><tbody>")
//    table.text("HI!!!!!")
    table.append("</tbody></table")


    $("#results").append(table)
}


function makeTable(data) {
    const resultsDiv = $("#results")
    const table = $('<table>')
//    resultsDiv.append(table)


    // header =     "<thead><th><td>First</td><td>Last</td><td>Number</td></th></thead>"
    // table.append(header)    

    table.append("<thead><tr>")
    table.append("<th>First</th><th>Last</th><th>Number</th>")
    table.append("</tr></thead>")

    
    const tbody = $('<tbody>')
    
    for (let i = 0; i < data.length; i++) {
        const row = $('<tr>')
        for (let j = 0; j < data[i].length; j++) {
            row.append($("<td>").text(data[i][j]))
        }
        tbody.append(row)
    }

    console.log(tbody)    
    table.append(tbody)
    resultsDiv.append(table)
}


const createTag = (tag, props = {}) => {
    const style = props.style;
    if (style) { delete props.style }
    const el = Object.assign(document.createElement,props);
    if (style) { Object.assign(el.style, style) }
    return el;
}