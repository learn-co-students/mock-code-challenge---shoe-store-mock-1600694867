// Code your solution here

// First Deliverable
// * When a user loads the page, they should be able to 
// see a list of all the shoes in the sidebar and 
// by default, have the first shoe rendered
//  in the main container (see deliverable 2).

// stable element 
let shoeList = document.querySelector("ul#shoe-list.list-group")
// console.log(shoeList)



fetch("http://localhost:3000/shoes")
.then(res => res.json())
.then((shoes) => {
    shoes.forEach((shoe) => {

        // helper method
        turnShoeintoHTML(shoe)

    })
})

let turnShoeintoHTML = (shoePojo) => {
    let shoeLi = document.createElement('li')
    shoeLi.className = 'shoe'
    shoeLi.innerText = shoePojo.name
    shoeList.append(shoeLi)


    // SECOND DELIVERABLE
    shoeLi.addEventListener('click', (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/shoes/${shoePojo.id}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then((newShoe) => {
            shoeIntotheCard(newShoe)
        })
    })
}


// Stable elements for the shoe card 
let shoeImg = document.querySelector("#shoe-image")
let shoeName = document.querySelector("#shoe-name")
let shoeDescription = document.querySelector("#shoe-description")
let shoePrice = document.querySelector("#shoe-price")
let shoeReviews = document.querySelector("#reviews-list")
// console.log(shoeReviews)


fetch("http://localhost:3000/shoes/1")
.then(res => res.json())
.then((shoe) => {
    // console.log(shoe)
    shoeIntotheCard(shoe) 
})



let shoeIntotheCard = (shoeInfo) => {
    shoeImg.src = shoeInfo.image
    shoeName.innerText = shoeInfo.name
    shoeDescription.innerText = shoeInfo.description
    shoePrice.innerText = shoeInfo.price 
    shoeReviews.innerHTML = shoeInfo.reviews.forEach((review) => {review.content})

}


// Second Deliverable 

// * When a user clicks on one of the shoes 
// in the sidebar, they should be able to see 
// more details about the shoe, the reviews 
// associated with it and a form in the main container. 
// There should only be one shoe in the main container 
// at one time.