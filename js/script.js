async function generateQRCode() {
    const url = document.getElementById("url").value;
    if (!url) {
        alert("Please enter a URL.");
        return;
    }

    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; 

    new QRCode(qrCodeContainer, {
        text: url,
        width: 200,
        height: 200,
    });

    saveToHistory(url); // Lưu URL vào lịch sử

    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
}

function saveToHistory(url) {
    let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    history.push(url);
    localStorage.setItem("qrHistory", JSON.stringify(history));
}

// Hiển thị lịch sử
function showHistory() {
    const history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = ""; 

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history available.</li>";
    } else {
        history.forEach(url => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
            historyList.appendChild(listItem);
        });
    }

    document.getElementById("overlay").style.display = "block";
    document.getElementById("historyPopup").style.display = "block";
}

// Đóng popup 
function closeHistoryPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("historyPopup").style.display = "none";
}

// Đóng popup QR code
function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}

// QR download
function downloadQRCode() {
    const qrCodeImage = document.querySelector("#qrcode img");
    if (qrCodeImage) {
        const link = document.createElement("a");
        link.href = qrCodeImage.src;
        link.download = "qrcode.png"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
