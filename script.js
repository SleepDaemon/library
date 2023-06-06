let myLibrary = [
    {title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: false},
    {title: "The Stars", author: "B.R Smith", pages: 170, read: true},
];

// constructor
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
  

// function that creates a book card for each book in the array, each array object gets its own div
function createBookCard() {
    let bookGrid = document.getElementById('bookSlot');
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const buttonGroup = document.createElement('div');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');

        title.textContent = `"${myLibrary[i].title}"`;
        author.textContent = myLibrary[i].author;
        pages.textContent = `${myLibrary[i].pages} pages`;
        removeBtn.textContent = 'Remove';

        if (book.isRead) {
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
        // readBtn.onclick = toggleRead
        // removeBtn.onclick = removeBook
    }
}

window.onload = () => {
    // for of loop to iterate through array
    for (let book of myLibrary) {
        createBookCard(book);
    }
};