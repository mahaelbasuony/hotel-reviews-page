document.addEventListener("DOMContentLoaded", function() {
    const accommodation = document.querySelector(".accommodations");
    const accommodationTitle = document.querySelector(".accommodation_title");
    fetch("http://127.0.0.1:5500/server/api/reviews.json")
        .then((response) => response.json())
        .then((data) =>
            data.forEach((elm) => {
                const accommdationContainerElm = document.createElement("div");
                accommdationContainerElm.classList.add("accommodations_list");
                // console.log(elm);
                accommdationContainerElm.innerHTML = `
                    <div class="accommodation_user_data">
                  Added By <span> ${elm.user} </span>  On  <span> ${new Date(
          elm.travelDate
        ).toLocaleDateString()} </span>
                    </div>
                    <div class="accommodation_title">
                    ${
                      elm.titles[Object.keys(elm.titles)[0]]
                        ? Object.values(elm.titles)[0]
                        : ""
                    }
                    </div>
                    <div class="accommodation_content">
                    
                    ${
                      elm.texts[Object.keys(elm.texts)[0]]
                        ? elm.texts[Object.keys(elm.texts)[0]]
                        : ""
                    }
                    </div>
                    
                `;
                accommodation.appendChild(accommdationContainerElm);
            })
        );
});