window.onload = function() {
  const popup = document.getElementById("indicatorPopup");
  const overlay = document.getElementById("popupOverlay");
  const closeBtn = document.getElementById("popupClose");
  const dontShowCheckbox = document.getElementById("dontShowAgain");
  const remindBtn = document.getElementById("remindLater");

  const hideForever = localStorage.getItem("hideIndicatorPopup");
  const remindUntil = localStorage.getItem("remindIndicatorPopupUntil");
  const now = new Date();

  if (!hideForever && (!remindUntil || new Date(remindUntil) < now)) {
    popup.style.display = "block";
    overlay.style.display = "block";
    setTimeout(() => dismissPopup(), 30000);
  }

  closeBtn.onclick = function() {
    if (dontShowCheckbox.checked) {
      localStorage.setItem("hideIndicatorPopup", "true");
    }
    dismissPopup();
  };

  remindBtn.onclick = function() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem("remindIndicatorPopupUntil", tomorrow.toISOString());
    dismissPopup();
  };

  function dismissPopup() {
    popup.classList.add("fade-out");
    overlay.classList.add("fade-out");
    setTimeout(() => {
      popup.style.display = "none";
      overlay.style.display = "none";
      popup.classList.remove("fade-out");
      overlay.classList.remove("fade-out");
    }, 500);
  }
};
