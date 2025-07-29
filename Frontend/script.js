const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");
const userNameInput = document.getElementById("userName");

// Load users on page load
window.onload = () => {
  fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(data => {
      userList.innerHTML = "";
      data.forEach(user => {
        const li = document.createElement("li");
        li.innerText = `${user.id} - ${user.name}`;
        userList.appendChild(li);
      });
    });
};

// Handle form submission
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = userNameInput.value.trim();

  if (name) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(user => {
      const li = document.createElement("li");
      li.innerText = `${user.id} - ${user.name}`;
      userList.appendChild(li);
      userNameInput.value = "";
    });
  }
});
