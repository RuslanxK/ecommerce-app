import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const saveData = async (e) => {
    e.preventDefault();

    setContact({ name: "", email: "", message: "" });
    setMessage(true);

    const data = await axios.post(
      "https://ecommerce-app-prods.herokuapp.com/api/customers",
      contact
    );
    console.log(data);
  };

  return (
    <div className="contact-page">
      <div className="contact-inner">
        <div className="form">
          <h1>LEAVE US MESSAGE</h1>

          <form onSubmit={saveData}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
              value={contact.name}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
              value={contact.email}
            />

            <textarea
              type="text"
              placeholder="Message"
              name="message"
              onChange={handleChange}
              required
              value={contact.message}
            />

            <input type="submit" value="SEND" />
          </form>

          {message ? (
            <span id="message">Thank you we will contact you soon!</span>
          ) : null}
        </div>

        <div className="location">
          <div className="div1">
            <div className="icon-div">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div className="address-div">
              <h2>ADDRESS</h2>
              <span>3 North Anderson Road Bronx, NY 10463</span>
            </div>
          </div>
          <div className="div2">
            <div className="icon-div">
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className="address-div">
              <h2>PHONE</h2>
              <span>+1-202-555-0165</span>
            </div>
          </div>
          <div className="div3">
            <div className="icon-div">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div className="address-div">
              <h2>EMAIL</h2>
              <span>contact@cartify.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
