const apiKey = 'Tw4XPq9uPI1UfZZaCc9qWJOA6GwXJsKe7VDmvekzbcCWg83H4lhJTs8gTcY4kIDeTo2wT4zhHuV1a4X3Wt2q-fw3CLhMJSHlPPmpOWl3PN5ZHzxhxFC6ciiBZgWiXnYx'

const Yelp = {
    search(term, location, sortBy){

        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error('Request failed')
        })
        .then(jsonResponse => {
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.postal_code,
                        category: business.categories.title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                })
            }

            throw new Error('Request failed')
        })
    }
}

export default Yelp