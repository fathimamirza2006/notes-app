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
        date: new Date().toLocaleString()
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

function displayNotes() {

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    const container =
        document.getElementById("notesContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    container.innerHTML = "";

    notes.forEach((note, index) => {

        if (typeof note === "string") {
            note = {
                text: note,
                date: ""
            };
        }

        if (!note.text.toLowerCase().includes(search)) {
            return;
        }

        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.text}</h3>
            <small>🕒 ${note.date}</small>
            <br><br>
            <button onclick="editNote(${index})">✏️ Edit</button>
            <button onclick="deleteNote(${index})">🗑️ Delete</button>
        `;

        container.appendChild(div);
    });

}

displayNotes();