import React from 'react'

export const RadioInputs = ({ labelOne,
labelTwo,
labelThree,
idOne,
idTwo,
type,
name,
onChangeHandler,
errorFields,
}) => {
  return (
    <div className="inputsection">
    <label htmlFor="radio">{labelOne} </label>

    <label htmlFor="">{labelTwo}</label>
    <input type={type} name={name} value="male" onChange={onChangeHandler} />

    <label htmlFor="">{labelThree}</label>
    <input type={type} name={name} value="female" onChange={onChangeHandler} />

    {errorFields[name] && <p className="danger">{labelOne} is required</p>}
</div>
  )
}
