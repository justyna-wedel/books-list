import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemDetails.module.scss'

class BookDetail extends Component {

    render() {
        console.log(this)
        return (
            <div className={styles.wrapper}>
                <div className={styles.imgContainer}>
                    <img src={this.props.location.state.bookDetails.book.image} alt="" />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{this.props.location.state.bookDetails.book.title}</h2>
                    <div className={styles.description}>{this.props.location.state.bookDetails.book.description}</div>
                    <Link to={`/`} className="cta">Back</Link> 
                </div>
            </div>
        )
    }
}

class AuthorDetail extends Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.imgContainer}>
                    <img src={this.props.location.state.authorDetails.author.image} alt="" />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{this.props.location.state.authorDetails.author.name}</h2>
                    <Link to={`/`} className="cta">Back</Link> 
                </div>
            </div>
        )
    }
}

export { BookDetail, AuthorDetail };
