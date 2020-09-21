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
    // shoe.reviews.forEach((review) => {
    //     console.log(review.content)
    // })
    console.log(shoe)
    shoeIntotheCard(shoe) 
})


let shoeIntotheCard = (shoeInfo) => {
    shoeImg.src = shoeInfo.image
    shoeName.innerText = shoeInfo.name
    shoeDescription.innerText = shoeInfo.description
    shoePrice.innerText = shoeInfo.price 
    let reviewsarray = shoeInfo.reviews.map((review) => {
        return `<li>${review.content}</li>`
    })
    // return reviewsarray.join('')
    
    shoeReviews.innerHTML = reviewsarray.join('')

    // newReview = document.querySelector("#review-content").value

    reviewForm.addEventListener('submit', (evt) => {
        evt.preventDefault()

        let newReview = evt.target.form_name.value
        // console.log(newReview)
         
    fetch(`http://localhost:3000/shoes/${shoeInfo.id}/reviews`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newReview
            })

        })
        .then(res => res.json())
        // .then((shoe) => {
        //     shoeIntotheCard(shoe)
        // })
        evt.target.reset()

    })

}


// Second Deliverable 

// * When a user clicks on one of the shoes 
// in the sidebar, they should be able to see 
// more details about the shoe, the reviews 
// associated with it and a form in the main container. 
// There should only be one shoe in the main container 
// at one time.

// FORM FOR A NEW REVIEW
let reviewForm = document.querySelector('#form-container')
let formContainer = document.createElement('div')
    formContainer.innerHTML = `<form id="new-review">
                                <div class="form-group">
                                <textarea class="form-control" name="form_name" id="review-content" rows="3"></textarea>
                                <input type="submit" class="btn btn-primary"></input>
                                </div>
                                </form> `
console.log(reviewForm)
reviewForm.append(formContainer)



// Third Deliverable


// When a user fills the form out and submits it, the review should get persisted 
// in the backend and also be shown on the page, without refreshing. 
// When you create a review for a given shoe, if you click on another 
// shoe and you go back to your initial shoe, you should see 
// the new review persist without refreshing.