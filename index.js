function read(id) {
    return document.getElementById(id).value
}

async function Translate() {
    try {

        const input = read("input-text")
        const input_lang = read("inp_lang")
        const out_lang = read("out_lang")

        const res = await fetch(`https://libretranslate.de/translate`, {
            method: "POST",

            body: JSON.stringify({
                q: input,
                source: input_lang,
                target: out_lang,
                format: "text",
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await res.json()
        append(data)
        return data
        console.log("data", data)
    } catch (err) {
        console.log("err", err)
    }
}

function append(data) {

    document.getElementById("output_values").innerText = data.translatedText;
    document.getElementById("output_values").style.color = "black"
}


async function combine() {

    let data = await Translate()

    append(data)

}


let id;

function debouncing(func, delay) {
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function () {
        func()
    }, delay)
}




// to add voice recognition


let query = document.getElementById("input-text").value
let queryy = document.getElementById("input-text")


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (SpeechRecognition) {
    console.log("Support")

    let micBtn = document.getElementById("record")
    let micIcon = micBtn.querySelector("i")

    let english=document.getElementById("inp_lang")

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = "hi"


    // if (english.value == "en") {
    //     console.log("English")
    //     recognition.lang = "en"
    // }
    // else if (english.value== "hi") {
    //     console.log("Hindi")
    //     recognition.lang = "hi"
    // }

    micBtn.addEventListener("click", micBtnClick)

    function micBtnClick() {

        if (micIcon.classList.contains("fa-microphone")) {

            recognition.start()
        }
        else {
            recognition.stop()
        }
    }
    recognition.addEventListener("start", startSpeechrecognition)

    function startSpeechrecognition() {
        console.log("startSpeechrecognition active")
        micIcon.classList.remove("fa-microphone")
        micIcon.classList.add("fa-microphone-slash")
        queryy.focus()
    }

    recognition.addEventListener("end", endSpeechrecognition)

    function endSpeechrecognition() {
        console.log("startSpeechrecognition disable")
        micIcon.classList.remove("fa-microphone-slash")
        micIcon.classList.add("fa-microphone")
        queryy.focus()
    }

    recognition.addEventListener("result", resultSpeechrecognition)

    function resultSpeechrecognition(event) {
        console.log(event)
        const transcript = event.results[0][0].transcript
        queryy.value = transcript
        // setTimeout(function(){
        //     debouncing(combineboth,2000)
        // },1000)
    }
}
else {
    console.log("Not supported ")
}





