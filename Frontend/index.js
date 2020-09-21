// Code your solution here
const sidebarList = document.querySelector("#shoe-list")
const shoeImg = document.querySelector("#shoe-image")
const shoeName = document.querySelector("#shoe-name")
const shoeDesc = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const shoeForm = document.querySelector("#form-container")
const shoeReviews = document.querySelector("#reviews-list")


let turnShoeToHTML = (shoe) => {
    shoeImg.src = shoe.image
    shoeImg.alt = shoe.name 
    shoeName.innerText = shoe.name
    shoeDesc.innerText = shoe.description
    shoePrice.innerText = shoe.price
    shoe.reviews.forEach(makeReviewLi)
    // reviewLi = document.createElement("li")
    // shoeReviews.append(reviewLi)
    // shoeReviews.innerText = shoe.reviews 
}

fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(shoes => {
        shoes.forEach(turnShoeToHTML)
    })

let makeReviewLi = (review) => {
    reviewLi = document.createElement("li")
    reviewLi.innerText = `"${review.content}"`
    shoeReviews.append(reviewLi)
}