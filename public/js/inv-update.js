const form = document.querySelector("#updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("#submit_input")
      updateBtn.removeAttribute("disabled")
    })