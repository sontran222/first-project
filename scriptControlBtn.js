var Editbtn = document.querySelectorAll(".edit");
var Acceptbtn = document.querySelectorAll(".agree");
var Deletebtn = document.querySelectorAll(".delete");

function btnEditClick(createRow) {
  //Click Edit
  let editBtn = createRow.querySelector(".edit");
  editBtn.addEventListener("click", function () {
    this.classList.add("d-none");
    this.parentElement.querySelector(".agree").classList.remove("d-none");
    let tdElements = this.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      let currentValue = PerElement.innerText;
      PerElement.innerHTML = `<textarea name="" id="">${currentValue}</textarea>`;
    });
  });
}

function btnAcceptClick(createRow) {
  //Click Dong y
  let acceptBtn = createRow.querySelector(".agree");
  acceptBtn.addEventListener("click", function () {
    this.classList.add("d-none");
    this.parentElement.querySelector(".edit").classList.remove("d-none");
    let tdElements = this.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      if (PerElement.querySelector("textarea")) {
        let InputValue = PerElement.querySelector("textarea").value.trim();
        PerElement.innerText = InputValue;
      }
    });
    this.parentElement.querySelector(".edit").removeAttribute("disabled");
    // console.log(tdElements)
  });
}

function btnDeleteClick(createRow) {
  //click Xoa
  let deleteBtn = createRow.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    let tdElements = this.parentElement.parentElement;
    tdElements.remove();
  });
}

function ButtonFeature(createRow) {
  //Click Edit
  let editBtn = createRow.querySelector(".edit");
  editBtn.addEventListener("click", function () {
    this.classList.add("class", "d-none");
    this.parentElement.querySelector(".agree").classList.remove("d-none");
    let tdElements = this.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      let currentValue = PerElement.innerText;
      PerElement.innerHTML = `<textarea name="" id="">${currentValue}</textarea>`;
    });
  });

  //Click Dong y
  let acceptBtn = createRow.querySelector(".agree");
  acceptBtn.addEventListener("click", function () {
    this.classList.add("class", "d-none");
    this.parentElement.querySelector(".edit").classList.remove("d-none");
    let tdElements = this.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      if (PerElement.querySelector("textarea")) {
        let InputValue = PerElement.querySelector("textarea").value;
        PerElement.innerText = InputValue;
      }
    });
    this.parentElement.querySelector(".edit").removeAttribute("disabled");
  });

  //click Xoa
  let deleteBtn = createRow.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    let tdElements = this.parentElement.parentElement;
    tdElements.remove();
  });
}

Editbtn.forEach((item) => {
  item.addEventListener("click", function () {
    item.classList.add("class", "d-none");
    item.parentElement.querySelector(".agree").classList.remove("d-none");
    let tdElements = item.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      let currentValue = PerElement.innerText;
      PerElement.innerHTML = `<textarea name="" id="">${currentValue}</textarea>`;
    });
  });
});

//click dong y
Acceptbtn.forEach((item) => {
  item.addEventListener("click", function () {
    item.classList.add("class", "d-none");
    item.parentElement.querySelector(".edit").classList.remove("d-none");
    let tdElements = item.parentElement.parentElement.querySelectorAll("td");
    tdElements.forEach((PerElement) => {
      let InputValue = PerElement.querySelector("textarea").value;
      PerElement.innerText = InputValue;
    });
    item.parentElement.querySelector(".edit").removeAttribute("disabled");
  });
});

//click xoa
Deletebtn.forEach((item) => {
  item.addEventListener("click", function () {
    let tdElements = item.parentElement.parentElement;
    tdElements.remove();
  });
});
