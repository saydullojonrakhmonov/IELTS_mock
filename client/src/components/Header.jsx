import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center w-full h-15 bg-blue-600'>
   <img src="/ielts-mock.jpeg" alt="IELTS mock logo" className='w-20 h-13 rounded-md ms-5 cursor-pointer'  onClick={() => navigate("/")} title='Go to main page'/></div>

  )
}

export default Header
