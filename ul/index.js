// TODO:


"use strict";

$(function () {
  $(".sort-arrow-up").on("click", function(e) {
    //let columnName = e.currentTarget.parentElement.firstElementChild.innerText;  
    let columnName = $(e.currentTarget.parentElement).find(">:first-child").text();
    sortTableBody(columnName, "asc");
    setSortIndicator(e.currentTarget);
  });

  $(".sort-arrow-down").on("click", function(e) {
    let columnName = e.currentTarget.parentElement.firstElementChild.innerText;  
    sortTableBody(columnName, "desc");
    setSortIndicator(e.currentTarget);
  });


});

// Sorts a body given a column name (header)
// Uses bubble sort.
// I'd appreciate any feedback on this function (and helper) or how
// I could have accomplished this better.
function sortTableBody(columnName, sortType="asc") {
  const colIndex = findColumnIndexByName(columnName);
  console.log(colIndex);

  let fullPassSorted = false;
  while (!fullPassSorted) {
    // Set the sentinel variable to true, in assumption it is all in order
    fullPassSorted = true;

    let rows = $("table tbody tr");
    let numRows = rows.length;
    
    for (let i = 0; i < numRows - 1; i++) {
      let currentCell = rows[i].cells[colIndex];
      let nextCell = rows[i + 1].cells[colIndex];
      if (cellsNeedSwap(currentCell, nextCell, sortType)) {

        // Swap the two rows
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);

        // Set the sentinel to false since we did a swap this iteration
        fullPassSorted = false;
      }
    }
  }
}

// Checks if cells need to be swapped
// Returns 1 if the cells should be swapped based on the sort criteria
function cellsNeedSwap(cellOne, cellTwo, compareType = "asc") {
  // I can add different types to handle strings or numbers, or links, or whatever if needed.
  switch (compareType) {
    case "asc":
      return cellOne.innerText.toUpperCase() > cellTwo.innerText.toUpperCase() ? 1 : 0;

    case "desc":
      return cellOne.innerText.toUpperCase() < cellTwo.innerText.toUpperCase() ? 1 : 0;
  }
  
}

function setSortIndicator(sortedByIcon) {
  // Remove the solid indicator type from any that have it
  $("table thead th span").removeClass("fas");
  
  // add the solid indicator type for the appropriate icon
  $(sortedByIcon).addClass("fas");

}

// Finds a column's index in the table by the column's name/heading.
// It assumes each column will have a unique name.
function findColumnIndexByName(colName) {
  let headings = $("table thead tr th .table-heading");    
  let numHeadings = headings.length;
  for (let i = 0; i < numHeadings; i++) {
    if (headings[i].textContent === colName) {       
      return i; // Found it.  Return the index immediately
    }
  }

  return -1; // Couldn't find it.
}
