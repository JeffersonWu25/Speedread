
document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const reading = document.getElementById("reading");
    const readingText = document.getElementById("reading-text");
    const button = document.getElementById("start-button");
    let array = [];
    const fileList = document.getElementById("file-list");

    //prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when a file is dragged over it
    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    //Remove highlight when a file is drapped out fo the drop area
    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    //Handle dropped files
    dropArea.addEventListener("drop", function(e) {
        handleDrop(e.dataTransfer.files);
        dropArea.style.display = "none"
    },false);

    fileInput.addEventListener('change', function(e) {
        handleDrop(e.target.files);
        dropArea.style.display = "none"
    });      

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add("highlight");
    }

    function unhighlight() {
        dropArea.classList.remove("highlight");
    }

    function handleDrop(data) {
        const files = data;
        console.log("handling drop")

        if (files.length > 0){
            const file = files[0]
            console.log("handling drop")

            if (file.type === "text/plain"){
                const reader = new FileReader();
                console.log("handling drop")

                reader.onload = function(event) {
                    const fileContents = event.target.result;
                    const wordsArray = fileContents.split(/\s+/);
                    console.log(wordsArray);
                    array = wordsArray;
                    readingText.innerHTML = array[0];
                    reading.style.display = "block"
                    console.log("handling drop")
                };

                reader.readAsText(file);
                }
            else {
                console.log("Please drop a text file.");
            }
        }
    }

    function Display (wordsArray){
        let index = 1;
        const flashDuration = 100;

        function flashWord() {
            if (index < wordsArray.length) {
                let word = wordsArray[index];
                readingText.innerHTML = word;
    
                setTimeout(() => {
                    console.log("");
                    index++;
                    flashWord();
                }, flashDuration);
            }
        }
    
        flashWord();
    }

    button.addEventListener("click", () =>{
        Display(array);
    })
});