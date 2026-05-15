window.onload = function() {
  const popup = document.getElementById("indicatorPopup");
  const overlay = document.getElementById("popupOverlay");
  const closeBtn = document.getElementById("popupClose");
  const dontShowCheckbox = document.getElementById("dontShowAgain");
  const remindBtn = document.getElementById("remindLater");

  // Check localStorage
  const hideForever = localStorage.getItem("hideIndicatorPopup");
  const remindUntil = localStorage.getItem("remindIndicatorPopupUntil");
  const now = new Date();

  if (!hideForever && (!remindUntil || new Date(remindUntil) < now)) {
    popup.style.display = "block";
    overlay.style.display = "block";

    // Auto-dismiss after 30 seconds
    setTimeout(() => dismissPopup(), 30000);
  }

  // Manual dismiss
  closeBtn.onclick = function() {
    if (dontShowCheckbox.checked) {
      localStorage.setItem("hideIndicatorPopup", "true");
    }
    dismissPopup();
  };

  // Remind me later (snooze for 1 day)
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
