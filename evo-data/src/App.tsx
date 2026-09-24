
import { useState, useEffect } from 'react';
import './App.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div>
      <h1>Users</h1>
      <h4>A website fetching data from 'https://jsonplaceholder.typicode.com/users'</h4>
      <h4>Search for users. If there is a match click on their name to see more information</h4>
      <input
        type="text"
        placeholder="Filter by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <>
              <tr key={user.id} onClick={() => toggleExpand(user.id)} className="clickable-row">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}</td>
              </tr>
              {expandedId === user.id && (
                <tr>
                  <td colSpan={4}>
                    <div>
                      {/* //user, phone, web, add, comp, catch
                      <p><strong>Username:</strong> {user.username}</p>  */}
                      <p><strong>Phone:</strong> {user.phone}</p>
                      <p><strong>Website:</strong> {user.website}</p>
                      <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city} {user.address.zipcode}</p>
                      <p><strong>Company:</strong> {user.company.name} — "{user.company.catchPhrase}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}