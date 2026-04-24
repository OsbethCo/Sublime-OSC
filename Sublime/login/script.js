let users = JSON.parse(localStorage.getItem("users")) || {};

// ----------------------
// CAMBIAR FORMULARIO
// ----------------------
function toggleForm() {
  document.querySelector(".login-form").classList.toggle("active");
  document.querySelector(".register-form").classList.toggle("active");
}

// ----------------------
// VALIDACIONES
// ----------------------
function setError(input, message, errorId) {
  input.classList.add("error");
  input.classList.remove("success");
  document.getElementById(errorId).innerText = message;
}

function setSuccess(input, errorId) {
  input.classList.remove("error");
  input.classList.add("success");
  document.getElementById(errorId).innerText = "";
}

// ----------------------
// LOGIN
// ----------------------
function login() {
  let email = document.getElementById("loginEmail");
  let pass = document.getElementById("loginPass");

  let valid = true;

  if (email.value === "") {
    setError(email, "Campo requerido", "loginEmailError");
    valid = false;
  } else {
    setSuccess(email, "loginEmailError");
  }

  if (pass.value === "") {
    setError(pass, "Campo requerido", "loginPassError");
    valid = false;
  } else {
    setSuccess(pass, "loginPassError");
  }

  if (!valid) return;

  if (users[email.value] && users[email.value].password === pass.value) {
    alert("Login exitoso");
  } else {
    alert("Credenciales incorrectas");
  }
}

// ----------------------
// REGISTRO
// ----------------------
function register() {
  let name = document.getElementById("regName");
  let email = document.getElementById("regEmail");
  let pass = document.getElementById("regPass");
  let pass2 = document.getElementById("regPass2");

  let valid = true;

  if (name.value === "") {
    setError(name, "Campo requerido", "regNameError");
    valid = false;
  } else {
    setSuccess(name, "regNameError");
  }

  if (!email.value.includes("@")) {
    setError(email, "Email inválido", "regEmailError");
    valid = false;
  } else {
    setSuccess(email, "regEmailError");
  }

  if (pass.value.length < 4) {
    setError(pass, "Mínimo 4 caracteres", "regPassError");
    valid = false;
  } else {
    setSuccess(pass, "regPassError");
  }

  if (pass.value !== pass2.value) {
    setError(pass2, "No coinciden", "regPass2Error");
    valid = false;
  } else {
    setSuccess(pass2, "regPass2Error");
  }

  if (!valid) return;

  if (users[email.value]) {
    alert("Usuario ya existe");
    return;
  }

  users[email.value] = {
    name: name.value,
    password: pass.value
  };

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registro exitoso");
  toggleForm();
}