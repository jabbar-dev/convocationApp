// check if user is already logged in
if (localStorage.getItem('username') !== 'jabbar') {
    // if not, redirect to login page
    window.location.replace('./index.html');
}

document.getElementById("generateBtn").addEventListener("click", function () {
    // rest of the code for generating QR code
});

document.getElementById("downloadBtn").addEventListener("click", function () {
    // rest of the code for downloading QR code
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem('username');
    window.location.replace('./index.html');
});

// ... (rest of the code above remains the same)

document.getElementById("generateSlipsBtn").addEventListener("click", function () {
    const csvFileInput = document.getElementById("csvFileInput");
    csvFileInput.click();
    csvFileInput.addEventListener("change", function () {
        const file = csvFileInput.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const participants = reader.result.split("\n").map(row => {
                const [name, id, department, allowedParticipants] = row.split(",");
                return { name, id, department, allowedParticipants };
            });
            if (participants.some(p => p.name === "" || p.id === "" || p.department === "" || p.allowedParticipants === "")) {
                alert("Please enter name, ID, department, and number of allowed participants for all participants in the CSV file.");
                return;
            }
            const qrcodeContainer = document.getElementById("qrcode");
            qrcodeContainer.innerHTML = ""; // Clear the container
            qrcodeContainer.style.textAlign = 'center';
            qrcodeContainer.style.display = 'flex';
            qrcodeContainer.style.justifyContent = 'center';
            qrcodeContainer.style.alignItems = 'center';
            const zip = new JSZip();
            const status = document.getElementById("status");

            // ... (rest of the code above remains the same)

const slipPromises = participants.map(p => {
    return new Promise((resolve) => {
        const data = JSON.stringify(p);
        
        
        const tempContainer = document.createElement("div");
const qrCode = new QRCode(tempContainer, {
    text: data,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
});
const canvas = tempContainer.getElementsByTagName("canvas")[0];

        const slip = document.createElement("div");
        slip.style.border = "1px solid";
        slip.style.borderColor = "rgb(219, 216, 216)";
        slip.style.borderRadius = "15px";
        slip.style.padding = "25px";
        slip.style.marginTop = "25px";
        slip.style.display = "flex";
        slip.style.flexDirection = "column";
        slip.style.alignItems = "flex-start";
        slip.style.width = "45%"; // Set slip width to 70%

        const heading1 = document.createElement("h1");
        heading1.innerHTML = "Sukkur IBA University";
        slip.appendChild(heading1);
        const heading4 = document.createElement("h4");
        heading4.innerHTML = "Convocation 2023";
        slip.appendChild(heading4);
        const heading6 = document.createElement("h6");
        heading6.innerHTML = "Entry Slip";
        slip.appendChild(heading6);

        const infoAndQrContainer = document.createElement("div");
        infoAndQrContainer.style.display = "flex";
        infoAndQrContainer.style.alignItems = "center";
        
infoAndQrContainer.style.flexDirection = "row-reverse"; // Add space between fields and QR code

const infoContainer = document.createElement("div");
infoContainer.style.marginRight = "20px"; // Add margin to the right of the infoContainer

const nameElement = document.createElement("p");
nameElement.innerHTML = `NAME : ${p.name.toUpperCase()}`;
nameElement.style.fontSize = "20px";
infoContainer.appendChild(nameElement);

const idElement = document.createElement("p");
idElement.innerHTML = `CMS : ${p.id.toUpperCase()}`;
idElement.style.fontSize = "20px";
infoContainer.appendChild(idElement);

const departmentElement = document.createElement("p");
departmentElement.innerHTML = `DEPARTMENT : ${p.department.toUpperCase()}`;
departmentElement.style.fontSize = "20px";
infoContainer.appendChild(departmentElement);

const allowedParticipantsElement = document.createElement("p");
allowedParticipantsElement.innerHTML = `ALLOWED GUESTS : ${p.allowedParticipants}`;
allowedParticipantsElement.style.fontSize = "20px";
infoContainer.appendChild(allowedParticipantsElement);

infoAndQrContainer.appendChild(infoContainer);

const qrCodeContainer = document.createElement("div");
qrCodeContainer.style = "display:inline-block; padding-right: 100px;";
const imgElement = document.createElement("img");
imgElement.src = canvas.toDataURL("image/png");
imgElement.width = 150;
imgElement.height = 150;
imgElement.style="float:right;"
qrCodeContainer.appendChild(imgElement);
infoAndQrContainer.appendChild(qrCodeContainer);

slip.appendChild(infoAndQrContainer);

const footer = document.createElement("p");
footer.innerHTML = "Generated By ICT Department SIBA";
footer.style.fontSize = "10px";
footer.style.marginTop = "10px";
footer.style.marginLeft = "auto";
slip.appendChild(footer);

document.body.appendChild(slip);

html2canvas(slip).then(function (canvas) {
    const imgDataUrl = canvas.toDataURL("image/png");
    const imgData = imgDataUrl.split(",")[1];
    zip.file(`${p.id}.png`, imgData, { base64: true });
    console.log(p);
    qrcodeContainer.innerHTML = "";
    resolve();
});
});
});

// ... (rest of the code below remains the same)

Promise.all(slipPromises).then(() => {
zip.generateAsync({ type: "blob" }).then(function (blob) {
    
saveAs(blob, "slips.zip");
});
});
};
});
});

