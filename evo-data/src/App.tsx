
import { useState, useEffect } from 'react';
import './App.css';


// Shape of a single user record
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
  // List of users fetched
  const [users, setUsers] = useState<User[]>([]);
  // Current text in search bar
  const [search, setSearch] = useState('');
  // id of current expanded row or null if nothin is expanded
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // fetch user list at first mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  //filter our names that include search text
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  //expands the selected row
  function toggleExpand(id: number) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div>
      <h1>Users</h1>
      <h4>A website fetching data from 'https://jsonplaceholder.typicode.com/users'</h4>
      <h4>Search for users. If there is a match click on the row to see more information</h4>

      {/* Value always controlled by search text, every key stroke updates state via onChange*/}
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
            // Create displayed info and toggled info
            <>
              {/* Summary row with click on feature */}
              <tr key={user.id} onClick={() => toggleExpand(user.id)} className="clickable-row">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>{user.address.city}</td>
              </tr>
              {/* Toggled info, only rendered when user is expanded */}
              {expandedId === user.id && (
                <tr>
                  <td colSpan={4}>
                    <div>
                      {/* Notes to self and can uncomment Username comment if wanting usernames */}
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