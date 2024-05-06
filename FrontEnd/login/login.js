class LoginPage {
  constructor() {
    // initilization
    this.email = document.getElementById("email");
    this.password = document.getElementById("password");
    this.form = document.querySelector("form");
    this.errorMessage = document.querySelector(".error");
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.email.value,
          password: this.password.value,
        }),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("La récupération n'a pas abouti");
    }
  }
}

new LoginPage();
