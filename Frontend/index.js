// Code your solution here
const shoeList = document.querySelector('ul#shoe-list.list-group')
const shoeImg = document.querySelector('#shoe-image')
const shoeName = document.querySelector('#shoe-name')
const shoeDescription = document.querySelector('#shoe-description')
const shoePrice = document.querySelector('#shoe-price')
const reviewsList = document.querySelector('#reviews-list')
const formContainer = document.querySelector('#form-container')

fetch('http://localhost:3000/shoes') //fetch all shoes to generate shoe list
.then(response => response.json())
.then(shoesArray => {
    shoesArray.forEach( shoe => {
        turnShoeIntoLiObj(shoe)
    })
})

// take in one shoe to turn into a list item for shoe list
// attach event listener to each shoe to populate main container
const turnShoeIntoLiObj = (shoe) => {
    let shoeListItem = document.createElement('li')
    shoeListItem.innerText = shoe.name
    shoeList.append(shoeListItem)

    shoeListItem.addEventListener('click', event => {
        let shoeId = shoe.id 
        fetch(`http://localhost:3000/shoes/${shoeId}`)
        .then(response => response.json())
        .then(getOneShoe(shoe))
    })

}

const getOneShoe = (shoe) => {
        shoeImg.src = shoe.image
        shoeName.innerText = shoe.name
        shoeDescription.innerText = shoe.description
        shoePrice.innerText = shoe.price

        generateForm(shoe)
        reviewsList.innerHTML = ''
        shoe.reviews.forEach( review => {
            let reviewListItem = document.createElement('li')
            reviewListItem.className = 'list-group-item'
            reviewListItem.innerText = review.content
            reviewsList.append(reviewListItem)
        })

}

const getFirstShoe = () => {
    fetch('http://localhost:3000/shoes/1')
    .then(response => response.json())
    .then(shoe => {
        shoeImg.src = shoe.image
        shoeName.innerText = shoe.name
        shoeDescription.innerText = shoe.description
        shoePrice.innerText = shoe.price
        generateForm(shoe)
        shoe.reviews.forEach( review => {
            let reviewListItem = document.createElement('li')
            reviewListItem.className = 'list-group-item'
            reviewListItem.innerText = review.content
            reviewsList.append(reviewListItem)
        })
    })
}

// this implentation has a bug, form won't show up until I click on a shoe item.
// so there's no review form upon page load until I click on the first shoe.
const generateForm = (shoe) => {
    let reviewForm = document.createElement('form')
    reviewForm.id = 'new-review'
    let reviewDiv = document.createElement('div')
    reviewDiv.className = 'form-group'
    let reviewArea = document.createElement('textarea')
    reviewArea.className = 'form-control'
    reviewArea.id = 'review-content'
    let reviewInput = document.createElement('input')
    reviewInput.type = 'submit'
    reviewInput.className = 'btn btn-primary'
    formContainer.innerHTML = ''
    formContainer.append(reviewForm)
    reviewForm.append(reviewDiv)
    reviewDiv.append(reviewArea)
    reviewDiv.append(reviewInput)

    reviewForm.addEventListener('submit', event => {
        event.preventDefault()
        let newReviewContent = event.target['review-content'].value
        let shoeId = shoe.id 
        fetch(`http://localhost:3000/shoes/${shoeId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: newReviewContent
                //backend can update successfully
            })
        })
        .then(response => response.json())
        .then(newReviewObj => {
            console.log(shoe.reviews.length)
            shoe.reviews.push(newReviewObj.content)
            console.log(shoe.reviews.length)

            let reviewListItem = document.createElement('li')
            reviewListItem.className = 'list-group-item'
            reviewListItem.innerText = newReviewObj.content
            reviewsList.append(reviewListItem)
        }) //returns review object - it associates with the shoe reviewed on the backend
    })

}

getFirstShoe()