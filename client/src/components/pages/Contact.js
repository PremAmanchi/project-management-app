import React from 'react'
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import styles from '../common/TableForm.module.css'
import { useNavigate } from 'react-router-dom'


export default function Contact() {
  let navigate = useNavigate()
  
  return (

    <>
      <div className={styles.breadcumbs}>
        <AiOutlineMenu className={styles.aiIcon} /><label className={styles.pointerLabel} onClick={() => { navigate(`/contact`)}}>Contact</label>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.EmpsInner1}>
          <h3>Contact Us</h3>
        </div>
        <div className={styles.content}>
          This project was devlpoed by KPB. For any further info contact Bhargav
        </div>
      </div>
    </>
  )
}