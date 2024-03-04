FetchUnsplashImage();

//Weather
fetch('https://wttr.in/Tomsk?format=%l:+%c+%t\n')
    .then(response => response.text())
    .then(data => {
        document.getElementById('weather').innerText = data;
    });

//TIME
function updateTime() {
    const now = new Date();
    document.getElementById('time').innerText = 'Time: ' + now.toLocaleTimeString();
}
setInterval(updateTime, 1000);


const editor = new EditorJS({
    holderId : 'editorjs',
    tools: {
        header: {
        class: Header,
            config: {
            placeholder: 'Type a header',
            levels: [2],
            defaultLevel: 2,
        },
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
    },   
    onChange: function () {
            saveContentToLocalStorage(editor);
        },
    data: loadContentFromLocalStorage(),
});

// Function to save EditorJS content to localStorage
function saveContentToLocalStorage(editorInstance) {
    // Get the current content of the editor
    editorInstance.save().then(function (outputData) {
        // Convert the outputData to JSON and store it in localStorage
        localStorage.setItem('sharedEditorText', JSON.stringify(outputData));
    }).catch(function (error) {
        console.error('Error saving content to localStorage:', error);
    });
}

// Function to load EditorJS content from localStorage
function loadContentFromLocalStorage() {
    var defaultTemplate = {
        blocks: [
            {
                type: 'header',
                data: {
                    placeholder: 'Your header text here',
                    level: 2,
                },
            },
            {
                type: 'paragraph',
                data: {
                    placeholder: 'Your paragraph text here',
                },
            },
            // Add more paragraph blocks as needed
        ],
    };
    var savedContent = localStorage.getItem('sharedEditorText');
    if (savedContent) {
        // Parse the saved content from JSON and load it into the editor
       return JSON.parse(savedContent);
    }
    return defaultTemplate;
}
