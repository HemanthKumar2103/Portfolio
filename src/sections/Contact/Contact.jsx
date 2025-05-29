import styles from './ContactStyles.module.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_qi5ojpp', 'template_4y3ga6v', {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }, 'ApCcsLabUmPNGTWY9')
      .then((response) => {
        console.log('Feedback email sent successfully!', response.status);
      })
      .catch((err) => {
        console.error('Failed to send feedback email.', err);
      });
    emailjs.send('service_qi5ojpp', 'template_eofq2ka', {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }, 'ApCcsLabUmPNGTWY9')
      .then((response) => {
        console.log('Response email sent successfully!', response.status);
      })
      .catch((err) => {
        console.error('Failed to send response email.', err);
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      alert('Thank you! Your message has been sent.');
    
  };

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTitle">Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" hidden>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" hidden>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" hidden>Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            required
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
          ></textarea>
        </div>
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Contact;
