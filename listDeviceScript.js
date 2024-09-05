var addBtn = document.querySelector(".add");
var tbody = document.querySelector("tbody");

var listAreaValue = [];

//lỗi có cách nào để lấy giá trị
function MakeRow() {
  let createRow = document.createElement("tr");
  createRow.innerHTML = `
        <td style="width: 30px;"></td>
        <td style="width: 120px;"><textarea></textarea></td>
        <td style="width: 75px;"><textarea></textarea></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 160px;"><textarea></textarea></td>
        <td style="width: 120px;"><input type="date"></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 140px;">
            <select id="status">
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
            </select></td>
        <td style="width: 90px;">
          <textarea class="inputCurrentArea"></textarea>
          <div class="suggestCurrentArea"></div>
        </td>
        <th><button class="btn btn-outline-warning d-none edit"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
            <button class="btn btn-outline-success agree"><i class="fa-solid fa-check"></i> Đồng ý</button>
            <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
        </th>`;
  tbody.appendChild(createRow);
  btnEditClicklistDevice(createRow);
  btnAcceptClicklistDevice(createRow);
  btnDeleteClick(createRow);
  addNewRow(createRow);
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
function btnEditClicklistDevice(newRow) {
  //Click Edit
  let editBtn = newRow.querySelector(".edit");
  editBtn.addEventListener("click", function () {
    this.classList.add("d-none");
    this.parentElement.querySelector(".agree").classList.remove("d-none");
    let code =
      this.parentElement.parentElement.querySelector("td:nth-of-type(2)");
    let type =
      this.parentElement.parentElement.querySelector("td:nth-of-type(3)");
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

    let codeValue = code.innerText;
    let typeValue = type.innerText;
    let serialValue = serial.innerText;
    let imeiValue = imei.innerText;
    let purchaseDateValue = purchaseDate.textContent;
    let macValue = mac.innerText;
    let statusValue = status.innerText;
    let currentAreaValue = currentArea.innerText;
    let statusString;
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

    code.innerHTML = `<textarea name="" id="">${codeValue}</textarea>`;
    type.innerHTML = `<textarea name="" id="">${typeValue}</textarea>`;
    serial.innerHTML = `<textarea name="" id="">${serialValue}</textarea>`;
    imei.innerHTML = `<textarea name="" id="">${imeiValue}</textarea>`;
    purchaseDate.innerHTML = `<input type = "date" value="${purchaseDateValue}">`;
    mac.innerHTML = `<textarea name="" id="">${macValue}</textarea>`;
    status.innerHTML = statusString;

    currentArea.innerHTML = `<textarea name="" id="">${currentAreaValue}</textarea>`;
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
      }
    });
  });
}

// Đổ dữ liệu
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/devices")
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
                <td style="width: 75px;">${item.type}</td>
                <td style="width: 140px;">${item.serial}</td>
                <td style="width: 160px;">${item.imei}</td>
                <td style="width: 120px;">${item.purchaseDate}</td>
                <td style="width: 140px;">${item.mac}</td>
                <td style="width: 140px;">${statusString}</td>
                <td style="width: 90px;">${item.currentArea}</td>
                <th><button class="btn btn-outline-warning edit"><i class="fa-regular fa-pen-to-square"></i> Sua</button>
                    <button class="btn btn-outline-success d-none agree" onclick="Update(${item.id})"><i class="fa-solid fa-check"></i> Dong y</button>
                    <button class="btn btn-outline-danger delete" onclick="DeleteDevice(${item.id})"><i class="fa-solid fa-trash"></i> Xoa</button>
                </th>`;
        tbody.appendChild(newRow);
        btnEditClicklistDevice(newRow);
        btnAcceptClicklistDevice(newRow);
        btnDeleteClick(newRow);
      });
    })
    .catch((error) => console.error("Error:", error));
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
  code.innerText = data.code;
  type.innerText = data.type;
  serial.innerText = data.serial;
  imei.innerText = data.imei;
  purchaseDate.innerText = data.purchaseDate;
  mac.innerText = data.mac;
  status.innerText = data.status;
  currentArea.innerText = data.currentArea;
}

//Update dữ liệu cột
async function Update(id) {
  try {
    const deviceInfo = document.querySelector(`.deviceID${id}`).parentElement;

    const data = {
      code: deviceInfo.querySelector("td:nth-of-type(2) textarea").value,
      type: deviceInfo.querySelector("td:nth-of-type(3) textarea").value,
      serial: deviceInfo.querySelector("td:nth-of-type(4) textarea").value,
      imei: deviceInfo.querySelector("td:nth-of-type(5) textarea").value,
      purchaseDate: deviceInfo.querySelector("td:nth-of-type(6) input").value,
      mac: deviceInfo.querySelector("td:nth-of-type(7) textarea").value,
      status: deviceInfo.querySelector("td:nth-of-type(8) select").value,
      currentArea: deviceInfo.querySelector("td:nth-of-type(9) textarea").value,
    };
    const response = await fetch(`http://localhost:8080/devices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
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
    };

    if (!id) {
      // Check if ID is empty
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
          console.log("Lỗi 5000");
          createRow.remove();
        } else if (result.code === 5001) {
          console.log("Lỗi 5001");
          createRow.remove();
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
          idCell.innerHTML = result.result.id;
          idCell.classList.add(`deviceID${result.result.id}`);
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

//VẪN CÓ LỖI CHỖ UPDATE CÓ LẼ LÀ KHÔNG TÌM THẤY ID
