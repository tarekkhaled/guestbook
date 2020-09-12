import React, { Fragment } from "react";

export default function FormField({
  formInfo: {
    element,
    label,
    value,
    config,
    vaild,
    vaildationMessage,
    withIcon,
    iconClass,
    inputAdditionalClasses
  },
  inputAdditionalStyles,
  formID,
  onTyping
}) {
  const showError = () => {
    let errorMessage = null;
    if (!vaild && vaildationMessage) {
      errorMessage = (
        <div className="form-field-error-TK">{vaildationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderInput = () => {
    return (
      <Fragment>
        <div className="form-field">
          {withIcon ? <i className={iconClass} /> : null}
          <input
            onChange={(e) => {
              onTyping({ value: e.target.value, formID });
            }}
            {...config}
            className={`form-field-input-TK ${inputAdditionalClasses}`}
            style={{ ...inputAdditionalStyles }}
            value={value}
          />
        </div>
        {showError()}
      </Fragment>
    );
  };

  const showTheField = () => {
    switch (element) {
      case "input":
        return renderInput();
      default:
        break;
    }
  };
  return showTheField();
}
