function saveNote() {

    const noteInput = document.getElementById("noteInput");
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    notes.push({
        text: noteText,
        date: new Date().toLocaleString(),
        pinned: false
    });

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

function deleteAllNotes() {

    const answer = confirm("Delete all notes?");

    if (!answer) {
        return;
    }

    localStorage.removeItem("notes");

    displayNotes();
}

function editNote(index) {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const updated = prompt(
        "Edit your note:",
        notes[index].text
    );

    if (updated === null) {
        return;
    }

    notes[index].text = updated;

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function pinNote(index) {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    notes[index].pinned = !notes[index].pinned;

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function displayNotes() {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    // Sort pinned notes first
    notes.sort((a, b) => {

        if (typeof a === "string" || typeof b === "string") {
            return 0;
        }

        return Number(b.pinned) - Number(a.pinned);

    });

    const container =
        document.getElementById("notesContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const title =
        document.getElementById("notesTitle");

    if (title) {
        title.textContent =
            `Saved Notes (${notes.length})`;
    }

    container.innerHTML = "";

    notes.forEach((note, index) => {

        // Support old notes stored as strings
        if (typeof note === "string") {
            note = {
                text: note,
                date: "",
                pinned: false
            };
        }

        if (
            !note.text
                .toLowerCase()
                .includes(search)
        ) {
            return;
        }

        const div =
            document.createElement("div");

        div.className = "note";

        div.innerHTML = `
            <h3>${note.pinned ? "📌 " : ""}${note.text}</h3>

            <small>🕒 ${note.date}</small>

            <br><br>

            <button onclick="pinNote(${index})">
                ${note.pinned ? "📍 Unpin" : "📌 Pin"}
            </button>

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