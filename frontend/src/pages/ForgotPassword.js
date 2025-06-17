
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch("http://localhost/serp/api/forgotPassword.php", {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/forgotPassword.php`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const text = await response.text();
      try {
        const result = JSON.parse(text);
        alert(result.message);
        if (result.status === 'success') {
          navigate("/login");
        }
      } catch (err) {
        console.error("Non-JSON response from server:", text);
        alert("Something went wrong. Server returned invalid response.");
      }

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <form onSubmit={handleForgot} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send New Password"}
          </button>
          <p onClick={() => navigate("/login")} style={styles.link}>
            ← Back to Login
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f7fa',
    fontFamily: 'Segoe UI, sans-serif'
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  link: {
    marginTop: '10px',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '14px'
  }
};

export default ForgotPassword;
