
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(5)

  const status =
    count === 0
      ? 'Not started'
      : count >= target
        ? 'Target reached'
        : 'In progress'

  const addTwo = () => {
    setCount(current => Math.min(current + 1, target))
    setCount(current => Math.min(current + 1, target))
  }

  return (
    <main className="container">
      <h1>Smart Task Counter</h1>
      <p className="subtitle">Track your study session</p>

      <section className="counter-card">
        <label htmlFor="target">Task target</label>
        <input
          id="target"
          type="number"
          min="1"
          value={target}
          onChange={event =>
            setTarget(Math.max(1, Number(event.target.value)))
          }
        />

        <p className="status">{status}</p>

        <div className="count">{count}</div>
        <p>of {target} tasks completed</p>

        <div className="buttons">
          <button
            onClick={() =>
              setCount(current => Math.min(current + 1, target))
            }
            disabled={count >= target}
          >
            Increment +1
          </button>

          <button
            onClick={addTwo}
            disabled={count >= target}
          >
            Add Two +2
          </button>

          <button
            onClick={() =>
              setCount(current => Math.max(0, current - 1))
            }
            disabled={count === 0}
          >
            Decrement -1
          </button>

          <button onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
