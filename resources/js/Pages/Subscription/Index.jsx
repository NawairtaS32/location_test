import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import { MdUnsubscribe } from 'react-icons/md';

export default function Subscription() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (email.length < 10) {
      setError('Input must be at least 10 characters long');
      return;
    }

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Generate random IP
    const randomIp =
      Math.floor(Math.random() * 256) +
      '.' +
      Math.floor(Math.random() * 256) +
      '.' +
      Math.floor(Math.random() * 256) +
      '.' +
      Math.floor(Math.random() * 256);

    axios
      .post('/subscriptions', {
        email: email,
        ip: randomIp,
      })
      .then((response) => {
        setSuccess(response.data.message);
        setEmail('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Subscription failed');
      });
  };

  return (
    <div className="w-screen min-h-screen bg-transparent bg-gradient-to-r from-cyan-500 via-blue-400 to-violet-500">
      <div className="flex flex-col h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="flex">
          <TextInput
            type="email"
            value={email}
            minLength={10}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300 h-16 text-2xl  md:h-20 focus:border-indigo-500 rounded-l-3xl focus:ring-indigo-500 shadow-sm w-full px-5 py-4"
          />
          <button
            type="submit"
            className="bg-indigo-500  hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-3xl"
          >
            <MdUnsubscribe className={`text-5xl`} />
          </button>
        </form>
        {error && (
          <InputError
            message={error}
            className="text-red text-xl mx-4 text-center transition duration-150 ease-in-out opacity-100"
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        )}
        {success && (
          <p className="text-green-500 text-xl mx-4 text-center">{success}</p>
        )}
      </div>
    </div>
  );
}
