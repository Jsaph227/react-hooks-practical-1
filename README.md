# Practical 2: Live Search and Timer

A searchable user directory combined with a live session timer, built using React `useState` and `useEffect` hooks[cite: 3].

## Completed Requirements
- **Delayed Search Filter:** Implemented a search input that filters the local user data (`USERS`) after a short effect delay, simulating an asynchronous search request[cite: 3].
- **Search Cleanup:** Utilized timeout cleanup (`clearTimeout`) so that fast typing cancels previous pending searches and prevents outdated results from displaying[cite: 3].
- **Session Timer:** Created a 1-second interval timer to track elapsed session seconds with proper cleanup (`clearInterval`) on unmount[cite: 3].
- **Document Title Synchronization:** Synchronized `document.title` to dynamically reflect the number of currently visible search results whenever the count changes[cite: 3].

## Known Limitations
- None. All functional requirements, cleanup behaviors, and synchronization tasks are fully implemented and verified.

## Test Steps
1. **Live Search & Fast Typing:** Type quickly into the search input box. Verify that the results update smoothly and that outdated queries are properly canceled without flashing stale data[cite: 3].
2. **Document Title Sync:** Type different queries (e.g., search for "Ana" or "Developer") and observe the browser tab title update to match the exact number of visible results[cite: 3].
3. **Session Timer:** Watch the session time counter increase once per second, confirming the interval works and cleans up properly[cite: 3].

## Bug Fixed / Debugging Notes
- *Issue:* A common pitfall during development was an effect depending on the exact state value it updates, or an interval capturing a stale initial seconds value.
- *Fix:* Used functional state updates (`setSeconds(prev => prev + 1)`) and clean dependency arrays to ensure stable execution and prevent infinite loops.

## Project Execution
1. Run `npm install` to install dependencies[cite: 1].
2. Run `npm run dev` to start the local development server[cite: 1].