const shoeUrl = "http://localhost:3000/shoes"
const shoeUl = document.querySelector("ul#shoe-list.list-group")
const shoeImgDiv = document.querySelector("img#shoe-image.card-img-top")
const shoeNameDiv = document.querySelector("h4#shoe-name.card-title")
const shoeDesc = document.querySelector("p#shoe-description.card-text")
const shoePrice = document.querySelector("small#shoe-price.text-muted")
const reviewForm = document.querySelector("div#form-container.container")
const reviewUl = document.querySelector("ul#reviews-list.list-group.list-group-flush")
let allShoes = []
let theShoe = []

// UPON LOADING PAGE: See a list of all the shoes in the sidebar

fetch(shoeUrl, { method: "GET"})
    .then(res => res.json())
    .then((shoeListPOJO) => {
        allShoes = shoeListPOJO
        const shoeLi = allShoes.map((shoe) =>
        
        `<div class="shoe item" id="${shoe.id}">${shoe.name}</div>`)

        shoeUl.innerHTML= shoeLi.join('')
        // console.log(shoeUl)
    
    
        shoeUl.addEventListener('click', (event) => {
            let selectedShoeId = event.target.id
            loadShoes(selectedShoeId)
        })
    })

function loadShoes(shoeId){
    // console.log(`YOU JUST CLICKED SHOE NO. ${shoeId}`)
    fetch(`http://localhost:3000/shoes/${shoeId}`, { method: "GET"})
        .then(res => res.json())
        .then((shoePOJO) => {
            theShoe = shoePOJO
            // console.log(theShoe)
            shoeImgDiv.src = theShoe.image
            shoeNameDiv.innerText = theShoe.name
            shoeDesc.innerText = `${theShoe.description}`
            shoePrice.innerText =`PRICE: $${theShoe.price}.00 USD`

            const reviewArray = theShoe.reviews.map((review) => {
                return `<li>${review.content}</li>`})
            reviewUl.innerHTML = reviewArray.join('')
        })

}        

//CREATE A FORM
        let formContainer = document.createElement('div')
        formContainer.innerHTML =`<form id="new-review">
                                <div class="form-group">
                                <label>Leave a Review:</label>
                                <textarea class="form-control" id="review-content" rows="3"></textarea>
                                <input type="submit" class="btn btn-primary"></input>
                                </div>
                                </form>`

        // console.log(formContainer)
        reviewForm.append(formContainer)


        formContainer.addEventListener('submit', (event) =>{
            event.preventDefault();
            let newReview = event.target["review-content"].value

            fetch(`http://localhost:3000/shoes/${theShoe.id}/reviews`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({content: newReview})
                })

                .then(res => res.json())
                .then((newReviewObj) => {
                    // console.log(newReviewObj)
                    let newReviewLi = document.createElement('li')
                    newReviewLi.innerText = newReviewObj.content
                    reviewUl.appendChild(newReviewLi)
                })
            
            

        })
            
// by default have the first shoe rendered in the main container (see deliverable 2).
loadShoes(1)

// CLICKING ONE OF THE SHOES ON SIDEBAR:
//they should be able to see more details about the shoe

//the reviews associated with it and a form in the main container
//There should only be one shoe in the main container at one time.


// UPON SUBMITTING THE FORM:
//the review should get persisted in the backend and also be shown on the page without refreshing.
//When you create a review for a given shoe, if you click on another shoe
//and you go back to your initial shoe, you should see the new review persist without refreshing.