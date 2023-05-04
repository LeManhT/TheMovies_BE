const handleCreateNewUser = async (e) => {
  const username = $(".username").val();
  const password = $(".password").val();
  const confirmPassword = $(".confirmPassword").val();
  const email = $(".email").val();

  try {
    const res = await $.ajax({
      url: "http://localhost:4000/user/api/signUp",
      type: "POST",
      data: {
        username: username,
        password: password,
        passwordConfirm: confirmPassword,
        email: email,
      },
    });
    if (res) {
      window.location.href = '/user/api/login'
    }
  } catch (error) {
    if (error) {
      console.log(error);
      alert(error.responseJSON.message)
    }
  }
};

document.querySelector('.submitBtn').onclick = (e) => {
   e.preventDefault();
   handleCreateNewUser();
}