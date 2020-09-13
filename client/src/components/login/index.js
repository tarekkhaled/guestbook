import React, { Component } from "react";
import '../signup/signup.css';
import {
  vaildateFN,
  finalCheckOfForm,
  finalFormCheck,
  showTheError,
  getW_authCookie
} from "../../utilities";
import FormField from "../../reComponents/formfield";
import axios from 'axios';

class Login extends Component {

  componentDidMount() {
    if(getW_authCookie()) {
      window.location.assign('/profile/')
    }
  }
  
  state = {
    formSuccess: false,
    formData: {
      email: {
        label: "email",
        element: "input",
        value: "",
        config: {
          type: "email",
          id: "email",
          name: "email",
          placeholder: "enter your email.."
        },
        vaildation: {
          required: true,
          email: true
        },
        vaild: false,
        vaildationMessage: "",
        withIcon: true,
        iconClass: "fas fa-envelope"
      },
      password: {
        label: "password",
        element: "input",
        value: "",
        config: {
          type: "password",
          id: "password",
          name: "password",
          placeholder: "enter your password.."
        },
        vaildation: {
          required: true,
          password: true // check password is greater than or equal 8
        },
        vaild: false,
        vaildationMessage: "",
        withIcon: true,
        iconClass: "fas fa-lock"
      }
    }
  };

  handleFormChange = async ({ value, formID }) => {
    const { formData } = this.state;

    const newFormData = { ...formData };

    const newField = { ...newFormData[formID] };

    // update (value,vaild,vaildationMessage) properties

    newField.value = value;

    const { vaild, error } = await vaildateFN(newField);

    newField.vaild = vaild;

    newField.vaildationMessage = error;
    newFormData[formID] = newField;
    this.setState({
      formData: newFormData,
      formSuccess: vaild ? true : false
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    this.setState(
      {
        formSucess: finalCheckOfForm(formData)
      },
      async () => {
        if (this.state.formSucess) {
          const dataToSubmit = finalFormCheck(formData);
          const response = await axios.post('/auth/login/',dataToSubmit);
          if(response.status === 200)
            window.location.assign('/profile');
        } else {
          showTheError();
        }
      }
    );
  };

  render() {
    const {
      formData: { firstname, lastname, email, password }
    } = this.state;

    return (
      <div className="signup">
        <div className="c1"></div>
        <div className="c2"></div>
        <div className="c3"></div>
        <form
          className="signup__form"
          autoComplete="off"
          onSubmit={this.handleFormSubmit}
        >
          <h2>Log in</h2>
          
          <div className="signup__form__Box email-wrapper">
            <FormField
              formInfo={email}
              formID="email" // must be the same name with formData fields
              onTyping={(data) => {
                this.handleFormChange(data);
              }}
            />
          </div>
          <div className="signup__form__Box">
            <FormField
              formInfo={password}
              formID="password" // must be the same name with formData fields
              onTyping={(data) => {
                this.handleFormChange(data);
              }}
            />
          </div>
          <button className="signup__form_submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
