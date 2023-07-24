// THIS IS THE OLD VERSION OF THE LIBRARY, I KEPT IT HERE FOR REFERENCE

// default library
let myLibrary = [
    {title: "The rate Hobbit", author: "J.R.R. Tolkien", pages: 295, read: false},
    {title: "The Stars", author: "B.R Smith", pages: 170, read: true},
];

// define variables
const addBookBttn = document.getElementById('addBookBtn');
const bookForm = document.getElementById('addBookForm');
const addBookModal = document.getElementById('addBookModal');
const overlay = document.getElementById('overlay');
const removeBtn = document.getElementById('removeBtn');

// constructor
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function updateReadStatus(title) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            myLibrary[i].read = !myLibrary[i].read
        }
    }
}

// gets book's index from array by title
function getArrayIndex(title){
    // put code to remove that title from myLibray
    let index = -1
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            index=i
        }
    }
    return index
}

// removeBook function
const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
      )
    
    index=getArrayIndex(title)
    myLibrary.splice(index,1)

    saveLocal()
    updateBooksGrid()

}

// function that creates a book card for each book in the array, each array object gets its own div
function createBookCard() {
    let bookGrid = document.getElementById('bookSlot');
    for (let book of myLibrary) {
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
            readBtn.textContent = 'Read'
            readBtn.classList.add('btn-light-green')
          } else {
            readBtn.textContent = 'Not read'
            readBtn.classList.add('btn-light-red')
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
        readBtn.classList.add('btn')
        removeBtn.classList.add('btn')
        removeBtn.classList.add('remove-btn')
        readBtn.onclick = toggleRead
        removeBtn.onclick = removeBook
    }
}

//add book modal
const showForm = () => {
    console.log('BTN') 
    bookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

// close book modal
const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

// updates the bookgrid
const updateBooksGrid = () => {
    resetBooksGrid()
    createBookCard()    
}

// resets the bookGrid
const resetBooksGrid = () => {
    const bookGrid = document.getElementById('bookSlot')
    bookGrid.innerHTML = ''
}

// saves array to local
const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

// restores from last local save
const restoreLocal = () => {
    myLibrary = JSON.parse(localStorage.getItem('library'))
}

// addBook function
const addBook = (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead= document.getElementById('isRead').checked
    console.log(title, isRead)
    myLibrary.push(new book(title, author, pages, isRead))
    saveLocal()
    closeAddBookModal()

    updateBooksGrid()
}

// Changes Read status
const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
      '"',
      ''
    )
    updateReadStatus(title) 
    saveLocal()
    updateBooksGrid()
  }

// Event fucntions
addBookForm.onsubmit = addBook
addBookBttn.onclick = showForm

// first time load
window.onload = () => {
    localStorage.clear();
    createBookCard();
};