let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNote() {

    const text = document.getElementById("noteInput").value.trim();
    if (!text) return;

    notes.push({
        text,
        date: new Date().toLocaleString(),
        pinned: false
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteInput").value = "";

    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function editNote(index) {
    let updated = prompt("Edit note:", notes[index].text);
    if (updated === null) return;

    notes[index].text = updated;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function pinNote(index) {
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function displayNotes() {

    const search = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("notesContainer");

    notes.sort((a, b) => b.pinned - a.pinned);

    container.innerHTML = "";

    document.getElementById("notesTitle").innerText =
        `Notes (${notes.length})`;

    notes.forEach((note, index) => {

        if (!note.text.toLowerCase().includes(search)) return;

        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <b>${note.pinned ? "📌 " : ""}${note.text}</b>
            <br>
            <small>${note.date}</small>
            <br><br>

            <button onclick="pinNote(${index})">
                ${note.pinned ? "Unpin" : "Pin"}
            </button>

            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

displayNotes();