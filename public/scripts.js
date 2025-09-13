const flagsContainer = document.querySelector(".features");

// Load all flags on page load
async function loadFlags() {
  const res = await fetch("/flags");
  const flags = await res.json();
  flagsContainer.innerHTML = ""; // clear previous
  flags.forEach(f => addFlagCard(f));
}

// Add a card to the page
function addFlagCard({ title, description, example }) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3 class="neon">${title}</h3>
    <p>${description}</p>
    <pre><code>${example}</code></pre>
  `;
  flagsContainer.appendChild(card);
}

const copyBtn = document.createElement("button");
copyBtn.className = "copy-btn";
copyBtn.textContent = "Copy";
copyBtn.onclick = () => {
  const fullText = `Title: ${s.title}\nDescription: ${s.description}\nCode:\n${s.code}`;
  navigator.clipboard.writeText(fullText).then(() => {
    // Show temporary feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = originalText, 1200);
  }).catch(() => {
    alert("Copy failed! Please copy manually.");
  });
};
btns.appendChild(copyBtn);


// Add new flag (Owner)
async function addFlag(title, description, example, code) {
  const res = await fetch("/flags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, example, code })
  });
  const data = await res.json();
  if (data.success) loadFlags();
}

// Initial load
loadFlags();
