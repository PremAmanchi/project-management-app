import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={styles.leftAlign}>
        <label className={styles.labelStyle}>© 2023 KPB. All Rights Reserved.</label>
      </div>
      <div className={styles.rightAlign}>
        <label className={styles.labelStyle}>Powered by KPB team</label>
      </div>
    </footer>
  )
}