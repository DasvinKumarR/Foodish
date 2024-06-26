// get divs using class root and content
let  root = document.querySelector(".root");
let contentDiv = document.querySelector(".content");
// array contains dish list
let dishList = ['biryani','burger','butter-chicken','dessert','dosa','idly','pasta','pizza','rice','samosa']
// asyn promise function to get dog image data
async function getImage(){
    try {
        let response = await fetch('https://foodish-api.com/api/')
        let data = await response.json();
        let imageUrl = await data.image;
        root.innerHTML = `<img src="${imageUrl}" alt="Dish Loading..."/>`
    } catch (error) {
        console.log(error);
    }
}
// function to create dropdown
function createDropdown(){
    try {
        let dropDown = document.createElement('select')
        dropDown.setAttribute("class","dropdown")
        dropDown.innerHTML = `<option selected>Select Variety</option>`
        dishList.forEach((e) => {
            let option = document.createElement('option');
            option.setAttribute('value', e);
            option.textContent = e;
            dropDown.appendChild(option);
        });
    root.innerHTML = `<p class="text">Get your random dish👇🏻</p>`
    root.appendChild(dropDown);
    return dropDown
    } catch (error) {
        console.error("Error in creating dropdown: ",error);
    }
}
// function to call dropdown and fetch when option is selected
function getVariety(){
    try {
        let select = createDropdown();
        select.addEventListener('change',function(){
            let dishValue = select.value;
            getVarietyImage(dishValue);
        });
    } catch (error) {
        console.log(error);
    } 
}
// promise function to fetch data from the api
async function getVarietyImage(variety){
    await fetch('https://foodish-api.com/images/'+variety)
    .then(response=> response.text())
    .then(data=>{
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        let tag = tempDiv.querySelector("input")
        root.innerHTML = `<img src="${tag.value}" alt="Dish Loading..."/>`
    })
    .catch((err)=>console.error('Error fetching data', err));
}