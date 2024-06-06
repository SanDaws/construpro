//server 
const link = 'http://localhost:3000/'
//catch the sessionstorage and delete it
const filt = sessionStorage.getItem('filter')
console.log(filt);
sessionStorage.removeItem('filter')
loaderList(filt)
//user info located in local storage
const usertype = localStorage.getItem('usertype')

// loading list
async function loaderList(filt) {

    if (filt != null) {
        await filtered(filt)

    } else {
        await unfiltered()
    }
}

//if not user storage has been recieved
async function unfiltered() {
    const tools = await fetch(`${link}tools`)
    const equipment = await fetch(`${link}equipment`)
    const material = await fetch(`${link}material`)
    const toolsresponse = await tools.json()
    const equipmentresponse = await equipment.json()
    const materialresponse = await material.json()
    const totalInventor = toolsresponse.concat(equipmentresponse, materialresponse)
    display(totalInventor)

}

//if  user storage has been recieved
async function filtered(filt) {
    const listElement = await fetch(`${link}${filt}`)
    const response = await listElement.json()
    display(response)


}

function display(array) {// print the new array
    tbody.innerHTML=''
    if (usertype == 'admin'){
    array.forEach(itm => {
        tbody.innerHTML += `
        <tr>
            <td>${itm.product_name}</td>
            <td class="h-25 object-fit-cover"><img  src="${itm.img}" alt="${itm.product_name}"></td>
            <td>${itm.unitary_price}</td>
            <td>${itm.storage_unit}</td>
            <td>${itm.description}</td>
            <td>
            <button type="button" item-id="${itm.id}" item-table="${itm.table}" class="btn btn-danger">edelete</button>
            <button type="button" item-id="${itm.id}" item-table="${itm.table}" class="btn btn-warning">edit</button>
            
            </td>
        </tr>
        
        `
        });

    }else{
        array.forEach(itm => {
            tbody.innerHTML += `
            <tr>
                <td>${itm.product_name}</td>
                <td class="h-25 object-fit-cover"><img  src="${itm.img}" alt="${itm.product_name}"></td>
                <td>${itm.unitary_price}</td>
                <td>${itm.storage_unit}</td>
                <td>${itm.description}</td>
            </tr>
            
            `
            });
    }
}
/*{
    product_name:
    img:
    unitary_price:
    storage_unit:
    description:

}*/
function newElement(produc, img, price, unit, desc,table) {
    const newItem = {
        product_name: produc.value,
        img: img.value,
        table:table.value,
        unitary_price: price.value,
        storage_unit: unit.value,
        description: desc.value,

    }
    return newItem

}


//loading  fomrmularies
if (usertype == 'admin') {
    document.querySelector('#form-section').innerHTML = `
        <form action="" method="post">
        <div class="form-floating my-2">
            <input type="text" class="form-control" id="p-name" placeholder="name" required>
            <label for="p-name">Nombre producto</label>
        </div>
        <div class="form-floating my-2">
        <input type="text" class="form-control" id="img" placeholder="img" required>
        <label for="img">imagen</label>
    </div>
    <select id="database-slot" class="form-select form-select-lg mb-3" aria-label="Large select example" required>
        <option selected disabled>Tipo de producto</option>
        <option value="tools">Herramienta</option>
        <option value="equiment">Equipamiento</option>
        <option value="material">material</option>
    </select>
    
    <div class="form-floating my-2">
        <input type="number" class="form-control" id="uprice" placeholder="name" required>
        <label for="uprice">precio unitario</label>
    </div>
    <div class="form-floating my-2">
        <input type="number" class="form-control" id="storaged-unit" placeholder="name" required>
        <label for="storaged-unit">cantidad de unidades</label>
    </div>
    <div class="mb-3">
        <label for="p-desc" class="form-label">Description</label>
        <textarea class="form-control" id="p-desc" rows="3" required></textarea>
    </div>
    <button type="submit" item_id="" class="btn btn-primary"> enviar</button>
        </form>

    `
    
}

//selectors
const form = document.querySelector('form')
const btnesdit = form.querySelector('[type="submit"]')

const tbody = document.querySelector('tbody')
const productName = form.querySelector('#p-name')
const productImg = form.querySelector('#img')
const productUprice = form.querySelector('#uprice')
const productStorageUnit = form.querySelector('#storaged-unit')
const productDesc = form.querySelector('#p-desc')
//database table
const productTable = form.querySelector('#database-slot')

//index
async function index(database, product) {
    await fetch(`${link}${database.value}`, {
        method: 'POST',
        headers: { 'content-type': "aplication/json" },
        body: JSON.stringify(product)
    })
    loaderList(filt)

}

//edition
async function edit(itemId,table) {
    const response = await fetch(`${link}${table}?id=${itemId}`)
    const data= await response.json()
    productName.value=data[0].product_name
    productImg.value=data[0].img
    productUprice.value=data[0].unitary_price
    productStorageUnit.value=data[0].storage_unit
    productDesc.value=data[0].description
    
    btnesdit.setAttribute('item_id',itemId)

}
//delete
async function deletejson(id,table) {
    await fetch(`${link}${table}/${id}`,{
        method:'DELETE',
        headers: {"content-Type": "application/json"}
    })
    loaderList(filt)
}
//action into table
tbody.addEventListener('click',(event)=>{
    let itemId=event.target.getAttribute('item-id')
    let itemTable=event.target.getAttribute('item-table')
    if(event.target.classList.contains('btn-danger')){// delete option
        deletejson(itemId,itemTable)
        
    }
    if(event.target.classList.contains('btn-warning')){//edit option
        edit(itemId,itemTable)
    }
})

form.addEventListener('submit', async (event) => {

    event.preventDefault()
    //object to send
    const packagetoSend = newElement(productName, productImg, productUprice, productStorageUnit, productDesc,productTable)
    console.log(btnesdit.item_id)
    index(productTable, packagetoSend)
    loaderList(filt)
})






