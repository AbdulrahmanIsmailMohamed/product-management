let title = document.getElementById("title");
let total = document.getElementById("total");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let submit = document.getElementById("submit");
let local = document.getElementById("local");
let mood = "create";
let temp;
/** getTitle */
function getTitle() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.backgroundColor = "green"
    } else {
        // price.value=""
        total.innerHTML = ""
        total.style.backgroundColor = "#e92d2d";
    }
}

/** creat product */
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}
submit.onclick = function () {
    inputData = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != "" && category.value != "" && price.value != "" && count.value < 100) {
        if (mood === "create") {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataProduct.push(inputData)
                }
            } else {
                dataProduct.push(inputData)
            }

        } else {
            dataProduct[temp] = inputData;
            mood = "create";
            count.style.display = "block";
            submit.innerHTML = "Create";
        }
        clear();
    }
    localStorage.setItem("product", JSON.stringify(dataProduct))
    readData();
    getTitle();
}

/** Delete Local Storge */
local.onclick = function () {
    localStorage.clear()
    clear()
    search.value = ""
    location.reload();
}

/** clear all inputs */
function clear() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

/** Read */
function readData() {
    let table = "";
    let i;
    for (i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="update( ${i} )" id="update">Update</button></td>
            <td> <button onclick="deleteItem( ${i} )" id="delete">Delete</button></td>
        </tr> `;
    };
    document.getElementById("table").innerHTML = table;

    let btnDe = document.getElementById("deleteAll")
    if (dataProduct.length > 0) {
        btnDe.innerHTML = `
        <button onclick="deleteAll()"  >Delete All (${i})</button>
        `;
    } else {
        btnDe.innerHTML = "";
    }
}
readData()

/** Delete item */
function deleteItem(i) {
    dataProduct.splice(i, 1)
    localStorage.product = JSON.stringify(dataProduct)
    readData()
}

/** delete all */
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    readData()
}

/** update */
function update(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    submit.innerHTML = "Update";
    count.style.display = "none";
    mood = "update";
    temp = i;
    getTitle();
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

/** search */
let searchMood = "title"
let btn = document.getElementById("search")
console.log(btn);
function getSearch(id) {
    if (id == "searchTitle") {
        searchMood = "title";
        btn.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        btn.placeholder = "Search By Category";
    }
    btn.focus();
    search.value = "";
    readData()
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == "title") {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="update( ${i} )" id="update">Update</button></td>
                    <td> <button onclick="deleteItem( ${i} )" id="delete">Delete</button></td>
                </tr> `;
            }
        } else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="update( ${i} )" id="update">Update</button></td>
                    <td> <button onclick="deleteItem( ${i} )" id="delete">Delete</button></td>
                </tr> `;
            }

        }
    }
    document.getElementById("table").innerHTML = table;
}
