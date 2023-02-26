
const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}



const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Game start!"
        userAnswer.value = null
        const task = getTask()
        userTask.innerText = task
        userAnswer.hidden = false
        btnGame.innerHTML = "Check!"
        toggleGameState()
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = (isRight ? "You win!" : "You lost!")
        toggleGameState()
        btnGame.innerText = (gameState.taskInProcess) ? "Check!" : "Try again!"
    }
}
btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {
    // console.log(e)
    if (e.key === "Enter") {
        startGameFunc()
    } else if (e.key === "Escape") {
        userAnswer.blur()
    }
})






// console.dir(document)
const choosedEl = document.querySelectorAll(".choosed_block-container div")
const counterEl = document.querySelector(".choosed_block span")

// const choosedState = {
//     countElements: 0
// }
// const changeCount = (value) => {
//     choosedState.countElements += value
//     counterEl.innerText = choosedState.countElements
// }
const choosedState = {
    countElements: 0,
    setCountValue(value) {
        this.countElements += value
        counterEl.innerText = choosedState.countElements
    }
}

const eventFunc = (e) => {
    // choosedEl[i].className = "choosed_element"    
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        // counterEl.innerText = counterEl.innerText - 1   // при вычитании переменная приводит тип к числу автоматом, + перед переменной приводит тип к числовому
        choosedState.setCountValue(-1)
    }
}

for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener("click", eventFunc)
}
// choosedEl[2].removeEventListener("click", eventFunc)






// const timeIsOver = () => {
//     alert("Time is up!")
// }
// setTimeout(timeIsOver, 5000)
// const alarm = setInterval(timeIsOver, 3000)
// clearInterval(alarm)

// будильник
// const alarm = setInterval(() => {
//     let wantToSleep = confirm("Хотите ли вы спасть?")
//     if (wantToSleep) {
//         console.log("tick")
//     } else {
//         clearInterval(alarm)
//     }
// }, 3000)

// асинхронность
// console.log("1")
// setTimeout(() => {
//     console.log("2")
// }, 0)

// console.log("3")




const postsBlock = document.querySelector(".posts_block-container")
const showPostsBTN = document.querySelector(".posts_block button")


function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postItem = document.createElement("p")

    postItem.append(postTitle, postBody)
    postsBlock.append(postItem)

    postTitle.innerText = title
    postBody.innerText = body
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        return response.json()
    })
    .then(data => {
        for (el of data) {
            addPost(el.title, el.body)
        }
    })
    .catch(err => console.log(err.message))
}

// function createPost(title, body, userId) {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         body: JSON.stringify ({
//             title: title,
//             body: body,
//             userId: userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then(response => {
//             console.log(response)
//             return response.json()
//         })
//     .catch (err => console.log(err.message))
// }

// createPost("Title test", "Body test", 15)

showPostsBTN.onclick = () => getPosts()