var addBtn = document.querySelector(".add");
var tbody = document.querySelector("tbody");
var listAreaValue = [];


async function MakeRow() {
  let createRow = document.createElement("tr");

  let areas = await getOnlyArea();
  let areasOption = areas
    .map((area) => `<div class="hide">${area.area}</div>`)
    .join("");
  let deviceName = ["tablet", "Barcode"];
  let deviceOption = deviceName
    .map((device) => `<div class="hide">${device}</div>`)
    .join("");
  createRow.innerHTML = `
        <td style="width: 30px;"></td>
        <td style="width: 120px;"><textarea></textarea></td>
        <td style="width: 90px;">
            <select id="statusDevice">
                <option value="Tablet">Tablet</option>
                <option value="Barcode">Barcode</option>
            </select>
        </td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 120px;"><input type="date"></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 140px;">
            <select id="status">
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
            </select></td>
        <td style="width: 90px;" class="currentArea">
          <input type="text" class="inputCurrentArea">
            <div class="suggest">
              ${areasOption}
            </div>
        </td>
        <td style"width: 170px"><textarea></textarea></td>
        <th><button class="btn btn-outline-warning d-none edit"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
            <button class="btn btn-outline-success agree"><i class="fa-solid fa-check"></i> Đồng ý</button>
            <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
        </th>`;

  tbody.appendChild(createRow);
  btnEditClicklistDevice(createRow);
  btnAcceptClicklistDevice(createRow);
  btnDeleteClick(createRow);
  addNewRow(createRow);
  addAreasToCurrentArea(
    createRow.querySelector(".currentArea").querySelector(".inputCurrentArea")
  );
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

function btnDeleteClick(createRow) {
  //click Xoa
  let deleteBtn = createRow.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    let tdElements = this.parentElement.parentElement;
    tdElements.remove();
    let id = createRow.querySelector("td:first-of-type");
    DeleteDevice(id.innerText);
  });
}

//Thay đổi 1 chút btnEditClick để phù hợp
async function btnEditClicklistDevice(newRow) {
  //Click Edit
  let areas = await getOnlyArea();
  let areasOption = areas
    .map((area) => `<div class="hide">${area.area}</div>`)
    .join("");

  let editBtn = newRow.querySelector(".edit");
  editBtn.addEventListener("click", function () {
    this.classList.add("d-none");
    this.parentElement.querySelector(".agree").classList.remove("d-none");
    let code =
      this.parentElement.parentElement.querySelector("td:nth-of-type(2)");
    let serial =
      this.parentElement.parentElement.querySelector("td:nth-of-type(4)");
    let imei =
      this.parentElement.parentElement.querySelector("td:nth-of-type(5)");
    let purchaseDate =
      this.parentElement.parentElement.querySelector("td:nth-of-type(6)");
    let mac =
      this.parentElement.parentElement.querySelector("td:nth-of-type(7)");
    let status =
      this.parentElement.parentElement.querySelector("td:nth-of-type(8)");
    let currentArea =
      this.parentElement.parentElement.querySelector("td:nth-of-type(9)");
    let note =
      this.parentElement.parentElement.querySelector("td:nth-of-type(10)");
    let codeValue = code.innerText;
    let typeString;
    let serialValue = serial.innerText;
    let imeiValue = imei.innerText;
    let purchaseDateValue = purchaseDate.textContent;
    let macValue = mac.innerText;
    let currentAreaValue = currentArea.innerText;
    let statusString;
    let noteValue = note.innerText;

    if (status.innerText == "Không hoạt động") {
      statusString = `<select id="status">
                        <option value="0">Không hoạt động</option>
                        <option value="1">Hoạt động</option>
                      </select>`;
    } else {
      statusString = `<select id="status">
        <option value="1">Hoạt động</option>
        <option value="0">Không hoạt động</option>
      </select>`;
    }

    // type.innerHTML = typeString;
    serial.innerText = serialValue;
    imei.innerHTML = imeiValue;
    purchaseDate.innerHTML = purchaseDateValue;
    mac.innerHTML = macValue;
    status.innerHTML = statusString;
    note.innerHTML = `<textarea>${noteValue}</textarea>`;

    currentArea.innerHTML = `<input type="text" class="inputCurrentArea" value="${currentAreaValue}"> 
                            <div class="suggest">
                               ${areasOption}
                            </div>`;
    addAreasToCurrentArea(currentArea.querySelector("input"));
  });
}

//Thay đổi 1 chút btnAcceptClick để phù hợp
function btnAcceptClicklistDevice(createRow) {
  //Click Dong y
  let acceptBtn = createRow.querySelector(".agree");
  acceptBtn.addEventListener("click", function () {
    this.classList.add("d-none");
    this.parentElement.querySelector(".edit").classList.remove("d-none");
    let tdElements = this.parentElement.parentElement.querySelectorAll("td");
    let id = this.parentElement.parentElement.querySelector("td:first-of-type");
    tdElements.forEach((PerElement) => {
      if (PerElement.querySelector("textarea")) {
        let InputValue = PerElement.querySelector("textarea").value.trim();
        PerElement.innerText = InputValue;
      } else if (PerElement.querySelector("input")) {
        let InputValue = PerElement.querySelector("input");
        if (InputValue) {
          PerElement.innerText = InputValue.value;
        }
      } else if (PerElement.querySelector("#status")) {
        let selectValue = PerElement.querySelector("#status");
        if (selectValue.value == 0) {
          PerElement.innerHTML = "Không hoạt động";
        } else {
          PerElement.innerHTML = "Hoạt động";
        }
      } else if (PerElement.querySelector("#statusDevice")) {
        let selectValue = PerElement.querySelector("#statusDevice");
        if (selectValue.value == "Tablet") {
          PerElement.innerHTML = "Tablet";
        } else {
          PerElement.innerHTML = "Barcode";
        }
      }
    });
  });
}

function LoadTablePage(idPageNumber) {
  tbody.innerHTML = ``;
  fetch(`http://localhost:8080/devices/tableSplit/${idPageNumber}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let statusString;
        if (item.status == 1) {
          statusString = "Hoạt động";
        } else {
          statusString = "Không hoạt động";
        }
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
                  <td style="width: 30px;" class="deviceID${item.id}">${item.id}</td>
                  <td style="width: 120px;">${item.code}</td>
                  <td style="width: 90px;">${item.type}</td>
                  <td style="width: 140px;">${item.serial}</td>
                  <td style="width: 140px;">${item.imei}</td>
                  <td style="width: 120px;">${item.purchaseDate}</td>
                  <td style="width: 140px;">${item.mac}</td>
                  <td style="width: 140px;">${statusString}</td>
                  <td style="width: 90px;">${item.currentArea}</td>
                  <td style="width: 170px">${item.note}</td>
                  <th><button class="btn btn-outline-warning edit"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
                      <button class="btn btn-outline-success d-none agree" onclick="Update(${item.id})"><i class="fa-solid fa-check"></i> Đồng ý</button>
                      <button class="btn btn-outline-danger delete" onclick="DeleteDevice(${item.id})"><i class="fa-solid fa-trash"></i> Xóa</button>
                  </th>`;

        tbody.appendChild(newRow);
        btnEditClicklistDevice(newRow);
        btnAcceptClicklistDevice(newRow);
        btnDeleteClick(newRow);
      });
    });
}
//Làm 2 việc: Tạo phân trang sau đó click
document.addEventListener("DOMContentLoaded", function () {
  var PageNumber = document.querySelector(".PageNumber");
  fetch("http://localhost:8080/devices/tableSplit")
    .then((response) => response.json())
    .then((data) => {
      LoadTablePage(data);

      for (let i = 1; i <= data; i++) {
        let spanPageNumber = document.createElement("span");
        spanPageNumber.innerText = i;
        PageNumber.appendChild(spanPageNumber);
      }
      var allSpanPageNumber = document.querySelectorAll(".PageNumber span");
      var lastIndex = data - 1;
      allSpanPageNumber[lastIndex].classList.add("active");
      allSpanPageNumber.forEach((item, index) => {
        item.addEventListener("click", function (e) {
          LoadTablePage(e.target.innerText);
          this.classList.add("active");
          if (lastIndex != index) {
            allSpanPageNumber[lastIndex].classList.remove("active");
          }

          lastIndex = index;
        });
      });
    });
});
function LoadDataWrong(deviceInfo, data) {
  let id = deviceInfo.querySelector("td:first-of-type");
  let code = deviceInfo.querySelector("td:nth-of-type(2)");
  let type = deviceInfo.querySelector("td:nth-of-type(3)");
  let serial = deviceInfo.querySelector("td:nth-of-type(4)");
  let imei = deviceInfo.querySelector("td:nth-of-type(5)");
  let purchaseDate = deviceInfo.querySelector("td:nth-of-type(6)");
  let mac = deviceInfo.querySelector("td:nth-of-type(7)");
  let status = deviceInfo.querySelector("td:nth-of-type(8)");
  let currentArea = deviceInfo.querySelector("td:nth-of-type(9)");
  let note = deviceInfo.querySelector("td:nth-of-type(10)");
  code.innerText = data.code;
  type.innerText = data.type;
  serial.innerText = data.serial;
  imei.innerText = data.imei;
  purchaseDate.innerText = data.purchaseDate;
  mac.innerText = data.mac;
  status.innerText = data.status;
  currentArea.innerText = data.currentArea;
  note.innerText = data.note;
}

//Update dữ liệu cột
async function Update(id) {
  try {
    const deviceInfo = document.querySelector(`.deviceID${id}`).parentElement;
    let code = deviceInfo.querySelector("td:nth-of-type(2)").innerText;
    let type = deviceInfo.querySelector("td:nth-of-type(3)").innerText;
    let serial = deviceInfo.querySelector("td:nth-of-type(4)").innerText;
    let imei = deviceInfo.querySelector("td:nth-of-type(5)").innerText;
    let mac = deviceInfo.querySelector("td:nth-of-type(7)").innerText;
    let status = deviceInfo.querySelector("td:nth-of-type(8) select").value;
    let currentArea = deviceInfo.querySelector("td:nth-of-type(9) input").value;
    let note = deviceInfo.querySelector("td:nth-of-type(10) textarea").value;
    console.log(status, note, currentArea);
    const data = {
      code: code,
      type: type,
      serial: serial,
      imei: imei,
      mac: mac,
      status: status,
      currentArea: currentArea,
      note: note,
    };
    const response = await fetch(`http://localhost:8080/devices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.code == 5000) {
      console.log("không bấm được button 5000");
    } else if (result.code == 5001) {
      console.log("lỗi không bấm được button 5001");
      const data = await GetOneDevice(id);
      createAlert(result.message);
      LoadDataWrong(deviceInfo, data);
    } else {
      const updatedRow = document.querySelector(`.deviceID${id}`);
      updatedRow.innerHTML = result.id;
      updatedRow.classList.add(`deviceID${result.id}`);
      btnAcceptClicklistDevice(deviceInfo);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//btn Thêm mới
async function addNewRow(createRow) {
  let agreeBtn = createRow.querySelector("th .agree");
  agreeBtn.addEventListener("click", async function () {
    const idCell = createRow.querySelector("td:first-of-type");
    const id = idCell.innerText;

    let code = createRow.querySelector("td:nth-of-type(2)").innerText;
    let type = createRow.querySelector("td:nth-of-type(3)").innerText;
    let serial = createRow.querySelector("td:nth-of-type(4)").innerText;
    let imei = createRow.querySelector("td:nth-of-type(5)").innerText;
    let purchaseDate = createRow.querySelector("td:nth-of-type(6)").innerText;
    let mac = createRow.querySelector("td:nth-of-type(7)").innerText;
    let status = createRow.querySelector("td:nth-of-type(8)").innerText;
    let currentArea = createRow.querySelector("td:nth-of-type(9)").innerText;
    let note = createRow.querySelector("td:nth-of-type(10)").innerText;
    let statusValue;
    if (status == "Không hoạt động") {
      statusValue = 0;
    } else {
      statusValue = 1;
    }
    const data = {
      code: code,
      type: type,
      serial: serial,
      imei: imei,
      purchaseDate: purchaseDate,
      mac: mac,
      status: statusValue,
      currentArea: currentArea,
      note: note,
    };

    if (!id) {
      try {
        const response = await fetch(`http://localhost:8080/devices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Save Successful:", result);

        if (result.code === 5000) {
          const deviceData = await GetOneDevice(id);
          createAlert(result.message);
          LoadDataWrong(createRow, deviceData);
          createRow.remove();
          //
        } else if (result.code === 5001) {
          const deviceData = await GetOneDevice(id);
          createAlert(result.message);
          LoadDataWrong(createRow, deviceData);
          createRow.remove();
          //
        } else {
          idCell.innerHTML = result.result.id;
          idCell.classList.add(`deviceID${result.result.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:8080/devices/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Save Successful:", result);

        if (result.code === 5000) {
          const deviceData = await GetOneDevice(id);
          createAlert(result.message);
          LoadDataWrong(createRow, deviceData);
          console.log("Lỗi 5000");
        } else if (result.code === 5001) {
          const deviceData = await GetOneDevice(id);
          createAlert(result.message);
          console.log(deviceData);
          LoadDataWrong(createRow, deviceData);
          console.log("Lỗi 5001");
        } else {
          idCell.innerHTML = result.id;
          idCell.classList.add(`deviceID${result.id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
}

//Delete dữ liệu cột
function DeleteDevice(id) {
  fetch(`http://localhost:8080/devices/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response)
    .then((result) => {
      console.log("Delete Successful:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Nút bấm tạo thêm dòng
addBtn.addEventListener("click", function () {
  MakeRow();
});

async function GetOneDevice(id) {
  const response = await fetch(`http://localhost:8080/devices/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

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

function chooseArea(input, item) {
  item.addEventListener("click", function () {
    input.value = item.innerText;
    item.classList.add("hide");
    item.parentElement.classList.add("hide");
  });
}

function addAreasToCurrentArea(input) {
  let suggests = input.parentElement
    .querySelector(".suggest")
    .querySelectorAll("div");
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
