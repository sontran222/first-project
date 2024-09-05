//Không cho phép AreaCode thay đổi
function NotChangeAreaCode() {
  var Editbtn = document.querySelectorAll(".edit");
  Editbtn.forEach((item) => {
    item.addEventListener("click", function () {
      var STT = item.parentElement.parentElement.querySelector(
        "tbody tr td:first-of-type"
      );
      if (STT.querySelector("textarea")) {
        STT.innerHTML = STT.querySelector("textarea").innerHTML;
      }
      var codeArea = item.parentElement.parentElement.querySelector(
        "tbody tr td:nth-of-type(2)"
      );
      if (codeArea.querySelector("textarea")) {
        codeArea.innerHTML = codeArea.querySelector("textarea").innerHTML;
      }
    });
  });
}
//Đổ dữ liệu ra bảng
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/areas")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var newRow = document.createElement("tr");
        newRow.innerHTML = `
                  <td style="width: 300px;">${item.id}</td>
                  <td style="width: 300px;">${item.area}</td>
                  <td style="width: 300px;" class="pic${item.id}">${item.pic}</td>
                  <th><button class="btn btn-outline-warning edit")"><i class="fa-regular fa-pen-to-square" ></i> Sửa</button>
                      <button class="btn btn-outline-success d-none agree" onclick="ChangePic(${item.id})"><i class="fa-solid fa-check"></i> Đồng ý</button>
                  </th>
              `;
        document.querySelector("tbody").appendChild(newRow);
        btnEditClick(newRow);
        btnAcceptClick(newRow);
      });
      NotChangeAreaCode();
    })
    .catch((error) => console.error("Error:", error));
});

//Update dữ liệu cột Pic
function ChangePic(id) {
  var aPicData = document
    .querySelector(`.pic${id}`)
    .querySelector("textarea").value;
  data = { pic: aPicData };
  fetch(`http://localhost:8080/areas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Save Successful:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
