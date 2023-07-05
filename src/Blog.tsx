import Header from './Header'
import { useState } from 'react'





function Blog() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header username="User"/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          vite logo
        </a>
        <a href="https://react.dev" target="_blank">
          react logo
        </a>
      </div>
      <h1>Vie + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Blog
