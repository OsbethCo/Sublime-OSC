// Base de datos simulada
let users = JSON.parse(localStorage.getItem("users")) || {};

// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (users[user] && users[user].password === pass) {
    alert("Login exitoso");
  } else {
    alert("Datos incorrectos");
  }
}

// REGISTRO
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (users[user]) {
    alert("Usuario ya existe");
    return;
  }

  users[user] = { password: pass };

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrado correctamente");
  closeModals();
}

// RECUPERAR
function recover() {
  let user = document.getElementById("recUser").value;
  let newPass = document.getElementById("newPass").value;

  if (!users[user]) {
    alert("Usuario no existe");
    return;
  }

  users[user].password = newPass;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Contraseña actualizada");
  closeModals();
}

// MODALES
function showRegister() {
  document.getElementById("registerModal").style.display = "block";
}

function showRecover() {
  document.getElementById("recoverModal").style.display = "block";
}

function closeModals() {
  document.getElementById("registerModal").style.display = "none";
  document.getElementById("recoverModal").style.display = "none";
}