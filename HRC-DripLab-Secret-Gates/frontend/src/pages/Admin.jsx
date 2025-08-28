import React, { useEffect, useState } from 'react'
import PasswordGate from '../components/PasswordGate'
import { addProduct, deleteProduct, listenProducts, updateProduct } from '../db'

const CATS = ["шорти","футболки","штани","худі/зіп худі","аксесуари","Куртки / вітровки","сумки","кросівки"]

export default function Admin(){
  return (<PasswordGate><AdminInner/></PasswordGate>)
}

function AdminInner(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ const off = listenProducts(setProducts); return ()=> off() },[])

  const [form, setForm] = useState({name:'', description:'', price:'', category:'футболки', sizes:'', photos:['','','','','']})
  const [editId, setEditId] = useState(null)
  const toNumber = (val)=> Number(String(val).replace(/[^0-9.]/g,''))

  const submit = async (e)=>{
    e.preventDefault()
    const payload = { name:form.name.trim(), description:form.description.trim(), price:toNumber(form.price), category:form.category, sizes:form.sizes, photos:form.photos.filter(Boolean).slice(0,5) }
    if(!payload.name || !payload.price){ alert('Вкажи назву і ціну'); return }
    if(editId){ await updateProduct(editId, payload); setEditId(null) } else { await addProduct(payload) }
    setForm({name:'',description:'',price:'',category:'футболки',sizes:'',photos:['','','','','']})
  }

  const startEdit = (p)=>{
    setEditId(p.id)
    setForm({ name:p.name||'', description:p.description||'', price:String(p.price||''), category:p.category||'футболки', sizes:p.sizes||'', photos:[...(p.photos||[]), '', '', '', '', ''].slice(0,5)})
    window.scrollTo({top:0, behavior:'smooth'})
  }

  return (
    <div className="container">
      <h2>Адмін панель</h2>
      <form onSubmit={submit} className="card" style={{padding:14, marginBottom:20}}>
        <div className="form-row">
          <input className="input" placeholder="Назва" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Ціна (₴)" value={form.price} onChange={e=>setForm({...form, price:e.target.value.replace(/[^0-9]/g,'')})} />
        </div>
        <div className="form-row">
          <select className="input" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
            {CATS.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <input className="input" placeholder="Розміри (напр. S,M,L або 41-45)" value={form.sizes} onChange={e=>setForm({...form, sizes:e.target.value})} />
        </div>
        <textarea className="input" rows="3" placeholder="Опис" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="form-row">
          {form.photos.map((ph,i)=>(
            <input key={i} className="input" placeholder={"Посилання на фото "+(i+1)} value={ph} onChange={e=>{ const arr=[...form.photos]; arr[i]=e.target.value; setForm({...form, photos:arr}) }} />
          ))}
        </div>
        <button className="btn primary" type="submit" style={{marginTop:10}}>{editId?'Зберегти зміни':'Додати товар'}</button>
        {editId && <button type="button" className="btn" style={{marginLeft:10}} onClick={()=>{setEditId(null); setForm({name:'',description:'',price:'',category:'футболки',sizes:'',photos:['','','','','']})}}>Скасувати</button>}
      </form>

      <h3>Список товарів</h3>
      <table className="table">
        <thead><tr><th>Фото</th><th>Назва</th><th>Категорія</th><th>Ціна</th><th>Дії</th></tr></thead>
        <tbody>
          {products.map(p=>(
            <tr key={p.id}>
              <td><img src={(p.photos||[])[0]||'https://via.placeholder.com/120'} alt="" style={{width:80,height:80,objectFit:'cover',borderRadius:8}}/></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{(p.price||0).toLocaleString('uk-UA',{style:'currency',currency:'UAH'})}</td>
              <td>
                <button className="btn" onClick={()=>startEdit(p)}>Редагувати</button>{' '}
                <button className="btn" onClick={()=>{ if(confirm('Видалити товар?')) deleteProduct(p.id) }}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}