import React, { useState, useEffect } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' }
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  // 1-second session timer with cleanup on unmount[cite: 3]
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Delayed search filter with timeout cleanup to cancel outdated requests[cite: 3]
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const results = USERS.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(results);
    }, 300);

    return () => clearInterval(timeoutId);
  }, [query]);

  // Synchronize document title with the visible result count[cite: 3]
  useEffect(() => {
    document.title = `Visible Results: ${filteredUsers.length}`;
  }, [filteredUsers]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Live Search and Timer</h2>
      <p>Session Time: <strong>{seconds}s</strong></p>

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '15px' }}
      />

      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} - <em>{user.role}</em>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
  );
}