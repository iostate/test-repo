import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { createContactFormDocument } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  contactName: '',
  contactEmail: '',
  contactMessage: '',
};

const ContactUs = () => {
  const [contactForm, setContactForm] = useState(defaultFormFields);
  const { contactName, contactEmail, contactMessage } = contactForm;

  // const resetFormFields = () => {
  //   setContactForm(defaultFormFields);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContactForm({ ...contactForm, [name]: value });
    console.log(contactForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await createContactFormDocument(contactForm);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='contact-us-container'>
        <h2>Let us know what you'd like to see!</h2>
        <span>Leave us a thank you message, or a note</span>
        <form id='contact-us-form' onSubmit={handleSubmit}>
          <FormInput label='Display Name' type='text' required onChange={handleChange} name='contactName' value={contactName} />
          <FormInput label='Email' type='text' required onChange={handleChange} name='contactEmail' value={contactEmail} />
          <FormInput label='Message' type='text' required onChange={handleChange} name='contactMessage' value={contactMessage} />

          <Button type='submit'>Send</Button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
