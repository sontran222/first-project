async function LoadCount() {
  const response = await fetch("http://localhost:8080/devices/counts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
//Đổ dữ liệu ra bảng
document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("http://localhost:8080/areas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  let dataCount = await LoadCount();
  console.log(dataCount);
  data.forEach((item) => {
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
                      <td style="width: 180px;">${item.id}</td>
                      <td style="width: 180px;" class="area">${item.area}</td>
                      <td style="width: 170px;" class="tablet"></td>
                      <td style="width: 320px;" class="barcode"></td>
                  `;
    document.querySelector("tbody").appendChild(newRow);
  });

  let areas = document.querySelector("tbody").querySelectorAll(".area");
  dataCount.forEach((count) => {
    areas.forEach((area) => {
      if (area.innerText == count.area) {
        let tablet = area.parentElement.querySelector(".tablet");
        tablet.innerText = count.tablet;
        let brc = area.parentElement.querySelector(".barcode");
        brc.innerText = count.barcode;
      }
    });
  });
});
