// Code your solution here

//highlight my stable element
//create a fetch with promises
//use a helper function to create the html
//attach it to the DOM

//const shoesList = document.querySelector("ul.list-group")
let shoesContainer = document.getElementById("shoe-list")
let shoeFormContainer = document.getElementById("form-container")
let shoeReview = document.getElementById("reviews-list")



fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(shoeArr => {
        //console.log("this is the shoeArr:", shoeArr)
        // console.log("🐶 🐶 🐶")
        //we have to access the shoe Array in our db json
        //iterate through this array to help faciliate being added to the DOM
        shoeArr.forEach(shoeObj => { 
            //you have to call on the helper function and pass in the shoeObj
            shoeToObjLi(shoeObj)
        }) 
        //this is a single element inside of the array
        //shoeArr is accessible bc its coming from line 17
        shoeInfo(shoeArr[0])

    })

let shoeToObjLi = (shoe) => {
    //create the Li and add className
    
    let shoeLi = document.createElement("li")
        shoeLi.className = "list-group-item"
    

        //add information to the Li
        shoeLi.innerText = `This is the ${shoe.name} `
        //console.log("this is the shoeLi", shoeLi)

        //now append to the DOM
        shoesContainer.append(shoeLi)


    shoeLi.addEventListener("click", (evt) => {
        formAdd(shoe)
        shoeInfo(shoe)
    })




}

//add a form to the HTML element

let formAdd = shoeSelected => {
    let formHTML = document.createElement("form")
        formHTML.id = "new-review"

    let formDiv = document.createElement("div")
        formDiv.className = "form-group"
        formHTML.append(formDiv)

    let formTextArea = document.createElement("textarea")
        formTextArea.className = "form-control"
        formTextArea.id = "review-content"
        formTextArea.rows = 3
        formDiv.append(formTextArea)
    
    let formInput = document.createElement("input")
        formInput.class = "btn-primary"
        formInput.type = "submit"
        formDiv.append(formInput)

    console.log("🐶 🐶 🐶",formHTML)

    shoeFormContainer.append(formHTML)

    console.log("I chose this shoe:", shoeSelected)
}

// formAdd()

let addTextToReview = text => {
    let textLi = document.createElement("li")
        textLi.className = "list-group-item"
        textLi.innerText = `All my friends are jealous of me because of this shoe!`

        shoeReview.append(textLi)
    }
addTextToReview()


//create an event listener for submit that adds my form
//consider iterations for reviews when adding
//consider the object in memory + the DOM

shoeFormContainer.addEventListener("submit", (evt) => {
    //nede to have an evt prevent default to prevent it from refreshing
    //a form has no value, so whenever a user does input something
    //that's the value we want to target
    evt.preventDefault()
    // let shoePicked = evt.target.value

    fetch(`http://localhost:3000/shoes/${shoe_id}/reviews`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        //    id: 
        //    content: 
       })
    })
})


//these are stable elements, not appending anything to the DOM
let shoeInfo = shoe => {
    let shoeName = document.getElementById("shoe-name")
        shoeName.innerHTML = `${shoe.name}`

    let shoeImg = document.getElementById("shoe-image")
        shoeImg.src= `${shoe.image}`

    let shoeDescription = document.getElementById("shoe-description")
        shoeDescription.innerText = `${shoe.description}`

}