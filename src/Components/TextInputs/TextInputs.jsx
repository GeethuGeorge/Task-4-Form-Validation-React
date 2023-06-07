import React from 'react'

export const TextInputs = ({label, type, name, id, onChangeHandler, onBlurHandler, errorFields}) => {
  return (
    <div className="inputsection">
    <label htmlFor={id}>{label}<span className="danger">*</span></label>
    <input
        type={type}
        name={name}
        id={id}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
    />
    {errorFields[name] && <p className="danger">{label} is required</p>}
</div>
  )
}
