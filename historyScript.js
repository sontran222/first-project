var Addbtn = document.querySelector(".add");
var tbody = document.querySelector("tbody");

async function MakeRow() {
  let createRow = document.createElement("tr");

  let getDevices = await GetOnlyDevices();
  let getDevicesOption = getDevices
    .map((device) => `<div class="hide">${device.code}</div>`)
    .join("");
  createRow.innerHTML = `
        <td style="width: 30px;"></td>
        <td style="width: 100px;"><input type="date"></td>
        <td style="width: 120px;" class="currentArea">
            <input type="text" class="inputCurrentArea">
            <div class="suggestCurrentArea">
              ${getDevicesOption}
            </div>
        </td>
        <td style="width: 115px;"><textarea></textarea></td>
        <td style="width: 115px;"><textarea></textarea></td>
        <td style="width: 230px;"><textarea></textarea></td>
        <td style="width: 260px;"><textarea></textarea></td>
        <th><button class="btn btn-outline-success agree"><i class="fa-solid fa-check"></i> Đồng ý</button>
            <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
        </th>`;
  tbody.appendChild(createRow);
  agreeClick(createRow);
  deleteClick(createRow);
  addNewRow(createRow);
  deleteFetch(createRow);
  console.log(createRow.querySelector(".inputCurrentArea"));
  addDevicesToCurrentDevice(createRow.querySelector(".inputCurrentArea"));
}

//Click Dong y(Chỉ hiện thị ở phần ngoài màn hình)
//Không có phần id
function agreeClick(createRow) {
  let agreebtn = createRow.querySelector(".agree");
  let td = createRow.querySelectorAll("td");

  let date = createRow.querySelector("td:nth-of-type(2) input");
  let code = createRow.querySelector("td:nth-of-type(3) input");
  let personLend = createRow.querySelector("td:nth-of-type(4) textarea");
  let personReceive = createRow.querySelector("td:nth-of-type(5) textarea");
  let currentArea = createRow.querySelector("td:nth-of-type(6) textarea");
  let note = createRow.querySelector("td:nth-of-type(7) textarea");

  agreebtn.addEventListener("click", function () {
    td[1].innerText = date.value;
    td[2].innerText = code.value;
    td[3].innerText = personLend.value;
    td[4].innerText = personReceive.value;
    td[5].innerText = currentArea.value;
    td[6].innerText = note.value;
    agreebtn.remove();
  });
}

//Click chỉ có tác dụng ở ngoài màn hình
//Không có tác động vào phần backend
function deleteClick(createRow) {
  //click Xoa
  let deleteBtn = createRow.querySelector("th .delete");
  deleteBtn.addEventListener("click", function () {
    let tdElements = this.parentElement.parentElement;
    tdElements.remove();
  });
}

//Click add
Addbtn.addEventListener("click", function () {
  MakeRow();
});

//addNewRow có tương tác với backend tạo ra dòng mới
async function addNewRow(createRow) {
  let agreeBtn = createRow.querySelector("th .agree");
  agreeBtn.addEventListener("click", async function () {
    let td = createRow.querySelectorAll("td");
    let date = createRow.querySelector("td:nth-of-type(2)");
    let code = createRow.querySelector("td:nth-of-type(3)");
    let personLend = createRow.querySelector("td:nth-of-type(4)");
    let personReceive = createRow.querySelector("td:nth-of-type(5)");
    let currentArea = createRow.querySelector("td:nth-of-type(6)");
    let note = createRow.querySelector("td:nth-of-type(7)");

    const data = {
      date: date.innerText,
      code: code.innerText,
      personLend: personLend.innerText,
      personReceive: personReceive.innerText,
      note: note.innerText,
      currentArea: currentArea.innerText,
    };

    try {
      const response = await fetch(`http://localhost:8080/histories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
}

//Thực hiện thêm 1 dòng
async function addNewRow(createRow) {
  let agreeBtn = createRow.querySelector("th .agree");
  agreeBtn.addEventListener("click", async function () {
    let td = createRow.querySelectorAll("td");
    let id = createRow.querySelector("td:first-of-type");
    let date = createRow.querySelector("td:nth-of-type(2)");
    let code = createRow.querySelector("td:nth-of-type(3)");
    let personLend = createRow.querySelector("td:nth-of-type(4)");
    let personReceive = createRow.querySelector("td:nth-of-type(5)");
    let currentArea = createRow.querySelector("td:nth-of-type(6)");
    let note = createRow.querySelector("td:nth-of-type(7)");

    const data = {
      date: date.innerText,
      code: code.innerText,
      personLend: personLend.innerText,
      personReceive: personReceive.innerText,
      note: note.innerText,
      currentArea: currentArea.innerText,
    };

    try {
      const response = await fetch(`http://localhost:8080/histories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      let dt = result.result;

      id.innerText = dt.id;
      date.innerText = dt.date;
      code.innerText = dt.code;
      personLend.innerText = dt.personLend;
      personReceive.innerText = dt.personReceive;
      note.innerText = dt.note;
      currentArea.innerText = dt.currentArea;
    } catch (error) {
      console.log(error);
    }
  });
  deleteFetch(createRow);
}

async function deleteFetch(createRow) {
  let deleteBtn = createRow.querySelector("th .delete");
  deleteBtn.addEventListener("click", async function () {
    try {
      let id = createRow.querySelector("td:first-of-type").innerText;
      const res = await fetch(`http://localhost:8080/histories/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  });
}

//Đổ dữ liệu
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/histories")
    .then((response) => response.json())
    .then((data) => {
      data.result.forEach((item) => {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td style="width: 30px;" class="${item.id}">${item.id}</td>
          <td style="width: 100px;">${item.date}</td>
          <td style="width: 120px;">${item.code}</td>
          <td style="width: 115px;">${item.personLend}</td>
          <td style="width: 115px;">${item.personReceive}</td>
          <td style="width: 230px;">${item.note}</td>
          <td style="width: 260px;">${item.currentArea}</td>
          <th>
              <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
          </th>`;
        tbody.appendChild(newRow);
        deleteFetch(newRow);
        deleteClick(newRow);
      });
    })
    .catch((error) => console.error("Error:", error));
});

async function GetOnlyDevices() {
  const response = await fetch("http://localhost:8080/devices/only-codes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

//
function chooseArea(input, item) {
  item.addEventListener("click", function () {
    input.value = item.innerText;
    item.classList.add("hide");
    item.parentElement.classList.add("hide");
  });
}

function addDevicesToCurrentDevice(input) {
  let suggests = input.parentElement
    .querySelector(".suggestCurrentArea")
    .querySelectorAll("div");
  input.addEventListener("input", function (e) {
    if (e.target.value.trim() === "") {
      suggests.forEach((item) => {
        item.classList.add("hide");
      });
    } else {
      suggests.forEach((item) => {
        console.log(item);
        if (
          item.innerText
            .toUpperCase()
            .includes(e.target.value.trim().toUpperCase())
        ) {
          item.classList.remove("hide");
          item.parentElement.classList.remove("hide");
          chooseArea(input, item);
        } else {
          item.classList.add("hide");
        }
      });
    }
  });
}
