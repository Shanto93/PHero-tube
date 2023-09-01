const blogPage = () => {
    window.location.href="blog.html";
}


const catagoryHandler = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const mainData = data.data;
  displayData(mainData);
};

const displayData = (mainData) => {
  const catagoryContainer = document.getElementById("catagory-container");
  mainData.forEach((catagory) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="tabs">
            <a onclick="handleCatagoryItem(${catagory.category_id},${false})" class="tab border border-b-gray-100 ">${catagory.category}</a> 
        </div>
        `;
    catagoryContainer.appendChild(div);
  });
};

const handleCatagoryItem = async (catagoryId, wantToSort) => {
  // console.log(catagoryId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${catagoryId}`
  );
  const data = await res.json();
  const mainData2 = data.data;
  if (mainData2.length != 0) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    cardContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if(wantToSort){
        mainData2.sort((a,b)=> parseInt(b.others.views.slice(0, b.others.views.length - 1)) - parseInt(a.others.views.slice(0, a.others.views.length - 1)))
        console.log(mainData2)
    }
    mainData2.forEach((item) => {
    //   console.log(item.others.posted_date);
      const div = document.createElement("div");
      const hours = Math.floor(item.others.posted_date/3600);
      const minutes = Math.floor((item.others.posted_date%3600)/60);
      div.innerHTML = `
    <div class="card w-64 h-64 bg-base-100 shadow-xl mt-7 mx-auto">
  <figure class="w-full h-36">
    <img class="relative" src="${item?.thumbnail}" alt="Shoes" class="rounded-xl" />
    <button id="something" class="absolute right-3 top-28 bg-black rounded-md text-xs text-white px-2 py-1">${
        item.others.posted_date
          ? hours+"hrs "+minutes+" min ago"
          :''
      }</button>
  </figure>
  <div class="flex item-center gap-3 mt-4">
        <div>
            <img src="${
              item.authors[0]?.profile_picture
            }" alt="Shoes" class="h-10 w-10 rounded-full" />
        </div>
        <div class="space-y-2">
            <h3><b>${item?.title}</b></h3>
            <div class="flex items-center gap-3">
                <h3>${item.authors[0]?.profile_name}</h3>
                <p>${
                  item.authors[0].verified
                    ? '<img src="./Design in png/verified.SVG" alt="">'
                    : " "
                }</p>
            </div>
            <p>${item.others.views} views</p>
        </div>
  </div>
</div>

    `;

      cardContainer.appendChild(div);
    });
  } else {
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    cardContainer.classList = "flex justify-center item-center h-screen";
    const div = document.createElement("div");
    cardContainer.innerHTML = `
    <div class="my-auto">
     <img class="mx-auto" src="./Icon.png" alt="Centered Image">
     <p class="text-center text-2xl"><b> Oops!! Sorry, There is no <br>content here</b></p>
    </div>
    `;
    // cardContainer.appendChild(div);
  }
}
handleCatagoryItem(1000, false);
catagoryHandler();
