      //Đổ dữ liệu ra bảng
      document.addEventListener('DOMContentLoaded', function() {
      fetch('http://localhost:8080/areas')
          .then(response => response.json())
          .then(data => {
              data.forEach(item => {
                  var newRow = document.createElement("tr")
                  newRow.innerHTML = `
                      <td style="width: 180px;">${item.id}</td>
                      <td style="width: 180px;">${item.area}</td>
                      <td style="width: 170px;"></td>
                      <td style="width: 320px;"></td>
                      <td style="width: 190px;"></td>
                  `
                  document.querySelector("tbody").appendChild(newRow) 
              })              
          })
          .catch(error => console.error('Error:', error));
  });