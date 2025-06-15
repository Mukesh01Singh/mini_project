
const myLibrary = [];
const libraryContainer = document.getElementById('library-container');
const newBookBtn = document.getElementById('new-book-btn');
const bookFormDialog = document.getElementById('book-form-dialog');
const bookForm = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

// Book Constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status prototype method
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// Function to add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

// Function to display all books
function renderLibrary() {
  libraryContainer.innerHTML = '';
  
  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;
    
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <div class="book-actions">
        <button class="toggle-read">${book.read ? 'Mark Unread' : 'Mark Read'}</button>
        <button class="remove-book">Remove</button>
      </div>
    `;
    
    libraryContainer.appendChild(bookCard);
  });

  // Add event listeners to all toggle and remove buttons
  document.querySelectorAll('.toggle-read').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookId = e.target.closest('.book-card').dataset.id;
      const book = myLibrary.find(book => book.id === bookId);
      book.toggleRead();
      renderLibrary();
    });
  });

  document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', (e) => {
      const bookId = e.target.closest('.book-card').dataset.id;
      const bookIndex = myLibrary.findIndex(book => book.id === bookId);
      myLibrary.splice(bookIndex, 1);
      renderLibrary();
    });
  });
}

// Form event handlers
newBookBtn.addEventListener('click', () => {
  bookFormDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  bookFormDialog.close();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  addBookToLibrary(title, author, pages, read);
  
  bookForm.reset();
  bookFormDialog.close();
});

// Add some sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Dune', 'Frank Herbert', 412, false);
addBookToLibrary('1984', 'George Orwell', 328, true);