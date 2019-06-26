import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

class NotFound extends Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <h2>
                        <span className={styles.number}>4</span>
                        <span className={styles.number}>0</span>
                        <span className={styles.number}>4</span>
                    </h2>
                    <p>We are sorry but the page you have requested was not found.</p>
                    <Link to={`/`} className="cta">Back</Link>
                </div>
            </div>
        )
    }
}

export default NotFound;