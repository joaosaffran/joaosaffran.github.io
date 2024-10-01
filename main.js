let data = [];

window.onload = () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", onFormSubmit);

    data = JSON.parse(localStorage.getItem("mysite:data")) ?? []

    render()
}


function render() {
    const template = document.querySelector("#link-template");
    const frag = document.createDocumentFragment()

    if(data.length > 0){
        data.forEach((it, index) => {
            const newLink = template.cloneNode(true);
            newLink.querySelector("button").dataset['id'] = index;
            newLink.querySelector("a").href = it.url;
            newLink.querySelector("a").textContent = it.title;
            newLink.childNodes.forEach((x) =>{
                if(x.nodeType !== Node.TEXT_NODE)
                    frag.append(x)
            });
            delete newLink;
        });
    }

    const target = document.querySelector("#links ul")
    while (target.firstChild) {
        target.removeChild(target.lastChild);
      }
    target.appendChild(frag);
    delete frag;
}

function removeNode(btn) {
    const id = btn.getAttribute('data-id');
    data.splice(id, 1)
    localStorage.setItem("mysite:data", JSON.stringify(data))

    render()
}

function addNode() {
    const dialog = document.getElementById("my-diag");
    dialog.showModal();
}  

function onFormSubmit(e) {
    e.preventDefault();
    const formElem = document.querySelector("form");
    const formData = new FormData(formElem);

    const url = formData.get("url");
    const title = formData.get("title");

    data.push({url, title});
    localStorage.setItem("mysite:data", JSON.stringify(data))

    const dialog = document.getElementById("my-diag");
    dialog.close();

    render()
}

