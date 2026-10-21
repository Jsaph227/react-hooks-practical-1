import React, { useState, useEffect, useRef, createContext, useContext, useMemo, useCallback, useReducer } from 'react';

// ==========================================
// PRACTICAL 1: Smart Task Counter
// ==========================================
function Practical1() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(5);

  const status = 
    count === 0 ? "Not started" :
    count >= target ? "Target reached" : 
    "In progress";

  const handleIncrement = () => { if (count < target) setCount(c => c + 1); };
  const handleDecrement = () => { if (count > 0) setCount(c => c - 1); };
  const handleAddTwo = () => {
    setCount(prev => (prev < target ? prev + 1 : prev));
    setCount(prev => (prev < target ? prev + 1 : prev));
  };
  const handleReset = () => setCount(0);

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 1: Smart Task Counter</h3>
      <p>Target: {target} | Current Count: <strong>{count}</strong></p>
      <p>Status: <strong>{status}</strong></p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleIncrement} disabled={count >= target}>Increment (+1)</button>
        <button onClick={handleAddTwo} disabled={count >= target}>Add Two (+2)</button>
        <button onClick={handleDecrement}>Decrement (-1)</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}


// ==========================================
// PRACTICAL 2: Live Search and Timer
// ==========================================
const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' }
];

function Practical2() {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const results = USERS.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(results);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    document.title = `Visible Results: ${filteredUsers.length}`;
  }, [filteredUsers]);

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 2: Live Search and Timer</h3>
      <p>Session Time: <strong>{seconds}s</strong></p>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '8px', width: '100%', maxWidth: '300px', marginBottom: '15px', display: 'block' }}
      />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (<li key={user.id}>{user.name} - <em>{user.role}</em></li>))
        ) : (<p>No users found.</p>)}
      </ul>
    </div>
  );
}


// ==========================================
// PRACTICAL 3: Accessible Form Toolkit
// ==========================================
function Practical3() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const prevEmailRef = useRef('');
  const [displayedPrevEmail, setDisplayedPrevEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMsg('Name is required.'); nameRef.current.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg('Valid email is required.'); emailRef.current.focus(); return; }
    if (password.length < 8) { setErrorMsg('Password must be at least 8 chars.'); passwordRef.current.focus(); return; }

    setErrorMsg('');
    prevEmailRef.current = email;
    setDisplayedPrevEmail(prevEmailRef.current);
    alert('Registration successful!');
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 3: Accessible Form Toolkit</h3>
      {errorMsg && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input ref={nameRef} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ padding: '8px' }} />
        <input ref={emailRef} type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '8px' }} />
        <input ref={passwordRef} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '8px' }}>Register</button>
      </form>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        Previous Submitted Email: <strong>{displayedPrevEmail || 'None'}</strong>
      </p>
    </div>
  );
}


// ==========================================
// PRACTICAL 4: Application Preferences
// ==========================================
const PreferencesContext = createContext(null);
function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used within provider');
  return context;
}

function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('16');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return (
    <PreferencesContext.Provider value={{ theme, fontSize, toggleTheme, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}

function Toolbar() {
  const { theme, toggleTheme, fontSize, setFontSize } = usePreferences();
  return (
    <div style={{ margin: '10px 0', padding: '10px', background: theme === 'dark' ? '#444' : '#eee', color: theme === 'dark' ? '#fff' : '#000' }}>
      <button onClick={toggleTheme} style={{ marginRight: '10px' }}>Toggle Theme ({theme})</button>
      <label>Font Size: </label>
      <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
        <option value="14">14px</option><option value="16">16px</option><option value="18">18px</option>
      </select>
    </div>
  );
}

function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  return (
    <div style={{ padding: '10px', fontSize: `${fontSize}px`, background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#ddd' : '#333' }}>
      <h4>Article Preview Panel</h4>
      <p>Theme and font size shared via Context API without prop drilling.</p>
    </div>
  );
}

function Practical4() {
  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 4: Application Preferences</h3>
      <PreferencesProvider>
        <Toolbar />
        <ArticlePreview />
      </PreferencesProvider>
    </div>
  );
}


// ==========================================
// PRACTICAL 5: Product Explorer Performance
// ==========================================
const INITIAL_PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 2 === 0 ? 'Electronics' : 'Clothing',
  price: (i + 1) * 10
}));

const MemoizedProductList = React.memo(function ProductList({ products, onSelect }) {
  console.log('ProductList rendered');
  return (
    <ul style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
      {products.map(p => (
        <li key={p.id} onClick={() => onSelect(p)} style={{ cursor: 'pointer', padding: '2px 0' }}>
          {p.name} - ${p.price} ({p.category})
        </li>
      ))}
    </ul>
  );
});

function Practical5() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [counter, setCounter] = useState(0);

  // Memoized expensive filtering calculation
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // Memoized callback to prevent child re-renders
  const handleSelect = useCallback((product) => {
    alert(`Selected: ${product.name}`);
  }, []);

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 5: Product Explorer Performance</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input type="text" placeholder="Filter products..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '6px' }} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <button onClick={() => setCounter(c => c + 1)}>Unrelated Counter: {counter}</button>
      </div>
      <MemoizedProductList products={filteredProducts} onSelect={handleSelect} />
    </div>
  );
}


// ==========================================
// PRACTICAL 6: Issue Tracker State Engine
// ==========================================
function issueReducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [...state.issues, { id: state.nextId, title: action.payload.title, done: false }],
        nextId: state.nextId + 1
      };
    case 'TOGGLE_ISSUE':
      return {
        ...state,
        issues: state.issues.map(iss => iss.id === action.payload.id ? { ...iss, done: !iss.done } : iss)
      };
    case 'DELETE_ISSUE':
      return {
        ...state,
        issues: state.issues.filter(iss => iss.id !== action.payload.id)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload.filter };
    case 'CLEAR_DONE':
      return { ...state, issues: state.issues.filter(iss => !iss.done) };
    default:
      return state;
  }
}

function Practical6() {
  const [state, dispatch] = useReducer(issueReducer, {
    issues: [{ id: 1, title: 'Sample Bug', done: false }],
    filter: 'all',
    nextId: 2
  });
  const [titleInput, setTitleInput] = useState('');

  const filteredIssues = state.issues.filter(iss => {
    if (state.filter === 'open') return !iss.done;
    if (state.filter === 'done') return iss.done;
    return true;
  });

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
      <h3>Practical 6: Issue Tracker State Engine</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input type="text" placeholder="New issue title..." value={titleInput} onChange={e => setTitleInput(e.target.value)} style={{ padding: '6px' }} />
        <button onClick={() => { if(titleInput.trim()) { dispatch({ type: 'ADD_ISSUE', payload: { title: titleInput } }); setTitleInput(''); } }}>Add Issue</button>
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'all' } })}>All</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'open' } })}>Open</button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'done' } })}>Done</button>
        <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear Done</button>
      </div>
      <ul>
        {filteredIssues.map(iss => (
          <li key={iss.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <span style={{ textDecoration: iss.done ? 'line-through' : 'none', cursor: 'pointer' }} onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: iss.id } })}>
              {iss.title}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: iss.id } })} style={{ fontSize: '11px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// ==========================================
// MAIN APP CONTAINER (All 6 Practical Exams)
// ==========================================
export default function App() {
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <h2>React Hooks Practical Exam Series</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>All six practical exams assembled into a single working site.</p>
      
      <Practical1 />
      <Practical2 />
      <Practical3 />
      <Practical4 />
      <Practical5 />
      <Practical6 />
    </div>
  );
}