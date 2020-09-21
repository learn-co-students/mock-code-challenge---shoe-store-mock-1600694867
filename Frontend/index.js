// Code your solution here

// DELIVERABLE 1- DONE
// When a user loads the page, they should be able to see a list of all the shoes in the sidebar 
// and by default, have the first shoe rendered in the main container (see deliverable 2).

// DELIVERABLE 2 - DONE
// When a user clicks on one of the shoes in the sidebar, they should be able to see more details 
// about the shoe, the reviews associated with it and a form in the main container. 
// There should only be one shoe in the main container at one time.

// DELIVERABLE 3 - DONE
// When a user fills the form out and submits it, the review should get persisted in the backend 
// and also be shown on the page, without refreshing. When you create a review for a given shoe, 
// if you click on another shoe and you go back to your initial shoe, 
// you should see the new review persist without refreshing.

let sidebar = document.querySelector("ul.list-group#shoe-list")
let mainShoeContainer = document.querySelector("div#main-shoe")
    let mainShoeImg = document.querySelector("img.card-img-top#shoe-image")
    let mainShoeName = document.querySelector("h4.card-title#shoe-name")
    let mainShoeDesc = document.querySelector("p.card-text#shoe-description")
    let mainShoePrice = document.querySelector("small.text-muted#shoe-price")
let reviewFormContainer = document.querySelector("div.container#form-container")
let reviewList = document.querySelector("ul.list-group#reviews-list")

fetch("http://localhost:3000/shoes")
.then(response => response.json())
.then(shoeArray => {
    shoeArray.forEach(shoeObj => {
        turnShoeToLi(shoeObj)
    })
    mainShoe(shoeArray[0])
})

let turnShoeToLi = (shoe) => {
    let shoeLi = document.createElement("li")
    shoeLi.classList.add("list-group-item")
    shoeLi.innerText = shoe.name

    sidebar.append(shoeLi)

    shoeLi.addEventListener("click", (evt) => {
        fetch("http://localhost:3000/shoes")
        .then(response => response.json())
        .then(shoeArray => {
            let findShoeName = shoeLi.innerText
            let foundShoe = shoeArray.find(shoeObj => shoeObj.name === findShoeName)
            mainShoe(foundShoe)
        })
    })
}

let mainShoe = (shoe) => {
    // Displays Shoe Info
    mainShoeImg.src = shoe.image
    mainShoeName.innerText = shoe.name
    mainShoeDesc.innerText = shoe.description
    mainShoePrice.innerText = shoe.price
    // End of Displays Show Info

    // Existing Reviews List
    reviewList.innerHTML = ""
    let shoeReviewsArray = shoe.reviews
    shoeReviewsArray.forEach(reviewObj => {
        turnReviewToLI(reviewObj)
    })
    // End of Existing Reviews List

    // Shoe Review Form- can I save this to a variable?
    reviewFormContainer.innerHTML = ""
    let reviewForm = document.createElement("form")
    reviewForm.id = "new-review"

    let formDiv = document.createElement("div")
    formDiv.classList.add("form-group")

    let formTA = document.createElement("textarea")
    formTA.classList.add("form-control")
    formTA.id = "review-content"
    formTA.rows = "3"

    let formSubmit = document.createElement("input")
    formSubmit.type = "submit"
    formSubmit.classList.add("btn_btn-primary")

    formDiv.append(formTA, formSubmit)
    reviewForm.append(formDiv)
    reviewFormContainer.append(reviewForm)
    // end of Shoe Review Form

    //submitting the Shoe Review
    reviewForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        // evt.target is the form
        // debugger
        let reviewContent = evt.target["review-content"].value
        fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: reviewContent
            })
        })
        .then(response => response.json())
        .then(reviewObj => {
            // debugger
            // evt.target.reset() - Can't figure out where to put this!
            turnReviewToLI(reviewObj)
        })
    })
    // End of submitting the Shoe Review

}

let turnReviewToLI = (review) => {
    let reviewLi = document.createElement("li")
    reviewLi.classList.add("list-group-item")
    reviewLi.innerText = review.content

    reviewList.append(reviewLi)
}





// let shoeReviewForm = 
    // let reviewForm = document.createElement("form")
    // reviewForm.id = "new-review"

    // let formDiv = document.createElement("div")
    // formDiv.classList.add("form-group")

    // let formTA = document.createElement("textarea")
    // formTA.classList.add("form-control")
    // formTA.id = "review-content"
    // formTA.rows = "3"

    // let formSubmit = document.createElement("input")
    // formSubmit.type = "submit"
    // formSubmit.classList.add("btn btn-primary")

    // formDiv.append(formTA, formSubmit)
    // reviewForm.append(formDiv)
    // reviewFormContainer.append(reviewForm)