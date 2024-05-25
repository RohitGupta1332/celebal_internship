import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    state: '',
    pan: '',
    aadhar: ''
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigate('/success', { state: { formValues } });
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const aadharRegex = /^[2-9]{1}[0-9]{3}(\s?[0-9]{4}){2}$/;

    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 characters';
    } else if (values.password.length > 8) {
      errors.password = 'Password must be less than 8 characters';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    }
    if (!values.country) {
      errors.country = 'Country is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.pan) {
      errors.pan = 'Pan Number is required';
    } else if (!panRegex.test(values.pan)) {
      errors.pan = 'This is not a valid pan number';
    }
    if (!values.aadhar) {
      errors.aadhar = 'Aadhar number is required';
    } else if (!aadharRegex.test(values.aadhar)) {
      errors.aadhar = 'This is not a valid aadhar number';
    }
    return errors;
  };

  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "WEdWVmJqa1RldElaeFdFMXJmUld4bUYwSDlhS2FwbmZITnJ4aWJKcg==");

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  useEffect(() => {
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCountries(result);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setCountries([]);
      });
  }, []);

  const handleState = (res) => {
    const { name, value } = res.target;
    fetch(`https://api.countrystatecity.in/v1/countries/${value}/states`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setStates(result);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
        setStates([]);
      });

    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" placeholder="First Name" value={formValues.firstName} onChange={handleChange} />
        <p>{formErrors.firstName}</p>

        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name" value={formValues.lastName} onChange={handleChange} />
        <p>{formErrors.lastName}</p>

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
        <p>{formErrors.email}</p>

        <label htmlFor="password">Password</label>
        <div className='password'>
          <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
          <label htmlFor="showPassword">
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={handlePassword} />
            Show
          </label>
        </div>
        <p>{formErrors.password}</p>

        <label htmlFor="phone">Phone No</label>
        <input type="tel" name="phone" id="phone" placeholder="Phone No" value={formValues.phone} onChange={handleChange} />
        <p>{formErrors.phone}</p>

        <label htmlFor="country">Country</label>
        <select name="country" id="country" onChange={handleState} value={formValues.country}>
          <option value="">--Select country--</option>
          {countries.map(country => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
        <p>{formErrors.country}</p>

        <label htmlFor="state">State</label>
        <select name="state" id="state" value={formValues.state} onChange={handleChange}>
          <option value="">--Select state--</option>
          {states.map(state => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
        <p>{formErrors.state}</p>

        <label htmlFor="pan">Pan Number</label>
        <input type="text" name="pan" id="pan" placeholder="Pan Number" value={formValues.pan} onChange={handleChange} />
        <p>{formErrors.pan}</p>

        <label htmlFor="aadhar">Aadhar Number</label>
        <input type="text" name="aadhar" id="aadhar" placeholder="Aadhar Number" value={formValues.aadhar} onChange={handleChange} />
        <p>{formErrors.aadhar}</p>

        <input type="submit" value="Submit" className="submit" disabled={Object.keys(formErrors).length > 0} />
      </form>
    </div>
  );
};

export default App;
