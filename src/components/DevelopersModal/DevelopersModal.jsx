import React, { useEffect, useRef } from 'react';
import styles from './DevelopersModal.module.scss';
import { Link } from 'react-router-dom';

const DevelopersModal = ({closeModal}) => {

    const useOutsideAlerter = (ref, action) => {
    
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            // alert("You clicked outside of me!");
            action();
          }
        }
      
        useEffect(() => {
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        });
      }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, closeModal);

    return (
        <div ref={wrapperRef} className={styles['modal']}>
            <Link to={'/home'} className={styles['home-link']} onClick={closeModal}> 
                Home
            </Link>
            {/* <Link to={'/developers'} className={styles['link']} onClick={closeModal}>
                Meet the people who created me!
            </Link> */}
        </div>
    )
}

export default DevelopersModal;
