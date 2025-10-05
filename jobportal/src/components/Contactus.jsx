
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ContactUs.css";
import Navbar from "./Navbar";

function ContactUs() {
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatStep, setChatStep] = useState(0);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        console.log("Form Submitted:", formData);
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 2000);
      }, 800);
    }
  };

  // Handle text input send
  const handleChatSend = () => {
    if (chatInput.trim()) {
      const newMessage = { text: chatInput, from: "user" };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput("");

      if (chatStep === 0) {
        // First bot reply
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            { text: "👋 Thanks for reaching out! How can I help you today?", from: "bot" },
            { text: "Please choose one of the following options:", from: "bot" },
          ]);
        }, 800);
        setChatStep(1);
      }
    }
  };

  // Handle option click
  const handleOptionClick = (option) => {
    setChatMessages((prev) => [...prev, { text: option, from: "user" }]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: `You selected: ${option}`, from: "bot" },
        { text: "📞 For further assistance, please call us directly at +91 98765 43210", from: "bot" },
        { text: "Can I help you with anything else?", from: "bot" },
      ]);
    }, 800);

    setChatStep(2);
  };

  // Handle Yes/No follow-up
  const handleFollowUp = (choice) => {
    setChatMessages((prev) => [...prev, { text: choice, from: "user" }]);

    if (choice === "No, thank you") {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "🙏 Thank you for contacting us! Have a great day!", from: "bot" },
        ]);
      }, 800);
      setChatStep(3); // end
    } else {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "👋 Sure! How can I help you today?", from: "bot" },
          { text: "Please choose one of the following options:", from: "bot" },
        ]);
      }, 800);
      setChatStep(1); // loop back to options
    }
  };

  return (<>
    {/* <Navbar/> */}
    <div className="page-container">
      <div className="contact-container">
        <h2 className="contact-title">📩 Contact Us</h2>
        <p className="contact-subtitle">
          Have questions or feedback? Fill out the form or reach us directly.
        </p>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Phone Number
            <PhoneInput
              country={"in"}
              enableSearch={true}
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              inputStyle={{
                width: "100%",
                borderRadius: "8px",
                padding: "12px",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <label>
            Message
            <textarea
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>

          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Send Message"}
          </button>

          {submitted && (
            <div className="success">
              ✅ Your message has been sent successfully. <br />
              Our team will reach out to you shortly.
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="contact-details">
          <h3>Our Contact Info</h3>
          <p>📍 Address: Salt Lake, Sector V, Kolkata, India</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>✉️ Email: jobnest@gmail.com</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="faq-title">❓ Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How can I register on Job Portal?</h4>
            <p>
              Simply click on the Sign Up button, fill in your details, and verify your email to get started.
            </p>
          </div>

          <div className="faq-item">
            <h4>Is posting a job free?</h4>
            <p>
              Yes, employers can post a limited number of jobs for free. Premium plans are also available for more features.
            </p>
          </div>

          <div className="faq-item">
            <h4>How do I reset my password?</h4>
            <p>
              Click on 'Forgot Password' on the login page and follow the instructions to reset your password.
            </p>
          </div>

          <div className="faq-item">
            <h4>How can I contact support?</h4>
            <p>
              You can fill out this form or email us at jobnest@gmail.com. We usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Live Chat Section */}
      <div className="chat-section">
        <h2 className="faq-title">💬 Live Chat</h2>
        <div className="chat-box">
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {/* Show options */}
            {chatStep === 1 && (
              <div className="chat-options">
                <button onClick={() => handleOptionClick("Job Seeker Help")}>1️⃣ Job Seeker Help</button>
                <button onClick={() => handleOptionClick("Employer / Recruiter Help")}>2️⃣ Employer Help</button>
                <button onClick={() => handleOptionClick("Account & Login Issues")}>3️⃣ Account Issues</button>
                <button onClick={() => handleOptionClick("Other Queries")}>4️⃣ Other Queries</button>
              </div>
            )}

            {/* Follow-up Yes/No */}
            {chatStep === 2 && (
              <div className="chat-options">
                <button onClick={() => handleFollowUp("Yes, more help")}>✅ Yes, more help</button>
                <button onClick={() => handleFollowUp("No, thank you")}>❌ No, thank you</button>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
            />
            <button type="button" onClick={handleChatSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactUs;
