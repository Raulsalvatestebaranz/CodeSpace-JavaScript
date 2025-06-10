const colors = [
  "#0f172a", "#1e293b", "#334155", "#f43f5e",
  "#14b8a6", "#facc15", "#22c55e", "#6366f1",
  "#ec4899", "#a855f7"
];

function changeColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const selectedColor = colors[randomIndex];

  document.body.style.backgroundColor = selectedColor;
  document.getElementById("color-code").textContent = `Current color: ${selectedColor}`;

  const textColor = isDarkColor(selectedColor) ? "#ffffff" : "#000000";
  document.body.style.color = textColor;
}

function isDarkColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}
