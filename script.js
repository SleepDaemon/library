// THIS IS THE NEW VERSION OF THE LIBRARY, CHANGE THE CODE TO BE OO (Object Oriented)

// Book class
class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }
  
  // Library class
  class Library {
    constructor() {
      this.books = [
        { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: false },
        { title: "The Stars", author: "B.R Smith", pages: 170, read: true },
      ];
      this.addBookBtn = document.getElementById('addBookBtn');
      this.bookForm = document.getElementById('addBookForm');
      this.addBookModal = document.getElementById('addBookModal');
      this.overlay = document.getElementById('overlay');
      this.removeBtn = document.getElementById('removeBtn');
      this.addBookForm = document.getElementById('addBookForm');
    }
  
    updateReadStatus(title) {
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].title === title) {
          this.books[i].read = !this.books[i].read;
        }
      }
    }
  
    getArrayIndex(title) {
      let index = -1;
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i].title === title) {
          index = i;
        }
      }
      return index;
    }
  
    removeBook(e) {
      const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
      );
  
      const index = this.getArrayIndex(title);
      this.books.splice(index, 1);
  
      this.saveLocal();
      this.updateBooksGrid();
    }
  
    createBookCard() {
      const bookGrid = document.getElementById('bookSlot');
      for (const book of this.books) {
        const bookCard = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const buttonGroup = document.createElement('div');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
  
        title.textContent = `"${book.title}"`;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        removeBtn.textContent = 'Remove';
  
        if (book.read) {
          readBtn.textContent = 'Read';
          readBtn.classList.add('btn-light-green');
        } else {
          readBtn.textContent = 'Not read';
          readBtn.classList.add('btn-light-red');
        }
  
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        buttonGroup.appendChild(readBtn);
        buttonGroup.appendChild(removeBtn);
        bookCard.appendChild(buttonGroup);
        bookGrid.appendChild(bookCard);
  
        bookCard.classList.add('book-card');
        buttonGroup.classList.add('button-group');
        readBtn.classList.add('btn');
        removeBtn.classList.add('btn');
        removeBtn.classList.add('remove-btn');
        readBtn.onclick = this.toggleRead.bind(this);
        removeBtn.onclick = this.removeBook.bind(this);
      }
    }
  
    showForm() {
      console.log('BTN');
      this.bookForm.reset();
      this.addBookModal.classList.add('active');
      this.overlay.classList.add('active');
    }
  
    closeAddBookModal() {
      this.addBookModal.classList.remove('active');
      this.overlay.classList.remove('active');
    }
  
    updateBooksGrid() {
      this.resetBooksGrid();
      this.createBookCard();
    }
  
    resetBooksGrid() {
      const bookGrid = document.getElementById('bookSlot');
      bookGrid.innerHTML = '';
    }
  
    saveLocal() {
      localStorage.setItem('library', JSON.stringify(this.books));
    }
  
    restoreLocal() {
      this.books = JSON.parse(localStorage.getItem('library'));
    }
  
    addBook(e) {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const pages = document.getElementById('pages').value;
      const isRead = document.getElementById('isRead').checked;
      console.log(title, isRead);
      this.books.push(new Book(title, author, pages, isRead));
      this.saveLocal();
      this.closeAddBookModal();
  
      this.updateBooksGrid();
    }
  
    toggleRead(e) {
      const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
      );
      this.updateReadStatus(title);
      this.saveLocal();
      this.updateBooksGrid();
    }
  
    initialize() {
      localStorage.clear();
      this.createBookCard();
      this.addBookForm.onsubmit = this.addBook.bind(this);
      this.addBookBtn.onclick = this.showForm.bind(this);
    }
  }
  
  const library = new Library();
  window.onload = library.initialize.bind(library);  