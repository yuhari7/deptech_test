import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '@/styles/LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if token is present
    const token = Cookies.get('token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200 && response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 }); // Store token in cookies
        router.push('/admin'); // Redirect after storing the token
      } else {
        setError('Unexpected response from server');
      }
    } catch (err) {
      setError('Invalid credentials or server error');
      console.error('Login error:', err);
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-box']}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
