function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const mnt = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour ? hour + " hours " : ""}${mnt ? mnt + " minutes " : ""}${
    remainingSecond ? remainingSecond + " seconds ago" : ""
  }`;
  //return `${hour}hour ${mnt} minute ${remainingSecond} second ago`;
}

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};

loadCatagories();
const displayCatagories = (catagories) => {
  const categoryContainer = document.getElementById("categories");
  catagories.forEach((item) => {
    // console.log(item);

    //create a btn
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCatagoryVideos(${item.category_id})" class="btn category-btn"> ${item.category}
    </button>
   
    `;

    //add btn to categories
    categoryContainer.append(buttonContainer);
  });
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => disPlayVideos(data.videos))
    .catch((error) => console.log(error));
};
const loadCatagoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //sobaike active cls remove koro
      removeActiveClass();
      // id er cls e active koro
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      //console.log(activeBtn);
      disPlayVideos(data.category);
    })
    .catch((error) => console.log(error));
};
const loadDetails = async (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayDetails(data.video);
};
const displayDetails = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>
  `;
  document.getElementById("showModalData").click();
};
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  //console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
function disPlayVideos(videos) {
  const videosPacket = document.getElementById("videos");
  videosPacket.innerHTML = "";
  if (videos.length == 0) {
    // const img = document.createElement("img");
    // img.src = "ph-tube-resources-main/Icon.png";
    // videosPacket.append(img);
    videosPacket.classList.remove("grid");
    videosPacket.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col justify-center items-center">
      <img src="ph-tube-resources-main/Icon.png">
      <h2 class="text-center text-xl font-bold">No content here in this category</h2>
    </div>
    `;
    return;
  } else {
    videosPacket.classList.add("grid");
  }
  videos.forEach((video) => {
    // console.log("ami", video);
    const card = document.createElement("div");
    card.classList = "card card-compact w-80";
    card.innerHTML = `
     <figure class="h-[200px] relative">
     <img
      src=${video.thumbnail}
      class="h-full w-full object-cover" 
      alt="Shoes"/>
    
     
      <span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-xs">
      ${getTimeString(video.others.posted_date)}
        </span>
     
      </figure>
  <div class="px-0 py-2 flex gap-5">
   <div>
    <img class="w-10 h-10 rounded-full object-cover"
      src=${video.authors[0].profile_picture}/>
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
      ${
        video.authors[0].verified == true
          ? `<img class="w-5" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/verify-6261379-5140946.png?f=webp&w=256">`
          : ""
      }
  <div>
  <p><button onclick="loadDetails('${
    video.video_id
  }')" class="btn btn-sm btn-error">details</button></p>
   </div>
  
   </div>
   </div>
  
  `;
    videosPacket.append(card);
  });
}
// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaaa",
//   thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//   title: "Shape of You",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//       profile_name: "Olivia Mitchell",
//       verified: "",
//     },
//   ],
//   others: {
//     views: "100K",
//     posted_date: "16278",
//   },
//   description:
//     "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
// };
// ${
//   video.others.posted_date?.length == 0 ? (
//     ""
//   ) : (

// }

loadVideos();
