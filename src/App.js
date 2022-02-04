
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showRead, setRead] = useState(true);
  const [inputValues, setInputValues] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    colorCode: "#ffffff",
  });
  
  const [avtar, setAvtar] = useState('');
  const [errors, setErrors] = useState({})

  useEffect(() =>{
  const parsedValues = JSON.parse(localStorage.getItem('User'));

  if(parsedValues){
    setInputValues({
      userName: parsedValues.userName,
      email:  parsedValues.email,
     password:  parsedValues.password,
     phoneNumber:  parsedValues.phoneNumber,
     bio:  parsedValues.bio,
     colorCode:  parsedValues.colorCode,
     
 }); 
 setAvtar(parsedValues.avtar)   
  }
  
  else{
    
  }
  console.log('useeffect', parsedValues);
   },[])

  const handleToggle = () => {
    setRead(!showRead)
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setAvtar(URL.createObjectURL(img));
    }
  };

   const handleSubmit = (event) => {
    event.preventDefault();
      const data = {
        userName: inputValues.userName,
        email: inputValues.email,
        password: inputValues.password,
        phoneNumber: inputValues.phoneNumber,
        bio: inputValues.bio,
        colorCode: inputValues.colorCode,
        avtar:avtar
      }  
      if(validate()){     
        alert('Demo Form is submited');
        setInputValues({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        bio: "",
        colorCode: "#ffffff",
      }); 
      setAvtar('')
      localStorage.setItem('User',JSON.stringify(data));  
    } 
    else{
      alert('Error occurred');
    }  
  };

  const validate =() =>{
    const input = {...inputValues};
    let  errors = {};
    let isValid = true;

    if (!input.email) {
      isValid = false;
      errors.email = "Please enter your email Address.";
    }

    if (typeof input.email !== "undefined") {
        const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if (!emailPattern.test(input.email)) {
        isValid = false;
        errors.email = "Please enter valid email address.";
      }
    }

    if (!input.phoneNumber) {
      isValid = false;
      errors.phoneNumber = "Please enter your phone number.";
    }
    if (typeof input.phoneNumber !== "undefined") {  // string !=== undefined
      var phonePattern = new RegExp(/^[0-9\b]+$/);
      if (!phonePattern.test(input.phoneNumber)) {
        isValid = false;
        errors.phoneNumber = "Please enter only number.";
      }else if(input.phoneNumber.length !== 10){
        isValid = false;
        errors.phoneNumber = "Please enter valid phone number.";
      }
    } 
    setErrors(errors);
    return isValid;
};
const styleObj = {
  background : inputValues.colorCode
}
console.log("Avtar",typeof avtar);
  return (
    <div className="container"
          style={styleObj}>
      <div className="mb-3">
        <label className="switch">
           <input type="checkbox"
                  onClick={handleToggle}/>
            <span className="slider"></span>
        </label>{showRead ? "Read" : "Edit"}
      </div>
      <form 
        onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUserName" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="InputYUserName"
            placeholder="Enter Your Name...."
            onChange={handleChange}
            name="userName"
            value={inputValues.userName}
            disabled={showRead}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="InputEmail1"
            placeholder="Enter Your Email-Id...."
            onChange={handleChange}
            name="email"
            value={inputValues.email}
            disabled={showRead}
          />
          {errors.email && <div className="alert alert-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            onChange={handleChange}
            name="password"
            value={inputValues.password}
            disabled={showRead}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="InputNumber"
            placeholder="Enter Your Phone Number...."
            onChange={handleChange}
            name="phoneNumber"
            value={inputValues.phoneNumber}
            disabled={showRead}
          />
           {errors.phoneNumber && <div className="alert alert-danger">{errors.phoneNumber}</div>}
        </div>

        <div className="mb-3">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Change Your Profile</h5>
              <input
                type="file"
                name="avatar"
                value={inputValues.avtar}
                onChange={handleImage}
                disabled={showRead}
              />
            </div>{avtar ? <img src={avtar} alt="avtar" className="img-thumbnail"></img> : "Please Upload the Image." }
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputBio" className="form-label">
            Bio
          </label>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here..."
              id="floatingTextarea"
              value={inputValues.bio}
              name="bio"
              onChange={handleChange}
              disabled={showRead}
            ></textarea>
          </div>
        </div>

        <div className="mb-3" >
          <label className="form-label" htmlFor="favcolor">
            Select your favorite color:{""}
          </label>
          <input
            type="color"
            id="favcolor"
            name="colorCode"
            value={inputValues.colorCode}
            onChange={handleChange}
            disabled={showRead}
          />
          <br />
        </div>
        <button type="submit" 
                className="btn btn-primary"
                disabled={showRead}
                >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
