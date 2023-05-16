const handleLogin = async () => {
    const username = $(".username").val();
    const password = $(".password").val();
    try {
        const res = await $.ajax({
          url: "http://localhost:4000/user/api/login",
          type: "POST",
          data: {
            username: username,
            password: password,
          },
        });
        if (res) {
          window.location.href = '/'
        }
      } catch (error) {
        if (error) {
          console.log(error);
          alert(error.responseJSON.message)
        }
      }
}

document.querySelector('.loginSubmitBtn').onclick = (e) => {
    e.preventDefault();
    handleLogin();
 }