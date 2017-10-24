const clientId = 'uXSVu2ldBncOGMcvI9SW2Q';
const secret = 'CqZmd3WRqA12BEDeE4Eg6PNEXDWPRcuDaGbIah9eHimg8i7RGiWNwSfNCTO2v8yr';
let accessToken = '';

const Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id='
     + clientId + '&client_secret=' + secret,{method: 'POST'}).then(response =>
        {return response.json()}).then(jsonResponse => {accessToken = jsonResponse.access_token;});
  },
  search(term,location,sortBy){
    return Yelp.getAccessToken().then(() => {return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term='+
     term + '&location=' + location + '&sort_by=' + sortBy, {headers: {Authorization: `Bearer ${accessToken}`}})}).then(
       jsonResponse => {
         if(jsonResponse.business){
           return jsonResponse.business.map(business => {
             return{
               id: business.id,
               imageSrc: business.imageSrc,
               name: business.name,
               address: business.address,
               city: business.city,
               state: business.state,
               zipCode: business.zipCode,
               category: business.category,
               rating: business.rating,
               reviewCount: business.reviewCount
             }
           })
         }
       }
     )
  }
}
export default Yelp;
