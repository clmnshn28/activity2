function displayTable(){

  let xml = document.getElementById("xmldata");
  let subjects = xml.getElementsByTagName("subject");

  let tableBody = document.querySelector("#display tbody ");
  tableBody.innerHTML = "";

  for(let subject of subjects){
    let subCode = subject.getAttribute("id");
    let subDesc = subject.getElementsByTagName("subDesc")[0].lastChild.nodeValue;
    let lecUnits = subject.getElementsByTagName("lecUnits")[0].lastChild.nodeValue;
    let labUnits = subject.getElementsByTagName("labUnits")[0].lastChild.nodeValue;

    let preRequisites = subject.getElementsByTagName("preRequisite");
    let preReqs = "";

    let imageSrc = subject.getElementsByTagName("imagePath")[0].lastChild.nodeValue;

    for(let preRequisite of preRequisites){
      preReqs += preRequisite.lastChild.nodeValue + ", ";
    }
    preReqs = preReqs.slice(0,-2);

    let row = `
    
    <tr onclick='revealDetail("${subCode}", "${subDesc}", "${lecUnits}", "${labUnits}", "${preReqs}", "${imageSrc}")' >
      <td>${subCode}</td>
      <td>${subDesc}</td>
      <td>${lecUnits}</td>
      <td>${labUnits}</td>
      <td>${preReqs}</td>
      <td><button class="view-image-btn" onclick ='revealImage("${imageSrc}")'>View Image</button></td>
    </tr>`;
  
  tableBody.innerHTML += row;
  }
  
  
   let viewImageButtons = document.querySelectorAll('.view-image-btn');
   viewImageButtons.forEach(button => {
     button.addEventListener('click', function(event) {
       event.stopPropagation(); // Stop event propagation
     });
   });

}

function search(str){

  let xml = document.getElementById("xmldata");
  let subjects = xml.getElementsByTagName("subject");
  let output = "";

  for(let subject of subjects){
    let subCode = subject.getAttribute("id");
    let subDesc = subject.getElementsByTagName("subDesc")[0].lastChild.nodeValue;
    let lecUnits = subject.getElementsByTagName("lecUnits")[0].lastChild.nodeValue;
    let labUnits = subject.getElementsByTagName("labUnits")[0].lastChild.nodeValue;

    let preRequisites = subject.getElementsByTagName("preRequisite");
    let preReqs = "";

    let imageSrc = subject.getElementsByTagName("imagePath")[0].lastChild.nodeValue;

    for(let preRequisite of preRequisites){
      preReqs += preRequisite.lastChild.nodeValue + ", ";
    }
    preReqs = preReqs.slice(0,-2);
 
 if(subCode.toLowerCase().includes(str.toLowerCase()) || subDesc.toLowerCase().includes(str.toLowerCase()) ||
  lecUnits.toLowerCase().includes(str.toLowerCase()) || labUnits.toLowerCase().includes(str.toLowerCase()) ||
  preReqs.toLowerCase().includes(str.toLowerCase())){

    output += `
    <tr onclick='revealDetail("${subCode}", "${subDesc}", "${lecUnits}", "${labUnits}", "${preReqs}", "${imageSrc}")'>
    <td>${subCode}</td>
    <td>${subDesc}</td>
    <td>${lecUnits}</td>
    <td>${labUnits}</td>
    <td>${preReqs}</td>
    <td><button class="view-image-btn" onclick ='revealImage("${imageSrc}")'>View Image</button></td>
  </tr>`;

    }
  }

  if(output === ""){
    output = '<tr><td colspan="6">No results found for <b>"' + str + '"</b>.</td></tr>';
  }

  document.getElementById("display").innerHTML = 
  `<tr >
    <th>Subject Code</th>
    <th>Subject Description</th>
    <th>Lecture Units</th>
    <th>Lab Units</th>
    <th>Pre-Requisites</th>
    <th>Image</th>
   </tr>` + output;
 
   let viewImageButtons = document.querySelectorAll('.view-image-btn');
   viewImageButtons.forEach(button => {
     button.addEventListener('click', function(event) {
       event.stopPropagation(); // Stop event propagation
     });
   });

}

function revealImage(imageSrc){

  let image = `<img src="${imageSrc}" alt="Image">`;

  let modalImage = document.getElementById("modalImage");
  modalImage.innerHTML = image;
  document.getElementById("myModal").style.display = "flex";

  modalImage.onclick = function(event){
    event.stopPropagation();
  }
}

function hideImage(){
  document.getElementById("myModal").style.display = "none";
}




// all detail display
function revealDetail(subCode, subDesc, lecUnits, labUnits, preReqs, imageSrc) {
  document.querySelector(".subCode").textContent =  subCode;
  document.querySelector(".subDesc").textContent = subDesc;
  document.querySelector(".lecUnits").textContent =lecUnits;
  document.querySelector(".labUnits").textContent = labUnits;
  document.querySelector(".preRequisites").textContent = preReqs;
 
  
  
  document.querySelector(".detailedImage").innerHTML = `<img class="imahe" src="${imageSrc}" alt="Image">`;
  
  document.getElementById("myModal2").style.display = "flex";

  
}

function hideDetail() {
  document.getElementById("myModal2").style.display = "none";
}