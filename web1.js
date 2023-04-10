const queryButton = document.querySelector(".btn-primary");
queryButton.addEventListener("click", function() {
  const policyTextarea = document.querySelector("#policy-text-area");
  const checkbox1 = document.querySelector("#checkbox1");
  const checkbox2 = document.querySelector("#checkbox2");
  const checkbox3 = document.querySelector("#checkbox3");
  const checkbox4 = document.querySelector("#checkbox4");
  const checkbox5 = document.querySelector("#checkbox5");

  const policyNumbers = policyTextarea.value.split("\n");
  const data = {
    policies: policyNumbers,
    checkbox1: checkbox1.checked,
    checkbox2: checkbox2.checked,
    checkbox3: checkbox3.checked,
    checkbox4: checkbox4.checked,
    checkbox5: checkbox5.checked
  };

  fetch("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      const resultsTextarea = document.querySelector("#results");
      resultsTextarea.value = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

