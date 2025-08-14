import React, { useEffect } from 'react'
import Header from '../../components/Header'
import AdminQuestions from './Question'

const AdminPage = () => {
  useEffect(()=>{
    document.title='IELTS Mock | Admin'
  },[])
  return (
    <div className='h-screen'>
      <Header/>
      <AdminQuestions/>
    </div>
  )
}

export default AdminPage
