import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listenProducts } from './db'
import ProductCard from './components/ProductCard'

const CATS = ["шорти","футболки","штани","худі/зіп худі","аксесуари","Куртки / вітровки","сумки","кросівки"]
const PASS = 'Ruslan22121985'

export default function App(){
  const [products, setProducts] = useState([])
  const [cat, setCat] = useState("Все")
  const [sort, setSort] = useState("new")
  const nav = useNavigate()

  useEffect(()=>{
    const off = listenProducts(setProducts)
    return ()=> off()
  },[])

  const list = useMemo(()=>{
    let l = [...products]
    if(cat !== "Всі") l = l.filter(p=> (p.category||"").toLowerCase() === cat.toLowerCase())
    if(sort === "price-asc") l.sort((a,b)=> (a.price||0)-(b.price||0))
    if(sort === "price-desc") l.sort((a,b)=> (b.price||0)-(a.price||0))
    return l
  },[products, cat, sort])

  const clicksBrand = useRef([])
  const clicksFooter = useRef([])
  const [ask, setAsk] = useState(null)
  const [pwd, setPwd] = useState('')
  const handleMultiClick = (type)=>{
    const now = Date.now()
    const store = type==='brand' ? clicksBrand.current : clicksFooter.current
    store.push(now)
    while(store.length && now - store[0] > 1200) store.shift()
    if(store.length >= 3){ setAsk(type==='brand' ? 'orders' : 'admin'); store.length=0 }
  }
  const confirmWhere = ask
  const confirmSecret = ()=>{
    if(pwd===PASS){
      sessionStorage.setItem('hrc_ok','1')
      setAsk(null); setPwd('')
      if(confirmWhere==='admin') nav('/admin')
      if(confirmWhere==='orders') nav('/orders')
    }
  }

  return (
    <div>
      <header className="header">
        <div className="header-inner container">
          <div className="brand" onClick={()=>handleMultiClick('brand')}>
            <div className="brand-badge"></div>
            <div>HRC DRIPLAB</div>
          </div>
          <div className="nav"><Link className="btn" to="/">Головна</Link></div>
        </div>
      </header>

      <main className="container">
        <div className="toolbar">
          <div className="filter">
            <span className="badge">Категорії:</span>
            <div className="chips">
              {CATS.map(c=>(<button key={c} className={"chip "+(c===cat?'active':'')} onClick={()=>setCat(c)}>{c}</button>))}
              <button className="chip" onClick={()=> setCat("Всі")}>Всі товари</button>
            </div>
          </div>
          <div className="filter">
            <span className="badge">Сортування:</span>
            <select className="input" value={sort} onChange={e=>setSort(e.target.value)}>
              <option value="new">спочатку нові</option>
              <option value="price-asc">ціна ↑</option>
              <option value="price-desc">ціна ↓</option>
            </select>
          </div>
        </div>

        <div className="grid">{list.map(p=> <ProductCard key={p.id} product={p} />)}</div>
      </main>

      <footer className="footer">
        <div className="tiny" onClick={()=>handleMultiClick('footer')}>2025HRCDRIPLAB</div>
        <div style={{marginTop:8}} className="small">© {new Date().getFullYear()} HRC DripLab</div>
      </footer>

      {ask && (
        <div className="modal-backdrop" onClick={()=>setAsk(null)}>
          <div className="secret-modal" onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:800, marginBottom:8}}>Введіть пароль</div>
            <input autoFocus className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Пароль" />
            <div style={{display:'flex', gap:8, marginTop:10}}>
              <button className="btn" onClick={()=>setAsk(null)}>Скасувати</button>
              <button className="btn primary" onClick={confirmSecret}>Увійти</button>
            </div>
            <div className="small" style={{marginTop:8}}>Підказка: особистий пароль власника 😉</div>
          </div>
        </div>
      )}
    </div>
  )
}
