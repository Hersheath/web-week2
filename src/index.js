import "./styles.css";

//  Get the table andz form elements
const table = document.getElementById("user-table");
const userform = document.getElementById("user-form");

//get and add eventlistener to submit-data button
const submitDataButton = document.getElementById("submit-data");
submitDataButton.addEventListener("click", function () {
  const username = document.getElementById("input-username").value;
  const email = document.getElementById("input-email").value;
  const address = document.getElementById("input-address").value;
  const admin = document.getElementById("input-admin").checked;
  // error fiexed by chatgpt
  const fileInput = document.getElementById("input-image");
  const uploadedImage =
    fileInput && fileInput.files && fileInput.files.length > 0
      ? fileInput.files[0]
      : null;

  //check if username exists already. (enlightened by chatgpt)
  const usernameExist = Array.from(table.rows).some(
    (row) => row.cells[0].textContent === username
  );

  if (usernameExist) {
    //if exists, make modifications on original row
    Array.from(table.rows).forEach((row) => {
      if (row.cells[0].textContent === username) {
        row.cells[1].textContent = email;
        row.cells[2].textContent = address;
        row.cells[3].textContent = admin ? "X" : "-";
        if (uploadedImage) {
          const imageCell = row.cells[4];
          const image = imageCell.querySelector("img");
          image.src = URL.createObjectURL(uploadedImage);
        }
      }
    });
  } else {
    //if not exists, create a new row
    const newRow = table.insertRow(-1);
    newRow.insertCell(0).textContent = username;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = address;
    newRow.insertCell(3).textContent = admin ? "X" : "-";

    const image = document.createElement("img");
    if (uploadedImage) {
      // if there is a image file uploaded.
      image.src = URL.createObjectURL(uploadedImage);
      URL.revokeObjectURL(uploadedImage); // Release the object URL after use
      image.width = 64;
      image.height = 64;
      newRow.insertCell(4).appendChild(image);
    }
  }
  userform.reset(); //empty form
});

//add eventlistener to empty table button
const emptyTableButton = document.getElementById("empty-table");
emptyTableButton.addEventListener("click", function () {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  userform.reset();
});
