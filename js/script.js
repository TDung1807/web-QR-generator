async function generateQRCode() {
    const url = document.getElementById("url").value;
    if (!url) {
        alert("Please enter a URL.");
        return;
    }

    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; // Xóa mã QR trước đó

    new QRCode(qrCodeContainer, {
        text: url,
        width: 200,
        height: 200,
    });

    saveToHistory(url); // Lưu URL vào lịch sử

    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
}

// Cập nhật hàm lưu vào lịch sử chỉ để lưu URL
function saveToHistory(url) {
    let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    // Rút gọn link và lưu vào lịch sử
    const shortUrl = url.length > 30 ? url.substring(0, 30) + "..." : url; // Rút gọn link nếu dài hơn 30 ký tự
    history.push({ url: shortUrl });
    localStorage.setItem("qrHistory", JSON.stringify(history));
}

// Hiển thị lịch sử với đường link đã rút gọn
function showHistory() {
    const history = JSON.parse(localStorage.getItem("qrHistory")) || [];
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = ""; // Xóa danh sách trước khi hiển thị lại

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history available.</li>";
    } else {
        history.forEach(({ url }, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <a href="${url}" target="_blank">${url}</a>
                <button onclick="generateFromHistory('${url}')">View QR</button>
            `;
            historyList.appendChild(listItem);
        });
    }

    document.getElementById("overlay").style.display = "block";
    document.getElementById("historyPopup").style.display = "block";
}

// Hàm để đóng popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Hàm để đóng popup lịch sử
function closeHistoryPopup() {
    document.getElementById("historyPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Hàm để tải xuống mã QR
function downloadQRCode() {
    const qrCodeImage = document.querySelector("#qrcode img");
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qrcode.png";
    link.click();
}

// Hàm để tạo mã QR từ lịch sử
function generateFromHistory(url) {
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = ""; // Xóa mã QR trước đó

    new QRCode(qrCodeContainer, {
        text: url,
        width: 200,
        height: 200,
    });

    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
}
