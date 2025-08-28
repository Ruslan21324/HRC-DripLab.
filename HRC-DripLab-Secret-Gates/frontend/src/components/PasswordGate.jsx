import React, { useEffect, useState } from 'react'
export default function PasswordGate({ children }){
  const [ok, setOk] = useState(false)
  const [v, setV] = useState('')
  const pass = 'Ruslan22121985'
  useEffect(()=>{ if(sessionStorage.getItem('hrc_ok')==='1') setOk(true) },[])
  const tryLogin = ()=>{ if(v===pass){ sessionStorage.setItem('hrc_ok','1'); setOk(true) } }
  if(ok) return children
  return (<div className="container" style={{maxWidth:520}}>
    <h2>Введіть пароль</h2>
    <input className="input" type="password" value={v} onChange={e=>setV(e.target.value)} placeholder="Пароль" />
    <button className="btn primary" style={{marginTop:10}} onClick={tryLogin}>Увійти</button>
    <div className="small">Підказка: особистий пароль власника 😉</div>
  </div>)
}