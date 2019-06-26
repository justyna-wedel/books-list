import React, { Component } from 'react';
import axios from 'axios';
import styles from './ItemsList.module.scss';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

class ItemsList extends Component {
  state = {
    books: [],
    authors: [],
    newBookData: {
      title: '',
      author: '',
      description: '',
      image: '',
    },
    newAuthorData: {
      name: '',
      authorImg: '',
    },
    editBookData: {
      id: '',
      title: '',
      author: '',
      description: '',
      image: '',
    },
    newBookModal: false,
    newAuthorModal: false,
    editBookModal: false,
  }

  componentWillMount() {
    this._refreshBooks(0, 1000);
    this._refreshAuthors(0, 1000);
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }
  toggleNewAuthorModal() {
    this.setState({
      newAuthorModal: !this.state.newAuthorModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }
  addBook() {
    axios.get('/api/token').then((response) => {
      axios.post('/api/books', this.state.newBookData, {
        headers: {
          'authorization': response.data,
        }
      }).then((response) => {

        if (response.status === 201) {
          console.log("book created!")
        }
        let { books } = this.state;
        console.log(response)
        this._refreshBooks(0, 1000);
        books.push(response.data);

        this.setState({
          books, newBookModal: false, newBookData: {
            title: '',
            author: '',
            description: '',
            image: '',
          }
        });
      });
    })
  }

  addAuthor() {
    axios.get('/api/token').then((response) => {
      axios.post('/api/authors', this.state.newAuthorData, {
        headers: {
          'authorization': response.data
        }
      }).then((response) => {
        let { authors } = this.state;
        authors.push(response.data);
        this._refreshAuthors(0, 1000);

        this.setState({
          authors, newAuthorModal: false, newAuthorData: {
            name: '',
            image: '',
          }
        });
      });
    })
  }
  _refreshBooks(offset, limit) {
    axios.get('/api/books?offset=' + offset + "&limit=" + limit).then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  _refreshAuthors(offset, limit) {
    axios.get('/api/authors?offset=' + offset + "&limit=" + limit).then((response) => {
      this.setState({
        authors: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <Link to={{
          pathname: `/BookDetail/${book.id}`,
          state: {
            bookDetails: { book }
          }
        }}
          key={book.id} className={styles.item}>
          <div className={styles.imgContainer}>
            <img src={book.image} alt={book.title} />
          </div>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.description}>{book.author}</p>
          </div>
        </Link>
      )
    });
    let authors = this.state.authors.map((author) => {
      return (
        <Link to={{
          pathname: `/AuthorDetail/${author.id}`,
          state: {
            authorDetails: { author }
          }
        }}
          key={author.id} className={styles.item}>
          <div className={styles.imgContainer}>
            <img src={author.image} alt={author.name} />
          </div>
          <div className={styles.container}>
            <h3 className={styles.title}>{author.name}</h3>
          </div>
        </Link>
      )
    });


    return (

      <div className={styles.wrapper}>

        <div className={styles.header}>

          <h1 className={styles.pageTitle}>
            <span className={styles.titleFirst}>Book</span>
            <span>service</span>
          </h1>
          <div className={styles.buttonsWrap}>
            <button className="cta cta--smaller" onClick={this.toggleNewBookModal.bind(this)}>Add Book</button>
            <button className="cta cta--smaller cta--black" onClick={this.toggleNewAuthorModal.bind(this)}>Add Author</button>
          </div>
        </div>

        {/* Modal add new book  */}
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.title = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input id="author" value={this.state.newBookData.author} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.author = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input id="desc" value={this.state.newBookData.description} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.description = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="bookImg">Image</Label>
              <Input id="bookImg" value={this.state.newBookData.image} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.image = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button class="cta cta--smaller" onClick={this.addBook.bind(this)}>Add Book</button>
            <button class="cta cta--smaller cta--red" onClick={this.toggleNewBookModal.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>

        {/* Modal add new author */}
        <Modal isOpen={this.state.newAuthorModal} toggle={this.toggleNewAuthorModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewAuthorModal.bind(this)}>Add new author</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" value={this.state.newAuthorData.name} onChange={(e) => {
                let { newAuthorData } = this.state;

                newAuthorData.name = e.target.value;

                this.setState({ newAuthorData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="authorImg">Image</Label>
              <Input id="authorImg" value={this.state.newAuthorData.image} onChange={(e) => {
                let { newAuthorData } = this.state;

                newAuthorData.image = e.target.value;

                this.setState({ newAuthorData });
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button class="cta cta--smaller" onClick={this.addAuthor.bind(this)}>Add Author</button>
            <button class="cta cta--smaller cta--red" onClick={this.toggleNewAuthorModal.bind(this)}>Cancel</button>
          </ModalFooter>
        </Modal>

        <div className={styles.list}>
          <h2 className={styles.heading}>Books</h2>
          {books}
          <h2 className={styles.heading}>Authors</h2>
          {authors}
        </div>
      </div>
    );
  }
}


export default ItemsList;
