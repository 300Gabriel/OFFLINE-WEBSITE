const validCode = "WAEC2025"
const accessDays = 7
const accessTime = accessDays * 24 * 60 * 60 * 1000

function checkCode() {
  const input = document.getElementById("codeInput").value
  const message = document.getElementById("message")

  if (input === validCode) {
    const now = Date.now()
    localStorage.setItem("accessCode", input)
    localStorage.setItem("expiry", now + accessTime)
    unlock()
  } else {
    message.textContent = "Wrong code. Try again"
  }
}

function unlock() {
  document.getElementById("lock").style.display = "none"
  document.getElementById("content").style.display = "block"
}

window.onload = () => {
  const savedCode = localStorage.getItem("accessCode")
  const expiry = localStorage.getItem("expiry")

  if (savedCode === validCode && Date.now() < expiry) {
    unlock()
  } else if (Date.now() > expiry) {
    localStorage.clear()
    document.getElementById("message").textContent = "Code expired. Contact admin"
  }
}
