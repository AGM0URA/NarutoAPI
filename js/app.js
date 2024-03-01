//PEGAR A IMAGENS DOS PERSONAGENS POR PAGINA
async function getAllCharacters(page, perPage) {
    const url = `https://dattebayo-api.onrender.com/characters?page=${page}&limit=${perPage}`;
    const loadingElement = document.querySelector("#loading");
    const charactersContainer = document.querySelector("#characters");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (loadingElement) {
            loadingElement.classList.add("hide");
        }

        charactersContainer.innerHTML = '';

        data.characters.forEach(character => {
            const div = document.createElement("div");
            div.classList.add("character");

            const image = document.createElement("img");
            image.src = Array.isArray(character.images) ? character.images[0] : '';
            image.alt = character.name;

            const verMaisLink = document.createElement("a");
            verMaisLink.href = `details.html?id=${character.id}`;
            verMaisLink.textContent = "Ver Mais";
            verMaisLink.classList.add("ver-mais-link");

            div.appendChild(image);
            div.appendChild(verMaisLink);

            charactersContainer.appendChild(div);
        });

        updatePageNumbers();
    } catch (error) {
        console.error("Ocorreu um erro ao obter a lista de personagens:", error);
    }
}

//PASSAR A PÁGINA
function updatePageCounter(currentPage) {
    const pageCounter = document.querySelector("#pageCounter");
    if (pageCounter) {
        pageCounter.textContent = `Página ${currentPage}`;
    }
}

function createPageNumbers() {
    const pageNumbersContainer = document.querySelector("#pageNumbers");
    if (pageNumbersContainer) {
        for (let i = 1; i <= 10; i++) {
            const pageNumber = document.createElement("span");
            pageNumber.classList.add("page-number");
            pageNumber.classList.add("page");
            pageNumber.textContent = i;
            pageNumbersContainer.appendChild(pageNumber);
        }
    }
}

function updatePageNumbers() {
    const pageNumbers = document.querySelectorAll(".page-number");
    pageNumbers.forEach(number => {
        if (parseInt(number.textContent) === currentPage) {
            number.classList.add("current-page");
        } else {
            number.classList.remove("current-page");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const perPage = 20;
    let currentPage = 1;

    getAllCharacters(currentPage, perPage);
    updatePageCounter(currentPage);
    createPageNumbers();

    document.getElementById("nextPage").addEventListener("click", function() {
        currentPage++;
        getAllCharacters(currentPage, perPage);
        updatePageCounter(currentPage);
    });

    document.getElementById("prevPage").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            getAllCharacters(currentPage, perPage);
            updatePageCounter(currentPage);
        }
    });

    document.querySelectorAll(".page-number").forEach(number => {
        number.addEventListener("click", function() {
            currentPage = parseInt(this.textContent);
            getAllCharacters(currentPage, perPage);
            updatePageCounter(currentPage);
            updatePageNumbers();
        });
    });
});
