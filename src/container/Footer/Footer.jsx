import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer, Slide } from "react-toastify";
import { images } from "../../constants";
import { AppWrapp, MotionWrap } from "../../wrapper";
// import { client } from "../../client";
import "./Footer.scss";
import "react-toastify/dist/ReactToastify.min.css";

const Footer = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const notify = (status) => {
    setIsEmailSend(true);

    if (status === 200) {
      toast.success("Thank you for get in touch", {
        position: "top-center",
        transition: Slide,
        closeOnClick: false,
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
    } else {
      toast.error(status, {
        position: "top-center",
        transition: Slide,
        closeOnClick: false,
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
    }

    setTimeout(() => {
      setIsEmailSend(false);
    }, 4000);
  };

  const handleSubmit = () => {
    setLoading(true);

    // save data into sanity
    // const contact = {
    //   _type: "contact",
    //   name: name,
    //   email: email,
    //   message: message,
    // };

    // client.create(contact).then(() => {
    //   setLoading(false);
    //   setIsFormSubmitted(true);
    // });

    // send email by using emailjs
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setFormData({
            name: "",
            email: "",
            message: "",
          });

          setLoading(false);
          notify(result.status);
        },
        (error) => {
          setLoading(false);
          notify(error.text);
        }
      );
  };

  return (
    <>
      <h2 className="head-text">Take a Coffe & Chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className="p-text">
            xyx@email.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+81 (000) 0000-0000" className="p-text">
            +81 (000) 0000-0000
          </a>
        </div>
      </div>
      <form ref={form} className="app__footer-form app__flex">
        <div className="app__flex">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={name}
            className="p-text"
            onChange={handelChangeInput}
          />
        </div>
        <div className="app__flex">
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={email}
            className="p-text"
            onChange={handelChangeInput}
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            name="message"
            value={message}
            className="p-text"
            onChange={handelChangeInput}
          />
        </div>
        <button
          type="button"
          className="p-text"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending" : "Send a message"}
        </button>
      </form>

      {isEmailSend ? (
        <div>
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

// export default Footer;
export default AppWrapp(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
