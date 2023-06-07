import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TextInputs } from "./Components/TextInputs/TextInputs";
import { RadioInputs } from "./Components/RadioInputs/RadioInputs";

function App() {
    //STATE
    const [fields, setFields] = useState({
        firstname: "",
        email: "",
        dob: "",
        gender: "",
        skill: [],
        country: "",
    });

   // console.log(fields);

    //STATE
    const [errorFields, setErrorFields] = useState({
        firstname: false,
        email: false,
        dob: false,
        gender: false,
        skill: false,
        country: false,
    });
    //---------------------------------------------------------------------
    //HANDLER FUNCTION-ON CHANGE for Text , radio, email and drop down
    const onChangeHandler = (event) => {
        setFields((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    //---------------------------------------------------------------------

    //HANDLER FUNCTION-ONSUBMIT -for form attribute

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(fields);
        if (isFormSubmit()) {
            console.log("valid");
            return;
        } else {
            console.log("Invalid");           
        }

        
      
    };

    const isFormSubmit = () => {
        const errors = {
            firstname: false,
            email: false,
            dob: false,
            gender: false,
            skill: false,
            country: false,
        };

        if (fields.firstname === "") {
            errors.firstname = true;
        }

        if (fields.email === "") {
            errors.email = true;
        }
        if (fields.dob === "") {
            errors.dob = true;
        }
        if (fields.gender === "") {
            errors.gender = true;
        }
        if (fields.skill.length === 0) {
            errors.skill = true;
        }
        if (fields.country === "") {
            errors.country = true;
        }

        setErrorFields(errors);

        //to convert object to arrays we use  Object.values(errors) and if atleast one value is true dont submit
        if (Object.values(errors).some((error) => error === true)) {
            return false;
        } else {
            return true;
        }
    };

    //----------------------------------------------

    //HANDLER FUNCTION - ON BLUR for firstname, email

    const onBlurHandler = (event) => {
        let error = false;
        //we can destructure target object
        //const{name, value}=event.target; and use name and value since its used frequently
        if (event.target.name === "firstname" && event.target.value === "") {
            error = true;
        } else if (
            event.target.name === "email" &&
            (event.target.value === "" || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(event.target.value))
        ) {
            error = true;
        } else if (event.target.name === "dob" && event.target.value === "") {
            error = true;
        } else if (event.target.name === "gender" && event.target.value === "") {
            error = true;
        }

        setErrorFields((prev) => ({
            ...prev,
            [event.target.name]: error,
        }));
    };

    //----------------------------------------------------
    //CHECKBOX HANDLER FUNCTION

    const checkboxHandler = (event) => {
        let newSkills = [...fields.skill];

        if (event.target.checked) {
            newSkills.push(event.target.value);
        } else {
            newSkills = newSkills.filter((skill) => {
                return skill != event.target.value;
            });
        }

        setFields((prev) => ({
            ...prev,
            [event.target.name]: newSkills,
        }));
    };

    //---------------------------------------------------
    return (
        <div className="App">
            <div className="container">
                <header>Registration Form</header>
                <form onSubmit={onSubmitHandler}>
                    <TextInputs
                        label="First Name"
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChangeHandler={onChangeHandler}
                        onBlurHandler={onBlurHandler}
                        errorFields={errorFields}
                    />

                    <TextInputs
                        label="Email"
                        type="email"
                        name="email"
                        id="email"
                        onChangeHandler={onChangeHandler}
                        onBlurHandler={onBlurHandler}
                        errorFields={errorFields}
                    />

                    <div className="inputsection">
                        <label htmlFor="">Date of Birth: </label>
                        <input type="date" name="dob" onChange={onChangeHandler} onBlur={onBlurHandler} />
                        {errorFields.dob && <p className="danger">Date of Birth is required</p>}
                    </div>

                    <RadioInputs
                        labelOne="Gender"
                        labelTwo="Male"
                        labelThree="Female"
                        idOne="male"
                        idTwo="female"
                        type="radio"
                        name="gender"
                        onChangeHandler={onChangeHandler}
                        errorFields={errorFields}
                    />

                    <div className="inputsection">
                        <label htmlFor="">Skill: </label>

                        <label htmlFor="">JavaScript </label>
                        <input type="checkbox" name="skill" value="javascript" onChange={checkboxHandler} />
                        <label htmlFor="">HTML </label>
                        <input type="checkbox" name="skill" value="html" onChange={checkboxHandler} />
                        <label htmlFor="">CSS </label>
                        <input type="checkbox" name="skill" value="css" onChange={checkboxHandler} />
                        <label htmlFor="">React </label>
                        <input type="checkbox" name="skill" value="react" onChange={checkboxHandler} />
                        {errorFields.skill && <p className="danger">Please enter your skillsets</p>}
                    </div>

                    <div className="inputsection">
                        <label htmlFor="">Country: </label>
                        <select id="country" name="country" onChange={onChangeHandler}>
                            <option value="select">Select</option>
                            <option value="India">India</option>
                            <option value="UAE">UAE</option>
                            <option value="France">France</option>
                            <option value="Canada">Canada</option>
                        </select>
                        {errorFields.country && <p className="danger">Please enter the name of your country</p>}
                    </div>

                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default App;
