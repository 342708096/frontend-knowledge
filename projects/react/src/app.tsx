import React from 'react';

const Context = React.createContext(0)

const App: React.FC = () => {
  console.log('父应用渲染')
  const [state, setState] = React.useState(0)
  return (
    <div>
      <button onClick={() => {
        setState((state) => state + 1)
      }}>+1</button>
      <Context.Provider value={state}>
        <Sub1 />
        <Sub2 />
      </Context.Provider>
    </div>
  )
}

// context 变化会引起从新渲染
const Sub1: React.FC = React.memo(() => {
  const count = React.useContext(Context)
  console.log('子应用1渲染')
  return (
    <div>{count}</div>
  )
})
// context 变化不会引起从新渲染
const Sub2: React.FC = React.memo(() => {
  console.log('子应用2渲染')
  return (
    <div>子应用2</div>
  )
})

export default App
