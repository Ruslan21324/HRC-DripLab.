import React, { useState } from 'react'
import { addOrder } from '../db'
export default function OrderModal({ product, onDone }){
  const [form, setForm] = useState({name:'',phone:'',service:'Нова Пошта',region:'',district:'',city:'',branch:'',size:''})
  const [sent, setSent] = useState(false); const [err, setErr] = useState('')
  const submit = async (e)=>{
    e.preventDefault(); setErr('')
    if(!form.phone || !form.city || !form.branch){ setErr('Заповніть телефон, місто та відділення'); return }
    await addOrder({productId:product.id, productName:product.name, price:product.price, size:form.size, ...form})
    setSent(true); setTimeout(()=> onDone?.(), 800)
  }
  return (
    <form onSubmit={submit}>
      <div className="badge">Ціна: {(product.price||0).toLocaleString('uk-UA',{style:'currency',currency:'UAH'})}</div>
      <div className="form-row" style={{marginTop:10}}>
        <input className="input" placeholder="Ваше ім'я" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" placeholder="Телефон" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
      </div>
      <div className="form-row">
        <select className="input" value={form.service} onChange={e=>setForm({...form, service:e.target.value})}>
          <option>Нова Пошта</option>
          <option>Укрпошта</option>
        </select>
        <input className="input" placeholder="Розмір (напр. M або 42)" value={form.size} onChange={e=>setForm({...form, size:e.target.value})} />
      </div>
      <div className="form-row">
        <input className="input" placeholder="Область" value={form.region} onChange={e=>setForm({...form, region:e.target.value})} />
        <input className="input" placeholder="Район" value={form.district} onChange={e=>setForm({...form, district:e.target.value})} />
      </div>
      <div className="form-row">
        <input className="input" placeholder="Місто" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        <input className="input" placeholder="Відділення" value={form.branch} onChange={e=>setForm({...form, branch:e.target.value})} />
      </div>
      {err && <div className="badge" style={{color:'#ffbdbd', borderColor:'#552'}}>⚠ {err}</div>}
      {!sent ? <button className="btn primary" type="submit" style={{marginTop:10}}>Підтвердити замовлення</button>
              : <div className="badge">✅ Замовлення відправлено!</div>}
    </form>
  )
}