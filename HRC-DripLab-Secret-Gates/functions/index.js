const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
admin.initializeApp()
const getTransport = ()=> nodemailer.createTransport({
  host: process.env.SMTP_HOST || functions.config().smtp.host,
  port: Number(process.env.SMTP_PORT || functions.config().smtp.port || 465),
  secure: true,
  auth: { user: process.env.SMTP_EMAIL || functions.config().smtp.email, pass: process.env.SMTP_PASS || functions.config().smtp.pass }
})
exports.onOrderCreated = functions.database.ref('/orders/{id}').onCreate(async (snap)=>{
  const order = snap.val()
  try{
    const transporter = getTransport()
    const text = `Нове замовлення:
Товар: ${order.productName}
Розмір: ${order.size||'-'}
Ціна: ${order.price||0} грн
Клієнт: ${order.name||'-'} (${order.phone})
Доставка: ${order.service} | ${order.region||''} ${order.district||''} ${order.city||''}, відділення ${order.branch}
Дата: ${new Date(order.createdAt||Date.now()).toLocaleString('uk-UA')}`
    await transporter.sendMail({ from: process.env.SMTP_EMAIL || functions.config().smtp.email, to: "ruslangircak@gmail.com", subject: "HRC DripLab — нове замовлення", text })
    return true
  }catch(e){ console.error('Email error', e); return false }
})