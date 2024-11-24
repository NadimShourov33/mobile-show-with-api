const loadData = async (searchtextfind='oppo') => {
  const data = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchtextfind}`
  );
  const resData = await data.json();
  //  console.log(resData.data)
  const findData = resData.data;
  displayphones(findData);
};

const displayphones = (phone) => {
 console.log(phone)
  const phoneid = document.getElementById("phone-container");
  console.log(phoneid)
  phoneid.textContent = "";
  const showbutton = document.getElementById("show-button");
  console.log(showbutton)
  if (phone.length > 5) {
    // console.log('hello')
    showbutton.classList.remove("hidden");
  } else {
    showbutton.classList.add("hidden");
  }
  phone = phone.slice(0, 5);
  phone.forEach((singlePhone) => {
    console.log(singlePhone);
    const phoneCard = document.createElement("div");
    //    singlePhone.slice(0,5)
    phoneCard.classList = `card  bg-base-100 shadow-xl mb-5`;
    phoneCard.innerHTML = ` <figure><img src="${singlePhone.image}" alt="Shoes" />
   </figure>
   <div class="card-body">
       <h2 class="card-title">${singlePhone.phone_name}</h2>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions justify-center">
           <button class="btn btn-primary" onclick="showDetailsclick('${singlePhone.slug}')">show Details</button>
       </div>
   </div>
   `;
    phoneid.appendChild(phoneCard);
    loadSpinner(false);

  });
};
phonehandle = () => {
  loadSpinner(true);
  const serchFeild = document.getElementById("phone-input");
  const searchText = serchFeild.value;
  loadData(searchText);
  //    console.log(searchText)
  // console.log('nadim')
};
loadData();
loadSpinner = (isloading)=>{
  const loadItem = document.getElementById('loading-spinner')
 if(isloading){
  loadItem.classList.remove('hidden')
 }
 else{
  loadItem.classList.add('hidden')
 }
}
 const showDetailsclick= async(id) =>{
  loadSpinner(true);
  const data2 = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const resdata2 = await data2.json();
  const finddata2 = resdata2.data;
  my_modal_3.showModal(finddata2);
  // console.log('show data',id,resdata2.data)
  // console.log(finddata2)
  const phonename = document.getElementById('phone-name')
  phonename.innerText = finddata2.name;
  const showdetails = document.getElementById('show-details-container')
  loadSpinner(false);
  showdetails.innerHTML = `
  <figure><img src="${finddata2.image}" class"mt-9"></figure>
  <h6>${finddata2. releaseDate}</h6>
  <h6>${finddata2.mainFeatures.storage}</h6>
  <h6>${finddata2?.others?.GPS}</h6>`
 }
 