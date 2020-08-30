import React, {useContext} from 'react';
import "./LoginModal.css";
import {StateContext} from '../StateContext';
import { useForm } from 'react-hook-form';
import { useHistory  } from "react-router-dom";


const LoginModal = () => {
  const [state, setState] = useContext(StateContext);
  const history = useHistory();

  const {register, errors, handleSubmit} = useForm({
    mode: "onBlur"
  });
  
  const onSubmit = (data) => {
    const {email, password} = data;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query: `{ login(email: "${email}", password: "${password}"){username, token} }`})
    }).then(r => r.json())
    .then((res) => {
      if (res.data && res.data.login) {
        const {token, username} = res.data.login;
        console.log(`token: ${token}, username: ${username}`);
        setState({...state, usertoken:token, username: username})
        history.push("/home");
      } else {
        setState({...state, loginError: res.errors[0].message})
      }
    });
  };

  return (
    <React.Fragment>
      <section className="login-wrapper">
        <div className="login-content">
          <div className="flex flex-col items-center h-full py-8">
            <h3 className="text-2xl">Login</h3>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 form" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input name="email" 
                  className={(errors.email ? "border-red-500" :"") + " shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} 
                  id="email" 
                  ref={register({required: true, minLength: 3, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})} 
                  type="email" 
                  placeholder="e.g test@mail.com"/>
                <div className="text-red-500 pt-2 text-sm italic">
                  {(errors.email && errors.email.type === "required" && "Field is required") || (errors.email && errors.email.type === "pattern" && "Must be valid email address") || (errors.email && errors.email.type === "minLength" && "Must be at at least 3 characters")}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                  <input 
                    name="password"
                    className={(errors.password ? "border-red-500 " : " ") + "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} 
                    id="password" 
                    type="password" 
                    placeholder="******************" 
                    ref={register({required: true, pattern: /^(?=.{8,})(?=.*[0-9])/})}/>
                <div className="text-red-500 pt-2 text-sm italic">
                  {(errors.password && errors.password.type === "required" && "Field is required") || (errors.password && errors.password.type === "pattern" && "Must be at least 8 characters long and contain a numeric number")}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit">
                  Sign In
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-8" 
                  type="button"
                  onClick={() => {history.push("/register")}}>
                  Register
                </button>
              </div>
              <div className="text-red-500 pt-2 text-sm italic">
                {state.loginError}
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default LoginModal;