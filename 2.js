var addBtn = document.querySelector(".add")
var tbody = document.querySelector("tbody")

function MakeRow(){
    let createRow = document.createElement("tr")
    createRow.innerHTML = `
        <td style="width: 30px;"></td>
        <td style="width: 120px;"><textarea></textarea></td>
        <td style="width: 75px;"><textarea></textarea></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 160px;"><textarea></textarea></td>
        <td style="width: 120px;"><input type="date"></td>
        <td style="width: 170px;"><textarea></textarea></td>
        <td style="width: 140px;"><textarea></textarea></td>
        <td style="width: 90px;"><textarea></textarea></td>
        <th><button class="btn btn-outline-warning d-none edit"><i class="fa-regular fa-pen-to-square"></i> Sửa</button>
            <button class="btn btn-outline-success agree"><i class="fa-solid fa-check"></i> Đồng ý</button>
            <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xóa</button>
        </th>`
    tbody.appendChild(createRow)
}

//hôm sau sửa tiếp 1.js chuyển sang
//Thay đổi 1 chút btnEditClick để phù hợp
function btnEditClicklistDevice(newRow){
    //Click Edit
    let editBtn = newRow.querySelector(".edit")
    if(editBtn){
        console.log(editBtn)
    }
    editBtn.addEventListener("click", function(){
        this.classList.add("d-none")
        this.parentElement.querySelector(".agree").classList.remove("d-none")
        let code = this.parentElement.parentElement.querySelector("td:nth-of-type(2)")
        let type = this.parentElement.parentElement.querySelector("td:nth-of-type(3)")
        let serial = this.parentElement.parentElement.querySelector("td:nth-of-type(4)")
        let imei = this.parentElement.parentElement.querySelector("td:nth-of-type(5)")
        let purchaseDate = this.parentElement.parentElement.querySelector("td:nth-of-type(6)")
        let mac = this.parentElement.parentElement.querySelector("td:nth-of-type(7)")
        let status = this.parentElement.parentElement.querySelector("td:nth-of-type(8)")
        let currentArea = this.parentElement.parentElement.querySelector("td:nth-of-type(9)")

        let codeValue = code.innerText
        let typeValue = type.innerText
        let serialValue = serial.innerText
        let imeiValue = imei.innerText
        let purchaseDateValue = purchaseDate.textContent
        let macValue = mac.innerText
        let statusValue = status.innerText
        let currentAreaValue = currentArea.innerText 


        code.innerHTML = `<textarea name="" id="">${codeValue}</textarea>`
        type.innerHTML = `<textarea name="" id="">${typeValue}</textarea>`
        serial.innerHTML = `<textarea name="" id="">${serialValue}</textarea>`
        imei.innerHTML = `<textarea name="" id="">${imeiValue}</textarea>`
        purchaseDate.innerHTML = `<input type = "date" value="${purchaseDateValue}">`
        mac.innerHTML = `<textarea name="" id="">${macValue}</textarea>`
        status.innerHTML = `<textarea name="" id="">${statusValue}</textarea>`
        currentArea.innerHTML = `<textarea name="" id="">${currentAreaValue}</textarea>`  
    })
}

// Đổ dữ liệu
document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:8080/devices')
    .then(response => response.json())
    .then(data =>{
        data.forEach(item => {
            var newRow = document.createElement("tr")
            newRow.innerHTML = `
                <td style="width: 30px;" class="deviceID${item.id}">${item.id}</td>
                <td style="width: 120px;">${item.code}</td>
                <td style="width: 75px;">${item.type}</td>
                <td style="width: 140px;">${item.serial}</td>
                <td style="width: 160px;">${item.imei}</td>
                <td style="width: 120px;">${item.purchaseDate}</td>
                <td style="width: 140px;">${item.mac}</td>
                <td style="width: 140px;">${item.status}</td>
                <td style="width: 90px;">${item.currentArea}</td>
                <th><button class="btn btn-outline-warning edit" onclick=""><i class="fa-regular fa-pen-to-square"></i> Sua</button>
                    <button class="btn btn-outline-success d-none agree"><i class="fa-solid fa-check"></i> Dong y</button>
                    <button class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i> Xoa</button>
                </th>`
            tbody.appendChild(newRow)
        })
    })
    .catch(error => console.error('Error:' ,error));
})


//Nút bấm tạo thêm dòng
addBtn.addEventListener("click", function(){
    MakeRow()
})