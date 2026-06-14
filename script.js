function saveNote() {

    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value;

    if (noteText === "") return;

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

function deleteNote(index) {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function editNote(index) {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNote =
        prompt("Edit your note:", notes[index]);

    if (updatedNote === null) return;

    notes[index] = updatedNote;

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function displayNotes() {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const container =
        document.getElementById("notesContainer");

    container.innerHTML = "";

    notes.forEach((note, index) => {

        const div =
            document.createElement("div");

        div.className = "note";

        div.innerHTML = `
            <p>${note}</p>

            <button onclick="editNote(${index})">
                ✏️ Edit
            </button>

            <button onclick="deleteNote(${index})">
                🗑️ Delete
            </button>
        `;

        container.appendChild(div);

    });
}

displayNotes();