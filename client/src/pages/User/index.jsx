import React, { useEffect } from 'react'
import QuizDemo from '../../components/Quiz';
import Header from '../../components/Header';

const UserPAge = () => {
  useEffect(() => {
    document.title = 'IELTS Mock | User'
  }, [])
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <QuizDemo />
    </div>
  )
}

export default UserPAge
