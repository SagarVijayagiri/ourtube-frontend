import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

export const Signup = () => {
  const [channelname, setchannelname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('');
  const [logo, setlogo] = useState(null);
  const [imageurl, setimageurl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isloading,setloading]=useState('');
  const navigate = useNavigate();

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageurl(URL.createObjectURL(file));
      setlogo(file); // This was missing
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = new FormData();
    formdata.append('channelname', channelname);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('phone', phone);
    formdata.append('logo', logo);

    axios.post('https://ourtubeapi1.onrender.com/user/signup', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      setloading(false)
      console.log(res);
      setSuccessMessage("Signup successful!");
     navigate('/login');
     toast("account created...");
    })
    .catch(err => {
      setloading(false)
      console.error("Signup error:", err);
      toast.error(err.response.data.error);
    });
  };

  return (
    <div className="main-wrapper">
      <div className="wrapper-header">
        <img className="logo-image" src="/logo.png" alt="app logo" />
        <h2 className="c-name">Our Tube</h2>
      </div>

      <form className="form-wrapper" onSubmit={submithandler}>
        <input required onChange={(e) => setchannelname(e.target.value)} type="text" placeholder="Channel name" />
        <input required onChange={(e) => setemail(e.target.value)} type="email" placeholder="Email" />
        <input required onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
        <input required onChange={(e) => setphone(e.target.value)} type="text" placeholder="Phone" />
        <input required onChange={fileHandler} type="file" />
        {imageurl && <img className="preview-image" alt="logo preview" src={imageurl} />}
        <button type="submit">{isloading && <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>}Submit</button>
        <Link to='/login' className="link">already have an account? Login</Link>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};