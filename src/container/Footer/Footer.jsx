import React, { useState } from "react";
import { images } from "../../constants";
import { AppWrapp, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
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
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
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
          <button type="button" className="p-text" onClick={handleSubmit}>
            {loading ? "Sending" : "Send a message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for get in touch</h3>
        </div>
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
