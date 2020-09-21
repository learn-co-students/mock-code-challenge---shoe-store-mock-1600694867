// Code your solution here
const sidebarList = document.querySelector("#shoe-list")
const shoeName = document.querySelector("#shoe-name")
const shoeDesc = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const shoeForm = document.querySelector("#form-container")
const shoeReviews = document.querySelector("#reviews-list")


let turnShoeToHTML = (shoe) => {
    shoeName.innerText = shoe.name
    shoeDesc.innerText = shoe.description
    shoePrice.innerText = shoe.price
debugger 
    shoe.reviews
    // reviewLi = document.createElement("li")
    // shoeReviews.append(reviewLi)
    // shoeReviews.innerText = shoe.reviews 
}

fetch("http://localhost:3000/shoes")
    .then(res => res.json())
    .then(shoes => {
        shoes.forEach(turnShoeToHTML)
    })
