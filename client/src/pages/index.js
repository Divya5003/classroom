import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

const index = () => {
  const router = useRouter();
  // const [message, setMessage] = useState("Loading");
  useEffect(() => {
    // fetch("http://localhost:8000/api/home").then(
    //   response => response.json()
    // ).then((data) => {
    //   setMessage(data.message);
    // }
    // )
    router.push('/login')
  }, [])
  return (
    <></>
  )
}

export default index