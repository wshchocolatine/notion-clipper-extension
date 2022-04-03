const button = document.querySelector('button')
const h1 = document.querySelector('h1')

button.addEventListener('click', () => {
    const title = document.querySelector('.title').value 
    const tags = document.querySelector('.tags').value
    const description = document.querySelector('.description').value
    const url = document.querySelector('.url').value

    fetch(`/save?title=${title}&tags=${tags}&description=${description}&url=${url}`)
        .then(() => {
            h1.innerText = "Saved"
        })
        .catch((e) => console.log(e))
})
