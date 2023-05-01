
// check if user is already logged in
if (localStorage.getItem('username') !== 'jabbar') {
    // if not, redirect to login page
    window.location.replace('./login.html');
  }
  
  // Add your JavaScript code here
  document.getElementById("generateBtn").addEventListener("click", function () {
    // rest of the code for generating QR code
  });
  
  document.getElementById("downloadBtn").addEventListener("click", function () {
    // rest of the code for downloading QR code
  });
  
  // logout button functionality
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem('username');
    window.location.replace('./index.html');
  });
  

let holdName = "";

// Add your JavaScript code here
document.getElementById("generateBtn").addEventListener("click", function () {
const name = document.getElementById("name").value;
const id = document.getElementById("id").value;
holdName = name;

if (name === "" || id === "") {
alert("Please enter both name and ID.");
return;
}

const data = JSON.stringify({ name: name, id: id });

const qrcodeContainer = document.getElementById("qrcode");
qrcodeContainer.innerHTML = ""; // Clear the container

qrcodeContainer.style.textAlign = 'center';
qrcodeContainer.style.display = 'flex';
qrcodeContainer.style.justifyContent = 'center';
qrcodeContainer.style.alignItems = 'center';


const qrCode = new QRCode(qrcodeContainer, {
text: data,
width: 200,
height: 200,
colorDark: "#000000",
colorLight: "#eceaea",
correctLevel: QRCode.CorrectLevel.H,
});

document.getElementById("downloadBtn").hidden = false;

//hit a post api to save the data
fetch("https://iba-convocation.herokuapp.com/participants", {
method: "POST",
headers: {
    "Content-Type": "application/json",
},
body: data,
})
.then((response) => response.json())
.then((data) => {
    console.log("Success:", data);
})
.catch((error) => {
    console.error("Error:", error);
});

});

document.getElementById("downloadBtn").addEventListener("click", function () {
const canvas = document.querySelector("#qrcode canvas");
const imgDataUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
const link = document.createElement("a");
link.href = imgDataUrl;
console.log(holdName)
link.download = holdName + ".png";
link.click();
});
