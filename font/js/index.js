console.log("作者：小恒不会java")
console.log("欢迎查看源代码！")


document.getElementById('add_book').addEventListener('click', addBook);
document.getElementById('book_list').addEventListener('DOMContentLoaded', fetchBooks);

function addBook() {
    const bookName = document.getElementById('book_name').value;
    if (!bookName) {
        alert('Please enter a book name');
        return;
    }

    fetch('http://127.0.0.1:8000/api/add_book?book_name=' + encodeURIComponent(bookName), {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.error_num === 0) {
            alert('Book added successfully');
            fetchBooks();
            console.log("add_book接口测试成功");

        } else {
            alert('Error: ' + data.msg);
            console.log("add_book接口测试失败");
        }
    })

}

function fetchBooks() {
    fetch('http://127.0.0.1:8000/api/show_books/', {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        if (data.error_num === 0) {
            const bookList = document.getElementById('book_list');
            bookList.innerHTML = '';
            data.list.forEach(book => {
                const li = document.createElement('li');
                li.textContent = book.fields.book_name;
                bookList.appendChild(li);
            });
            console.log("show_books接口测试成功");
        } else {
            alert('Error: ' + data.msg);
            console.log("show_books接口测试失败");

        }
    })
    
    .catch(error => {
        alert('Error: ' + error);
    });
}