document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.querySelector("drop-area");
    const fileInput = document.quearySelector("file-input");
    const fileList = document.getElementById("file-list")

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
    dropArea.addEventListener("drop", handleDrop, false);
    
    //Open file dialog when the drop area is clicked
    dropArea.addEventListener("click", () => {
        fileInput.click();
    });

    //Handle files selected through the file input
    fileInput.addEventListener("change", handleFiles, false);

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

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        for (const file of files) {
            displayFile(file);
        }
    }

    function displayFile(file) {
        const listItem = document.createElement("li");
        listItem.className = "file-item";
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
    }

});