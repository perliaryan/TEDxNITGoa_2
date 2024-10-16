import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    comments: "",
    newsletter: false
  });
  const history = useHistory();
  const [showThanks, setShowThanks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setFormData({ 
          firstName: "",
          lastName: "",
          email: "",
          contactNumber: "",
          comments: "",
          newsletter: false
        });
        
        setShowThanks(true);
        setTimeout(() => {
          setShowThanks(false);
        }, 5000);
        history.push('/ContactUs');
      } else {
        console.error('Error submitting form');
        alert('There was an error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  }

  return (
    <div className="contactUs_main__K5-vK">
      <div className="contactUs_content__GojN3">
        <div>
          <p className="contactUs_title__Kgi-W">Leave Us a Message!!</p>
          <p className="contactUs_para__kMKHs">
            If you would like to subscribe to our Newsletter, have a question about an upcoming event, would like to explore a partnership with TEDxNITGOA, or want to send us a comment or suggestion, simply fill out the form below and we'll get back to you shortly.
          </p>
        </div>
        <img className="contactUs_image__HnRNf" src="/oc.png" alt="" />
      </div>
      <div className="contactUs_formContainer__tPtU6">
        <form name="submit-to-google-sheet" className="contactUs_form__+xwV4" onSubmit={handleSubmit}>
          <input 
            className="contactUs_formField__cPIkI" 
            type="text" 
            name="firstName" 
            placeholder="First Name*" 
            required 
            value={formData.firstName} 
            onChange={handleInputChange} 
          />
          <input 
            className="contactUs_formField__cPIkI" 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={formData.lastName} 
            onChange={handleInputChange} 
          />
          <input 
            className="contactUs_formField__cPIkI" 
            type="email" 
            name="email" 
            placeholder="Email*" 
            required 
            value={formData.email} 
            onChange={handleInputChange} 
          />
          <input 
            className="contactUs_formField__cPIkI" 
            type="tel" 
            name="contactNumber" 
            placeholder="Contact Number*" 
            required 
            value={formData.contactNumber} 
            onChange={handleInputChange} 
          />
          <textarea 
            className="contactUs_comments__UC869 contactUs_formField__cPIkI" 
            name="comments" 
            placeholder="Comments" 
            cols="30" 
            rows="5" 
            value={formData.comments} 
            onChange={handleInputChange}
          ></textarea>
          <label className="contactUs_checkboxContainer__jawZS">
            <input 
              className="contactUs_checkbox__ZFnuD" 
              name="newsletter" 
              type="checkbox" 
              checked={formData.newsletter} 
              onChange={handleInputChange} 
              style={{cursor:'pointer'}}
            />
            Sign me up for the TEDxNITGOA newsletter
          </label>
          <button 
            className="contactUs_button__xUvf6" 
            type="submit" 
            disabled={isSubmitting} 
            style={{cursor: isSubmitting ? 'not-allowed' : 'pointer'}}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
            {!isSubmitting && <span className="contactUs_arrow__b6vOg"> → </span>}
          </button>
          {showThanks && <div className="Thanks"> Thank you for your response!</div>}
          <p className="contactUs_privacy__+gCuK">
            This form collects your name and email address so we can follow up with your request to become a partner. We never sell, rent, or share this information with outside parties.
          </p>
          <p className="contactUs_required__K3dRw">* Indicates required fields</p>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;