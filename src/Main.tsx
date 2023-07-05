import { useState } from 'react'



// This is the landing page
// React router
//  / landing page
//  /post/index number  (maybe keep index in useState and increment it.)
//check what you did with basename

const Main = function(){
    const [count, setCount] = useState(0)

    return (
        <>
        <a href="https://vitejs.dev" target="_blank">
          vite logo
        </a>
        <a href="https://react.dev" target="_blank">
          react logo
        </a>
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

export default Main