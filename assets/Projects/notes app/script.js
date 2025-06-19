document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes-container");
    const createBtn = document.querySelector(".btn");

    // Load notes from localStorage (array of strings)
    function loadNotes() {
        notesContainer.innerHTML = ""; // clear existing notes
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.forEach(text => {
            createNoteElement(text);
        });
    }

    // Save notes as array of strings
    function saveNotes() {
        const notes = [];
        document.querySelectorAll(".input-box").forEach(noteEl => {
            notes.push(noteEl.innerText.trim());
        });
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Create a note element and add it to the container
    function createNoteElement(text = "") {
        let inputBox = document.createElement("p");
        let img = document.createElement("img");

        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.textContent = text;

        img.src = "images/delete icon.png";
        img.className = "delete-icon";
        inputBox.appendChild(img);

        notesContainer.prepend(inputBox);

        // Add event listeners
        img.addEventListener("click", () => {
            inputBox.remove();
            saveNotes();
        });

        inputBox.addEventListener("input", () => {
            saveNotes();
        });
    }

    createBtn.addEventListener("click", () => {
        createNoteElement();
        saveNotes();
    });

    loadNotes();
});





