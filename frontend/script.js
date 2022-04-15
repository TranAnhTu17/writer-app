window.onload = function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const API_URL = "http://localhost:5000/api";

    const docItems = $$(".doc-item");
    const wrapperDocItem = $(".docs");
    const popup = $(".popup");
    const submitBtn = $(".submit-btn");
    const titleInput = $(".title-input");
    const descriptionInput = $(".description-input");
    const passwordInput = $(".password-input");
    const titleBox = $(".title-box");
    const descriptionBox = $(".description-box");
    const popupPassword = $(".popup-password");
    const popupConfirm = $(".popup-confirm");
    const saveBtn = $(".save-btn");

    let clickedDocID = "";
    const app = (function () {
        return {
            async handleGetDoc() {
                try {
                    const response = await axios.get(
                        `${API_URL}/document/${clickedDocID}/`
                    );

                    if (response.data.success) {
                        alert("Success!");
                        const { title, description } = response.data.document;
                        titleBox.value = title;
                        descriptionBox.value = description;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async handleInsertDoc(title, description, password) {
                const newDoc = { title, description, password };
                try {
                    const response = await axios.post(
                        `${API_URL}/document`,
                        newDoc
                    );

                    if (response.data.success) {
                        alert("Success!");
                        this.render();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async handleUpdateDoc(docID, title, description) {
                const newDoc = { title, description };
                try {
                    const response = await axios.patch(
                        `${API_URL}/document/${docID}`,
                        newDoc
                    );

                    if (response.data.success) {
                        alert("Success!");
                        this.render();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async handleDeleteDoc(docID) {
                try {
                    const response = await axios.delete(
                        `${API_URL}/document/${docID}`
                    );

                    if (response.data.success) {
                        alert("Success!");
                        this.render();
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            handleEvent() {
                const handleClosePopup = () => {
                    popup.classList.remove("open");
                    popupPassword.value = "";
                };

                popup.onclick = (e) => {
                    if (!e.target.closest(".popup-container")) {
                        handleClosePopup();
                    }
                };

                wrapperDocItem.onclick = async (e) => {
                    const docItem = e.target.closest(".doc-item");
                    const deleteBtn = e.target.closest(".delete-btn");

                    if (docItem && !deleteBtn) {
                        popup.classList.add("open");
                        clickedDocID = docItem.getAttribute("data-id");
                    }

                    // delete document
                    if (deleteBtn) {
                        clickedDocID = deleteBtn.getAttribute("data-id");
                        this.handleDeleteDoc(clickedDocID);
                    }
                };

                popupConfirm.onclick = async () => {
                    try {
                        const password = popupPassword.value.trim();
                        console.log("password", password);
                        const response = await axios.post(
                            `${API_URL}/document/${clickedDocID}/`,
                            { password }
                        );

                        if (response.data.success) {
                            this.handleGetDoc();
                        } else {
                            alert(response.data.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    handleClosePopup();
                };

                // create document
                submitBtn.onclick = () => {
                    const title =
                        titleInput.value.trim() === ""
                            ? "Untitled document"
                            : titleInput.value.trim();
                    const description = descriptionInput.value.trim();
                    const password = passwordInput.value.trim();
                    this.handleInsertDoc(title, description, password);

                    titleInput.value = "";
                    descriptionInput.value = "";
                    passwordInput.value = "";
                };

                // update document
                saveBtn.onclick = async () => {
                    if (clickedDocID !== "") {
                        const title =
                            titleBox.value.trim() === ""
                                ? "Untitled document"
                                : titleBox.value.trim();
                        const description = descriptionBox.value.trim();
                        this.handleUpdateDoc(clickedDocID, title, description);
                    }
                };
            },
            async render() {
                // get documents
                try {
                    const response = await axios.get(`${API_URL}/document`);

                    if (response.data.success) {
                        let listDoc = response.data.documents;
                        const htmls = listDoc
                            .map((doc) => {
                                return `<li class="doc-item" data-id=${doc._id}>
                                <h3 class="doc-title">${doc.title}</h3>
                                <button class="delete-btn" data-id=${doc._id}>Delete</button>
                            </li>`;
                            })
                            .join("");
                        wrapperDocItem.innerHTML = htmls;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            init() {
                this.handleEvent();
                this.render();
            },
        };
    })();
    app.init();
};
