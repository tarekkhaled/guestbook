export const vaildateFN = ({
    value,
    label,
    vaildation: { required, password, firstName, lastName, email }
  }) => {
    let errorObject = {
      error: "",
      vaild: true
    };
  
    if (firstName) {
      if (value.length < 3) {
        errorObject.error = `${label} must be at least 3 characters !`;
        errorObject.vaild = false;
      }
      if (!/[a-zA-z]/g.test(value)) {
        errorObject.error = `${label} must contains only vaild characters !`;
        errorObject.vaild = false;
      }
    }
  
    if (lastName) {
      if (value.length < 3) {
        errorObject.error = `${label} must be at least 3 characters !`;
        errorObject.vaild = false;
      }
      if (!/[a-zA-z]/g.test(value)) {
        errorObject.error = `${label} must contains only vaild characters !`;
        errorObject.vaild = false;
      }
    }
  
    if (email) {
      if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        errorObject.error = `${label} is not vaild !`;
        errorObject.vaild = false;
      }
      fetch(" https://api.raisely.com/v3/check-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          data: {
            email: value
          }
        })
      })
        .then((response) => response.json())
        .then(({ data: { status } }) => {
          if (status === "EXISTS") {
            const asyncError = document.createElement("div");
            asyncError.classList.add("form-field-error-TK", "email-error");
            asyncError.textContent = "email already existed !";
            document.querySelector(".email-wrapper").append(asyncError);
          } else {
            if (document.querySelector(".email-error"))
              document.querySelector(".email-error").textContent = "";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  
    if (required) {
      if (!value) {
        errorObject.error = `${label} is required !!`;
        errorObject.vaild = false;
      }
    }
  
    if (password) {
      if (value.length < 4) {
        errorObject.error = `${label} must be at least 8 characters !`;
        errorObject.vaild = false;
      }
    }
  
    return errorObject;
};
  
export const finalCheckOfForm = (formData) => {
  let formVaild = true;
  for (let key in formData) {
    if (formData[key].hasOwnProperty("value")) {
      if (!formData[key].value)
        formData[
          key
        ].vaildationMessage = `${formData[key].label} is required !!`;
      formVaild = formData[key].vaild && formVaild;
    }
  }
  return formVaild;
};
  
export const finalFormCheck = (formData) => {
  let formBody = {};
  for (let key in formData) {
    if (typeof formData[key] === "object") formBody[key] = formData[key].value;
  }
  return formBody;
};
  
export const showTheError = () => {
    const errorBox = document.querySelectorAll(".form-field-error-TK");
    errorBox.forEach((errorBox) => (errorBox.style.display = "flex"));
};
  
export const getW_authCookie =() => {
  const cookiesObject = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev
    }, {});
    return cookiesObject.w_auth;
}
