var Addbtn = document.querySelector(".add");
var tbody = document.querySelector("tbody");

async function MakeRow() {
  let createRow = document.createElement("tr");
  let getDevices = await GetOnlyDevices();
  let GetOnlyArea = await getOnlyArea();
  let getDevicesOption = getDevices
    .map((device) => `<div class="hide">${device.code}</div>`)
    .join("");
  let getAreaOption = GetOnlyArea.map(
    (area) => `<div class="hide">${area.area}</div>`
  ).join("");

  createRow.innerHTML = `
        <td style="width: 30px;"></td>
        <td style="width: 100px;"><input type="date"></td>
        <td style="width: 120px;" class="currentArea">
            <input type="text" class="inputCurrentArea">
            <div class="suggest">
              ${getDevicesOption}
            </div>
        </td>
        <td style="width: 115px;"><textarea></textarea></td>
        <td style="width: 115px;"><textarea></textarea></td>
        <td style="width: 230px;" class="currentArea">
            <input type="text" class="inputCurrentArea last">
            <div class="suggest">
              ${getAreaOption}
            </div>
        </td>
        <td style="width: 260px;"><textarea></textarea></td>
        <th><button class="btn btn-outline-success agree"><i class="fa-solid fa-check"></i> Đồng ý</button>
            <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
        </th>`;
  tbody.appendChild(createRow);
  agreeClick(createRow);
  deleteClick(createRow);
  addNewRow(createRow);
  deleteFetch(createRow);
  addDevicesToCurrentDevice(createRow.querySelector(".inputCurrentArea"));
  addDevicesToCurrentDevice(createRow.querySelector(".inputCurrentArea.last"));
}

function createAlert(message) {
  let createPopupAlert = document.createElement("div");
  createPopupAlert.classList.add("popUp");
  createPopupAlert.innerHTML = `
            ${message}
            <span class="borderBottom"></span>
  `;
  let popups = document.querySelector(".popUps");
  popups.appendChild(createPopupAlert);

  setInterval(function () {
    createPopupAlert.style.animation = "comeOut 6s ease";
  }, 8000);

  setInterval(function () {
    createPopupAlert.remove();
  }, 12000);
}
// //Click Dong y(Chỉ hiện thị ở phần ngoài màn hình)
function agreeClick(createRow) {
  let agreebtn = createRow.querySelector(".agree");
  let td = createRow.querySelectorAll("td");
  let date = createRow.querySelector("td:nth-of-type(2) input");
  let code = createRow.querySelector("td:nth-of-type(3) input");
  let personLend = createRow.querySelector("td:nth-of-type(4) textarea");
  let personReceive = createRow.querySelector("td:nth-of-type(5) textarea");
  let currentArea = createRow.querySelector("td:nth-of-type(6) input");
  let note = createRow.querySelector("td:nth-of-type(7) textarea");

  agreebtn.addEventListener("click", function () {
    if(!code.value || !personLend.value || !personReceive.value || !currentArea.value){
      if(!code.value){
        createAlert("không được để trống mã máy")
      }
      if(!personLend.value){
        createAlert("không được để trống người mượn")
      }
      if(!personReceive.value){
        createAlert("không được để trống người nhận")
      }
      if(!currentArea.value){
        createAlert("không được để trống khu vực")
      }
    }
    else{
      td[1].innerText = date.value;
      td[2].innerText = code.value;
      td[3].innerText = personLend.value;
      td[4].innerText = personReceive.value;
      td[5].innerText = currentArea.value;
      td[6].innerText = note.value;
      agreebtn.remove();
    }
    })


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
// async function addNewRow(createRow) {
  // let agreeBtn = createRow.querySelector("th .agree");
  // agreeBtn.addEventListener("click", async function () {
  //   let td = createRow.querySelectorAll("td");
  //   let date = createRow.querySelector("td:nth-of-type(2)");
  //   let code = createRow.querySelector("td:nth-of-type(3)");
  //   let personLend = createRow.querySelector("td:nth-of-type(4)");
  //   let personReceive = createRow.querySelector("td:nth-of-type(5)");
  //   let currentArea = createRow.querySelector("td:nth-of-type(6)");
  //   let note = createRow.querySelector("td:nth-of-type(7)");
  //   const data = {
  //     date: date.innerText,
  //     code: code.innerText,
  //     personLend: personLend.innerText,
  //     personReceive: personReceive.innerText,
  //     note: note.innerText,
  //     currentArea: currentArea.innerText,
  //   };
  //   console.log(data);
  //   console.log(104)

  //   try {
  //     const response = await fetch(`http://localhost:8080/histories`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
// }



//Thực hiện thêm 1 dòng
async function addNewRow(createRow) {
  let agreeBtn = createRow.querySelector("th .agree");
  let id = createRow.querySelector("td:nth-of-type(1)");
  let date = createRow.querySelector("td:nth-of-type(2)");
  let code = createRow.querySelector("td:nth-of-type(3)");
  let personLend = createRow.querySelector("td:nth-of-type(4)");
  let personReceive = createRow.querySelector("td:nth-of-type(5)");
  let currentArea = createRow.querySelector("td:nth-of-type(6)");
  let note = createRow.querySelector("td:nth-of-type(7)");
  agreeBtn.addEventListener("click", async function () {
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
        console.log(result)
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
    let code =
      deleteBtn.parentElement.parentElement.querySelector(
        "td:nth-of-type(3)"
      ).innerText;
    deleteBtn.addEventListener("click", returnCurrentArea(code));
  });
}

//Create Page and choose Page
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/histories/PageNumber")
    .then((response) => response.json())
    .then((data) => {
      var PageNumber = document.querySelector(".PageNumber");
      LoadTablePage(data);
      for (let i = 1; i <= data; i++) {
        var spanNumber = document.createElement("span");
        spanNumber.innerHTML = i;
        PageNumber.append(spanNumber);
      }

      let spanNumbers = document.querySelectorAll(".PageNumber span");
      let lastIndex = data - 1;
      spanNumbers[lastIndex].classList.add("active");
      spanNumbers.forEach((item, index) => {
        item.addEventListener("click", function (e) {
          LoadTablePage(e.target.innerText);
          item.classList.add("active");
          if (lastIndex != index) {
            spanNumbers[lastIndex].classList.remove("active");
          }

          lastIndex = index;
        });
      });
    })
    .catch((error) => console.error("Error:", error));
});

//Đổ dữ liệu
function LoadTablePage(idPageNumber) {
  tbody.innerHTML = "";
  fetch(`http://localhost:8080/histories/PageNumber/${idPageNumber}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td style="width: 30px;" class="${item.id}">${item.id}</td>
            <td style="width: 100px;">${item.date}</td>
            <td style="width: 120px;">${item.code}</td>
            <td style="width: 115px;">${item.personLend}</td>
            <td style="width: 115px;">${item.personReceive}</td>
            <td style="width: 260px;">${item.currentArea}</td>
            <td style="width: 230px;">${item.note}</td>
            <th>
                <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
            </th>`;
        tbody.appendChild(newRow);
        deleteFetch(newRow);
        deleteClick(newRow);
      });
    })
    .catch((error) => console.error("Error:", error));
}

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

//Lấy only area
async function getOnlyArea() {
  const response = await fetch("http://localhost:8080/areas/only-areas", {
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
  let parentInput = input.parentElement.querySelector(".suggest");
  let suggests = parentInput.querySelectorAll("div");
  input.addEventListener("input", function (e) {
    if (e.target.value.trim() === "") {
      suggests.forEach((item) => {
        item.classList.add("hide");
      });
    } else {
      suggests.forEach((item) => {
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

function returnCurrentArea(code) {
  try {
    const data = fetch(
      `http://localhost:8080/histories/returnCurrentArea/${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
