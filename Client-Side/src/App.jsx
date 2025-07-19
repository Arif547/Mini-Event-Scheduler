import './App.css'
import AddEventFiled from './component/AddEventFiled'
import Event from './component/Event'


function App() {


  return (
    <div className='bg-gray-50 p-4'>
      <div className='p-5 max-w-7xl mx-auto space-y-5'>
        <Event />
        <AddEventFiled />
      </div>
    </div>

  )
}

export default App
