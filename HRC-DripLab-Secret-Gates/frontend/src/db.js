import { db } from './firebase'
import { ref, push, set, onValue, update, remove } from 'firebase/database'
export const listenProducts = (cb) => onValue(ref(db,'products'), snap=>{
  const val = snap.val()||{}; cb(Object.entries(val).map(([id,v])=>({id,...v})).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)))
})
export const addProduct = async (p)=>{ const r=push(ref(db,'products')); await set(r,{...p,createdAt:Date.now()}) }
export const updateProduct = async (id,p)=> update(ref(db,'products/'+id), p)
export const deleteProduct = async (id)=> remove(ref(db,'products/'+id))
export const addOrder = async (o)=>{ const r=push(ref(db,'orders')); await set(r,{...o,createdAt:Date.now()}) }
export const listenOrders = (cb)=> onValue(ref(db,'orders'), snap=>{
  const val = snap.val()||{}; cb(Object.entries(val).map(([id,v])=>({id,...v})).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)))
})
export const deleteOrder = async (id)=> remove(ref(db,'orders/'+id))
