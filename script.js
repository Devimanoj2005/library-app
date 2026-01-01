// Library Array
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype Method
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add Book Function
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// Display Books
function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not Read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    libraryDiv.appendChild(card);
  });

  attachEvents();
}

// Attach Events
function attachEvents() {
  document.querySelectorAll(".remove-book").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.parentElement.dataset.id;
      removeBook(id);
    });
  });

  document.querySelectorAll(".toggle-read").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.parentElement.dataset.id;
      toggleReadStatus(id);
    });
  });
}

// Remove Book
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  displayBooks();
}

// Toggle Read Status
function toggleReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  book.toggleRead();
  displayBooks();
}

// Form Handling
const newBookBtn = document.getElementById("newBookBtn");
const form = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

newBookBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  form.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // VERY IMPORTANT

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  form.reset();
  form.classList.add("hidden");
});

// Sample Books
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
