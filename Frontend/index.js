// Code your solution here
const sidebarList = document.querySelector("#shoe-list")
const shoeImg = document.querySelector("#shoe-image")
const shoeName = document.querySelector("#shoe-name")
const shoeDesc = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const formContainer = document.querySelector("#form-container")
const shoeReviewsUl = document.querySelector("#reviews-list")


let turnShoeToHTML = (shoe) => {
    shoeImg.src = shoe.image
        shoeImg.alt = shoe.name 
    shoeName.innerText = shoe.name
    shoeDesc.innerText = shoe.description
    shoePrice.innerText = `$${shoe.price} USD`
    shoe.reviews.forEach(makeReviewLi)          // Populate ul with each review li

    let reviewForm = document.createElement("form")     // Create form to submit new review
        reviewForm.method = 'POST'
        reviewForm.id = "#reviewForm"
        let formElement1 = document.createElement('input')
        formElement1.setAttribute('type', 'text')
        reviewForm.append(formElement1)
        formContainer.append(reviewForm)        // Append form inside 

    let reviewButton = document.createElement('button') // Make Button to Submit New Review
        reviewButton.innerText = 'Post Review'
        reviewButton.id = "#reviewButton"
        formContainer.append(reviewButton)
        reviewButton.addEventListener("click", (evt) => {reviewForm.submit()})

    console.log(arrayOfReviewIds)

    // reviewForm.addEventListener("submit", (evt) => {      // Event listener to be triggered when reviewButton "click" triggers "submit"
    //     evt.preventDefault(),
    //     let yourReviewId = evt.target. ,
    //     let yourReviewContent = evt.target.formElement1.value,
    //     debugger
    //     fetch(`http://localhost:3000/shoes/${shoe.id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             reviews.id: yourReviewId
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(updatedShoe => {
    //         updatedshoe.reviews.forEach(makeReviewLi)
    //         shoe.reviews = updatedShoe.reviews
    //     })
    // })
}

fetch("http://localhost:3000/shoes/1")
    .then(res => res.json())
    .then(turnShoeToHTML)
// fetch("http://localhost:3000/shoes")
//     .then(res => res.json())
//     .then(shoes => {
//         shoes.forEach(turnShoeToHTML)
//     })


let makeReviewLi = (review) => {            // Make Review list item
    reviewLi = document.createElement("li")
    reviewLi.innerText = `"${review.content}"`
    shoeReviewsUl.append(reviewLi)
}


// Give each consecutive new review the correct id: Integer
let arrayOfReviewIds = []
let findHighestReviewId = 
    fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(shoesArray => {
        shoesArray.forEach(shoe => {
            shoe.reviews.forEach(review => {
                arrayOfReviewIds.push(review.id)
            })
        })
    })