import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export const Login = () => {
  const [channelname, setchannelname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isloading,setloading]=useState('');
  const navigate = useNavigate();

  

  const submithandler = (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    
    formdata.append('email', email);
    formdata.append('password', password);

    axios.post('https://ourtubeapi1.onrender.com/user/login', {
      email:email,
      password:password
    })
    .then(res => {
      setloading(false)
      console.log(res);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('userid',res.data._id)
      localStorage.setItem('channelname',res.data.channelname)
      localStorage.setItem('logourl',res.data.logourl)
      toast("welcome to our tube")
      navigate('/')
    })
    .catch(err => {
      setloading(false)
      console.log(err.response.data.error)
      toast.error(err.response.data.error)
    });
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper-header">
        <img className="logo-image" src="/logo.png" alt="app logo" />
        <h2 className="c-name">Our Tube</h2>
      </div>

      <form className="form-wrapper" onSubmit={submithandler}>
        <input required onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" />
        <input required onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
        <button type="submit">{isloading && <i className="fa-solid fa-circle-notch fa-spin"></i>}Submit</button>
        <Link to='/signup' className="link">Create Account</Link>
      </form>
    </div>
  );
};