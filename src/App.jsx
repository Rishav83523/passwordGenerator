import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let special = "!@#$%^&*()_+";
    if (numberAllowed) {
      str += num;
    }
    if (specialCharAllowed) {
      str += special;
    }
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword])

  const copytoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 1000);
  }, [password])
  useEffect(() => {passwordGenerator()}, [length, numberAllowed, specialCharAllowed, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadown-md rounded-lg px-8 my-8 text-orange-500 bg-gray-700'>
      <div className='flex shadown rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3 my-3 rounded-lg' placeholder='Password' readOnly ref={passwordRef} />
          <div className='relative'>
            <button className=' outline-none shrink-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded my-3 mx-1' onClick={copytoClipboard}>Copy</button>
            {tooltipVisible && <span className="tooltip text-white">Copied!</span>}
          </div>
          
          {/* hi i am rishav */}
        </div>
        
         <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              id="characterInput"
              defaultChecked={specialCharAllowed}
              onChange={() => setSpecialCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
        </div>
    </>
  )
}

export default App
