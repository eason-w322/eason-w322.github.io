// Interactive Results Table
document.querySelectorAll(".result-row").forEach(row => {
  row.addEventListener("click", () => {
    const img = row.getAttribute("data-img");
    const name = row.getAttribute("data-name");
    const g = row.getAttribute("data-g");
    const r = row.getAttribute("data-r");
    const time = row.getAttribute("data-time");

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const caption = document.getElementById("modalCaption");

    if (img) {
      modal.style.display = "block";
      modalImg.src = img;
      caption.innerHTML = `<strong>${name}</strong><br>
                           G offset: ${g}<br>
                           R offset: ${r}<br>
                           Time: ${time}`;
    }
  });
});

// Close modal
document.querySelector(".close").onclick = function () {
  document.getElementById("imageModal").style.display = "none";
};
✅ CSS Additions (append to styles.css)
css
Copy code
.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 0.95rem;
}
.results-table th, .results-table td {
  border: 1px solid var(--border);
  padding: 10px;
  text-align: center;
}
.results-table th {
  background: var(--panel);
  color: var(--accent);
  font-weight: 600;
}
.results-table td img {
  width: 100px;
  border-radius: 8px;
}
.result-row {
  cursor: pointer;
  transition: background 0.2s ease;
}
.result-row:hover {
  background: #1a1f2e;
}
.placeholder {
  text-align: center;
  color: var(--muted);
  font-style: italic;
}

/* Modal styling */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  padding-top: 60px;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.9);
}
.modal-content {
  display: block;
  margin: auto;
  max-width: 80%;
  border-radius: 12px;
}
#modalCaption {
  margin: 20px auto;
  text-align: center;
  color: var(--text);
}
.close {
  position: absolute;
  top: 20px; right: 35px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
.close:hover { color: var(--accent); }
