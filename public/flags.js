const flagContainer = document.querySelector(".features");
const addFlagForm = document.querySelector("#addFlagForm");
const codeInput = document.querySelector("#codeInput");

// Load flags from server
async function loadFlags() {
  const res = await fetch("/flags");
  const flags = await res.json();
  flagContainer.innerHTML = "";
  flags.forEach(f => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3 class="neon">${f.title}</h3>
      <p>${f.description}</p>
      <pre><code>${f.example}</code></pre>
    `;
    flagContainer.appendChild(card);
  });
}
loadFlags();

document.getElementById("flag-search").addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


// Add flag (Owner only)
addFlagForm?.addEventListener("submit", async e => {
  e.preventDefault();
  const code = codeInput.value;
  const title = document.querySelector("#flagTitle").value;
  const description = document.querySelector("#flagDesc").value;
  const example = document.querySelector("#flagExample").value;

  const res = await fetch("/flags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, title, description, example })
  });

  const data = await res.json();
  if (data.success) {
    alert("Flag added!");
    loadFlags();
    addFlagForm.reset();
  } else {
    alert("Not authorized!");
  }
});
