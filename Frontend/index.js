// Code your solution here
const sidebarList = document.querySelector("#shoe-list")
const shoeImg = document.querySelector("#shoe-image")
const shoeName = document.querySelector("#shoe-name")
const shoeDesc = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const formContainer = document.querySelector("#form-container")
const shoeReviews = document.querySelector("#reviews-list")


let turnShoeToHTML = (shoe) => {
    shoeImg.src = shoe.image
        shoeImg.alt = shoe.name 
    shoeName.innerText = shoe.name
    shoeDesc.innerText = shoe.description
    shoePrice.innerText = `$${shoe.price} USD`
    shoe.reviews.forEach(makeReviewLi)              // Populate ul with each review li

    let reviewForm = document.createElement("form")     // Create form to submit new review
        reviewForm.method = 'POST'
        let formElement1 = document.createElement('input')
        formElement1.setAttribute('type', 'text')
        reviewForm.append(formElement1)
        formContainer.append(reviewForm)        // Append form inside 

    let reviewButton = document.createElement('button') // Make Button to Submit New Review
        reviewButton.innerText = 'Post Review'
        formContainer.append(reviewButton)
        reviewButton.addEventListener("click", (evt) => {reviewForm.submit()})

    // shoeForm.addEventListener("submit", (evt) => {      // Event listener to be triggered when reviewButton "click" triggers "submit"
    //     debugger
    //     evt.preventDefault()
    //     fetch(`http://localhost:3000/shoes/${shoe.id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             reviews: 

    //         })
    //     })
    // })
}


fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(shoes => {
        shoes.forEach(turnShoeToHTML)
    })


// Make Review list item
let makeReviewLi = (review) => {
    reviewLi = document.createElement("li")
    reviewLi.innerText = `"${review.content}"`
    shoeReviews.append(reviewLi)
}