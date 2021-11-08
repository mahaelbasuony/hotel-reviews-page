const accommodationElm = document.querySelector(".accommodation_data");
const accommodations = document.querySelector(".accommodations");
const accommodationTitle = document.querySelector(".accommodation_title");

document.addEventListener("DOMContentLoaded", function() {
    //function to convert country code to logo
    function getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }

    function accommodationView(data) {
        const accommdationContainerElm = document.createElement("div");
        accommdationContainerElm.classList.add("accommdation_details");

        accommdationContainerElm.innerHTML = `
        <span class="accommodation_average">${data.generalAvg}</span>
        <h3 class="accommdation_average_rating_title">The Average rating for this accommodation </h3>
        <div class="accommdation_average_rating">
            
            <div class="accommdation_location_restaurants">
                <div>Location ${data.aspecsAvg.location}/10</div>
                <div>Restaurants ${data.aspecsAvg.restaurants}/10</div>

            </div>

            <div class="accommdation_pricequality_state">
                <div>priceQuality ${data.aspecsAvg.priceQuality}/10</div>
                <div>sanitaryState ${data.aspecsAvg.sanitaryState}/10</div>

            </div>

            <div class="accommdation_childfriendly_pool">
                 <div>childFriendly ${data.aspecsAvg.childFriendly}/10</div>
                <div>pool ${data.aspecsAvg.pool}/10</div>

            </div>

        </div>
        <h3>the percentages of the travelledWith</h3>
        <div class="accommdation_travelwith_percentages">
        
        <div >
                <div>Family ${data.traveledWithAvg.FAMILY}/10</div>
                <div>Couple ${data.traveledWithAvg.COUPLE}/10</div>

            </div>

            <div>
                <div>Friends ${data.traveledWithAvg.FRIENDS}/10</div>
                <div>Single ${data.traveledWithAvg.SINGLE}/10</div>

            </div>

            <div>
                 <div>Other ${data.traveledWithAvg.OTHER}/10</div>

            </div>
        
        </div>
        `;
        accommodationElm.appendChild(accommdationContainerElm);
    }

    function accommodationsList(data) {
        data.all.forEach((elm) => {
            console.log(elm.locale);
            const accommdationsContainerElm = document.createElement("div");
            accommdationsContainerElm.classList.add("accommodations_list");
            accommdationsContainerElm.innerHTML = `
      
                            <div class="accommodation_data">
      
                                <div>
      
                                    <div class="accommodation_user_data">  Added By <span> ${
                                      elm.user
                                    } </span> <span> ${getFlagEmoji(
        elm.locale
      )}</span> On  <span> ${new Date(
        elm.entryDate
      ).toLocaleDateString()} </span> </div>
                                    <h3>${
                                      elm.titles[Object.keys(elm.titles)[0]]
                                        ? Object.values(elm.titles)[0]
                                        : ""
                                    }</h3>
                                    <div class="accommodation_content">
                                        ${
                                          elm.texts[Object.keys(elm.texts)[0]]
                                            ? elm.texts[
                                                Object.keys(elm.texts)[0]
                                              ]
                                            : ""
                                        }
                                    </div>
      
                            </div>
                            <div class="accommodation_location_with_date">
                                <div>
                                    Gerenal (${
                                      Object.values(elm.ratings.general)[0]
                                    }/10)
      
                                </div>
                                <div>
                                    About the trip <br/>
                                    <span>date ${new Date(
                                      elm.travelDate
                                    ).toLocaleDateString()}</span>
                                    <span>${elm.traveledWith}</span>
      
                                </div>
                            </div>
                        </div>
                        <h4>Ratings of aspects :</h4>
                        <div class="accommdation_ratings">
                            <div>
                                <div>Location (${
                                  Object.values(elm.ratings.aspects)[0]
                                }/10)
                                </div>
                                <div>
                                    Pool (${
                                      Object.values(elm.ratings.aspects)[22]
                                    }/10)<br/>
                                </div>
                            </div>
                            <div>
                                <div>
                                ChildFriendly (${
                                  Object.values(elm.ratings.aspects)[5]
                                }/10)
                                </div>
                            </div>
                            <div>
                                <div>
                                    Price Quality (${
                                      Object.values(elm.ratings.aspects)[2]
                                    }/10)
                                </div>
                            </div>
                        </div>
      
                    `;
            accommodations.appendChild(accommdationsContainerElm);
        });
    }

    fetch("http://localhost:8080/reviews")
        .then((response) => response.json())
        .then((data) => {
            accommodationsList(data);
        });

    fetch("http://localhost:8080/reviews/average")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            accommodationView(data);
        });
});