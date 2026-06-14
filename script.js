function saveNote() {

    const noteInput =
        document.getElementById("noteInput");

    const noteText = noteInput.value;

    if(noteText === "") return;

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    notes.push(noteText);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    noteInput.value = "";

    displayNotes();
}

function displayNotes() {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const container =
        document.getElementById("notesContainer");

    container.innerHTML = "";

    notes.forEach(note => {

        const div =
            document.createElement("div");

        div.className = "note";

        div.textContent = note;

        container.appendChild(div);

    });
}

displayNotes();