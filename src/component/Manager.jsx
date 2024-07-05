import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem('passwords');
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const passwordRef = useRef();
  const ref = useRef();

  const showPassword = () => {
    if (ref.current.src.includes('visible.png')) {
      ref.current.src = `/eye.png`;
      passwordRef.current.type = 'text';
    } else {
      ref.current.src = `/visible.png`;
      passwordRef.current.type = 'password';
    }
  };

  const savePassword = () => {
    const newEntry = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newEntry];
    setPasswordArray(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    alert('Password added successfully!');
    setForm({ site: '', username: '', password: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Password copied to clipboard!');
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    alert('Password deleted!');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 to-purple-200 min-h-screen py-8">
        <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center font-bold text-2xl text-blue-700 mb-6">
            Password Manager
          </div>
          <div className="text-center text-gray-600 mb-8">
            Securely manage your passwords
          </div>
          <div className="flex flex-col items-center space-y-4">
            <input
              value={form.site}
              name="site"
              onChange={handleChange}
              placeholder="Enter Website URL"
              type="text"
              className="w-full rounded-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex w-full space-x-4">
              <input
                value={form.username}
                name="username"
                onChange={handleChange}
                placeholder="Enter Username"
                type="text"
                className="flex-1 rounded-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="relative flex-1">
                <input
                  ref={passwordRef}
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  type="password"
                  className="w-full rounded-full border border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={showPassword}
                >
                  <img
                    ref={ref}
                    className="w-6"
                    src='/visible.png'
                    alt="show"
                  />
                </span>
              </div>
            </div>
            <button
              className="flex items-center justify-center bg-blue-600 text-white rounded-full px-8 py-2 hover:bg-blue-500 transition"
              onClick={savePassword}
            >
              <img
                src="/add.png"
                alt="Add"
                className="w-6 h-6 mr-2"
              />
              Save
            </button>
          </div>

          <div className="font-bold text-xl text-blue-700 mt-8 mb-4">
            Your Passwords
          </div>

          {passwordArray.length === 0 && <div>No Passwords</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center py-2">
                      <a href={item.site} target="_blank" rel="noopener noreferrer">
                        {item.site}
                      </a>
                    </td>
                    <td className="text-center py-2">{item.username}</td>
                    <td className="text-center py-2">
                      <span>**********</span>
                      <div className="flex justify-center mt-2 space-x-4">
                        <img
                          className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                          src='../public/copy.png'
                          alt="copy"
                          onClick={() => copy(item.password)}
                        />
                        <img
                          className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                          src='../public/trash.png'
                          alt="delete"
                          onClick={() => deletePassword(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
