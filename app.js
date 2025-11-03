document.addEventListener("DOMContentLoaded", () => {
  /* =============================
      PRICING TOGGLE LOGIC
  ============================= */
  const toggle = document.getElementById("billingToggle");

  const prices = {
    starter: document.getElementById("starter-price"),
    standard: document.getElementById("standard-price"),
    pro: document.getElementById("pro-price"),
  };

  // Monthly prices in NGN
  const monthly = {
    starter: 15000,
    standard: 30000,
    pro: 55000,
  };

  // Annual = 18% discount
  const discountRate = 0.18;

  const formatNGN = (value) =>
    "₦" + value.toLocaleString("en-NG", { maximumFractionDigits: 0 });

  function updatePrices(isAnnual) {
    for (const key in prices) {
      const base = monthly[key];
      const priceValue = isAnnual
        ? Math.round(base * 12 * (1 - discountRate))
        : base;

      const period = isAnnual ? "/yr" : "/mo";

      // Add a fade effect for smooth switching
      prices[key].classList.add("fade-out");
      setTimeout(() => {
        prices[key].innerHTML = ${formatNGN(priceValue)}<span class="period">${period}</span>;
        prices[key].classList.remove("fade-out");
        prices[key].classList.add("fade-in");
        setTimeout(() => prices[key].classList.remove("fade-in"), 300);
      }, 200);
    }
  }

  // Initialize default monthly
  updatePrices(false);

  toggle.addEventListener("change", (e) => updatePrices(e.target.checked));

  /* =============================
      CONTACT SALES MODAL LOGIC
  ============================= */
  const salesModal = document.getElementById("salesModal");
  const openBtn = document.getElementById("contactSales");
  const closeBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelModal");
  const form = document.getElementById("salesForm");

  function openModal() {
    salesModal.setAttribute("aria-hidden", "false");
    salesModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    salesModal.classList.remove("open");
    salesModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    form.reset();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Close modal on outside click
  salesModal.addEventListener("click", (e) => {
    if (e.target === salesModal) closeModal();
  });

  // Handle form submit (dummy)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Request sent! Our sales team will contact you shortly.");
    closeModal();
  });
});