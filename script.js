function saveNote() {

    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

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

    const updatedNote = prompt(
        "Edit your note:",
        notes[index]
    );

    if (updatedNote === null) {
        return;
    }

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

    const searchInput =
        document.getElementById("searchInput");

    let searchText = "";

    if (searchInput) {
        searchText = searchInput.value.toLowerCase();
    }

    container.innerHTML = "";

    notes.forEach((note, index) => {

        if (
            !note.toLowerCase().includes(searchText)
        ) {
            return;
        }

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