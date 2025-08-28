import React, { useState } from 'react'
import OrderModal from './OrderModal'
export default function ProductCard({ product }){
  const [open, setOpen] = useState(false)
  const cover = product.photos?.find(Boolean) || 'https://via.placeholder.com/800x600?text=Photo'
  const priceUA = (product.price||0).toLocaleString('uk-UA',{style:'currency', currency:'UAH'})
  return (
    <div className="card">
      <img src={cover} alt={product.name} onClick={()=>setOpen(true)} />
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="badge">{product.category||'без категорії'}</div>
        <div className="price" style={{marginTop:6}}>{priceUA}</div>
        <button className="btn primary" style={{marginTop:10}} onClick={()=>setOpen(true)}>Замовити</button>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={()=>setOpen(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <div style={{fontWeight:800}}>{product.name}</div>
              <button className="btn" onClick={()=>setOpen(false)}>Закрити</button>
            </div>
            <div className="modal-body">
              <div style={{display:'grid', gap:10, gridTemplateColumns:'1fr 1fr'}}>
                <div>
                  <img src={cover} alt="" style={{width:'100%', borderRadius:12}} />
                  <div className="small" style={{marginTop:6}}>{product.description}</div>
                </div>
                <div><OrderModal product={product} onDone={()=>setOpen(false)} /></div>
              </div>
              {product.photos?.length>1 && (
                <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginTop:12}}>
                  {product.photos.slice(0,5).map((ph,i)=>(
                    <img key={i} src={ph} alt={'ph'+i} style={{width:'100%', height:100, objectFit:'cover', borderRadius:8}} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}