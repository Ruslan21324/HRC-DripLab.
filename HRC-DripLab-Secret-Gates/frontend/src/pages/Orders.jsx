import React, { useEffect, useState } from 'react'
import PasswordGate from '../components/PasswordGate'
import { deleteOrder, listenOrders } from '../db'
export default function Orders(){ return (<PasswordGate><OrdersInner/></PasswordGate>) }
function OrdersInner(){
  const [orders, setOrders] = useState([])
  useEffect(()=>{ const off = listenOrders(setOrders); return ()=> off() },[])
  return (
    <div className="container">
      <h2>Замовлення</h2>
      <table className="table">
        <thead><tr><th>Дата</th><th>Товар / Розмір</th><th>Клієнт</th><th>Доставка</th><th>Дії</th></tr></thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id}>
              <td>{new Date(o.createdAt||Date.now()).toLocaleString('uk-UA')}</td>
              <td><div><b>{o.productName}</b></div><div className="small">{(o.price||0).toLocaleString('uk-UA',{style:'currency',currency:'UAH'})} • Розмір: {o.size||'-'}</div></td>
              <td><div>{o.name||'-'} • {o.phone}</div><div className="small">{o.region||''} {o.district||''} {o.city||''}</div><div className="small">{o.service} • Відділення: {o.branch}</div></td>
              <td></td>
              <td><button className="btn" onClick={()=>{ if(confirm('Видалити замовлення?')) deleteOrder(o.id) }}>Видалити</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}