const deleteButton = document.querySelectorAll(".fa-trash");
const upvoteButton = document.querySelectorAll(".fa-arrow-up");
const downvoteButton = document.querySelectorAll(".fa-arrow-down");

Array.from(deleteButton).forEach((btn) => {
    btn.addEventListener("click", deleteMovie);
});
Array.from(upvoteButton).forEach((btn) => {
    btn.addEventListener("click", upvoteMovie);
});
Array.from(downvoteButton).forEach((btn) => {
    btn.addEventListener("click", downvoteMovie);
});

async function upvoteMovie() {
    const movieText = this.parentNode.childNodes[1].innerText;
    const movieRank = Number(this.parentNode.childNodes[3].innerText)
    try {
        const response = await fetch('upvoteMovie', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieNameFromJS': movieText,
                'rankingFromJS': movieRank
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    } catch (err) {
        console.error(err)
    }
}

async function downvoteMovie() {
    const movieText = this.parentNode.childNodes[1].innerText;
    const movieRank = Number(this.parentNode.childNodes[3].innerText)
    try {
        const response = await fetch('downvoteMovie', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieNameFromJS': movieText,
                'rankingFromJS': movieRank
            })
        })
        const data = await response.json()
        console.log(data);
        location.reload()
    } catch (err) {
        console.error(err)
    }
}

async function deleteMovie() {
    const movieText = this.parentNode.childNodes[1].innerText;
    try {
        const response = await fetch('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieNameFromJS': movieText
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    } catch(err) {
        console.error(err)
    }
}