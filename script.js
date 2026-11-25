const body = document.querySelector("body");
const container = document.querySelector(".container");
const submit = document.querySelector(".submit");
const form = document.querySelector("form");
const dialog = document.querySelector("dialog");

//library arr
const myLibrary = [
    {
        title: "My Stroke of Insight",
        author: "Dr. Jill Bolte Taylor",
        pages: "224",
        read: true,
        id: "c8595784-0edd-4e5c-94f4-f685748a52d3"
    }
];

//book constructor
class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const id = crypto.randomUUID();
    const addBook = new Book(title, author, pages, read, id);
    myLibrary.push(addBook);

}


function displayBooks(myLibrary) {
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement("div");
        container.append(div);

        const title = document.createElement("p");
        title.classList.add("titleZ");
        div.append(title);

        const author = document.createElement("p");
        div.append(author);

        const pages = document.createElement("p");
        div.append(pages);

        const read = document.createElement("p");
        div.append(read);

        const Remove = document.createElement("button");
        Remove.innerText = "Remove";
        div.append(Remove);

        const status = document.createElement("button");
        status.innerText = "Change Status";
        div.append(status);

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;

        if (myLibrary[i].read.checked || myLibrary[i].read == true) {
            read.textContent = "Read";
        }
        else {
            read.textContent = "Not read yet";
            div.classList.add("not");
        }


        const bookId = myLibrary[i].id;
        Remove.addEventListener("click", () => {
            div.remove();


            const index = myLibrary.findIndex(book => book.id === bookId);

            // Always verify the item was found before splicing
            if (index !== -1) {
                myLibrary.splice(index, 1);
            }
        })

        status.addEventListener("click", () => {
            const book = myLibrary.find(b => b.id === bookId);
            if (book.read == true) {
                read.textContent = "Not Read Yet";
                book.read = false;
                div.classList.add("not");

            } else if (book.read == false) {
                read.textContent = "Read";
                book.read = true;
                div.classList.remove("not");
            }
        })
    }
}

displayBooks(myLibrary);

submit.addEventListener("click", submitClick);

function submitClick(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks(myLibrary);

    form.reset();
    dialog.close();
}

