let noteForm;

let noteTitle;

let noteText;

let newNoteBtn;

let saveNoteBtn;

let noteList;

if (window.location.pathname === '/notes') {

  noteForm = document.querySelector('.noteForm');

  noteTitle = document.querySelector('.noteTitle');

  noteText = document.querySelector('.noteTextArea');

  newNoteBtn = document.querySelector('.newNote');

  saveNoteBtn = document.querySelector('.saveNote');


  clearBtn = document.querySelector('.clearBtn');

  noteList = document.querySelectorAll('.listContainer .listGroup');
}

// this shows the element
const show = (elem) => {

  elem.style.display = 'inline';
};

// hides an element
const hide = (elem) => {

  elem.style.display = 'none';
};


//keeps track of the note when it's in the textarea
let activeNote = {};

const getNotes = () =>

  fetch('/api/notes', {

    method: 'GET',

    headers: {

      'Content-Type': 'application/json'
    }
  });

const saveNote = (note) =>

  fetch('/api/notes', {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json'
    },

    body: JSON.stringify(note)
  });

const deleteNote = (id) =>

  fetch(`/api/notes/${id}`, {

    method: 'DELETE',

    headers: {

      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {

  hide(saveNoteBtn);

  hide(clearBtn);

  if (activeNote.id) 
    {
    show(newNoteBtn);

    noteTitle.setAttribute('readonly', true);

    noteText.setAttribute('readonly', true);

    noteTitle.value = activeNote.title;

    noteText.value = activeNote.text;

  } else {

    hide(newNoteBtn);

    noteTitle.removeAttribute('readonly');

    noteText.removeAttribute('readonly');

    noteTitle.value = '';

    noteText.value = '';
  }
};

// deletes note
const handleNoteDelete = (e) => {


    e.stopPropagation();
  
    const note = e.target;
  
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note'));
  
    if (activeNote.id === noteId) {
  
      activeNote = {};
    }
  
    deleteNote(noteId).then(() => {
  
      getAndRenderNotes();
  
      renderActiveNote();
    });
  };

const handleNoteSave = () => {
  const newNote = {

    title: noteTitle.value,

    text: noteText.value
  };
  saveNote(newNote).then(() => {

    getAndRenderNotes();

    renderActiveNote();
  });
};



const handleNoteView = (e) => {

  e.preventDefault();

  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  
  renderActiveNote();
};


const handleNewNoteView = (e) => {

  activeNote = {};

  show(clearBtn);

  renderActiveNote();
};


// renders the note titles
const renderNoteList = async (notes) => {

  let jsonNtoes = await notes.json();

  if (window.location.pathname === '/notes') {

    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];


  if (window.location.pathname === '/notes') {

    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

const handleRenderBtns = () => {

    show(clearBtn);
  
    if (!noteTitle.value.trim() && !noteText.value.trim()) {
  
      hide(clearBtn);
  
    } else if (!noteTitle.value.tirm() || !noteText.value.trim()) {
  
      hide(saveNoteBtn);
    } else {
  
      show(saveNoteBtn);
    }
  };
