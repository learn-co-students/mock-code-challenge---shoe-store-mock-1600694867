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
        shoeLi.innerText = `${shoe.name} `
        //console.log("this is the shoeLi", shoeLi)

        //now append to the DOM
        shoesContainer.append(shoeLi)


    shoeLi.addEventListener("click", (evt) => {
        //if the form does not exist
        // if(shoeReview) {
        // shoeReview.firstChild.remove()
        // }
        if(!document.querySelector("form")) {
            formAdd(shoe)
            shoeInfo(shoe)
            turnReviewToLi(shoe) 
            
        }
        else{
            shoeInfo(shoe)
            turnReviewToLi(shoe)
        }
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

    console.log("I chose this shoeID:", shoeSelected.id)

    shoeFormContainer.addEventListener("submit", (evt) => {
        //nede to have an evt prevent default to prevent it from refreshing
        //a form has no value, so whenever a user does input something
        //that's the value we want to target
        evt.preventDefault()
        let shoePicked = formTextArea.value
    
        fetch(`http://localhost:3000/shoes/${shoeSelected.id}/reviews`, {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               content: shoePicked
           })
        })
        .then(res => res.json())
        .then((reviewsObj) => {
            //update the object in memory
            //the shoe instance BEFORE the form submission and AFTER the form submission needs to be
            //consistent
            shoeSelected.reviews.push(reviewsObj)

            //update the DOM
            //create a new <li> for this review
            //append the new review elelment to the reviews list

            const reviewLi = document.createElement("li")
            reviewLi.innerText = reviewsObj.content
            shoeReviews.append(reviewLi)

        })

        })

}


let turnReviewToLi = reviewShoe => {
    reviewShoe.reviews.forEach(review => {
        let shoeReviewLi = document.createElement("li")
            shoeReviewLi.innerText = `${review.content}`
            shoeReview.append(shoeReviewLi)
            console.log("this is the review:", shoeReviewLi)
    })

}


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





//these are stable elements, not appending anything to the DOM
let shoeInfo = shoe => {
    let shoeName = document.getElementById("shoe-name")
        shoeName.innerHTML = `${shoe.name}`

    let shoeImg = document.getElementById("shoe-image")
        shoeImg.src= `${shoe.image}`

    let shoeDescription = document.getElementById("shoe-description")
        shoeDescription.innerText = `${shoe.description}`
    let shoePrice = document.getElementById("shoe-price")
        shoePrice.innerText = `$${shoe.price}.00`

    

}