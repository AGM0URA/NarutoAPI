document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get('id');
    if (characterId) {
        showCharacterDetails(characterId);
    } else {
        const characterDetailsElement = document.getElementById("character-details");
        characterDetailsElement.textContent = "Não foi possível encontrar os detalhes do personagem.";
    }
});

async function showCharacterDetails(characterId) {
    const url = `https://dattebayo-api.onrender.com/characters/${characterId}`;

    try {
        const response = await fetch(url);
        const character = await response.json();

        const characterDetailsElement = document.getElementById("character-details");
        characterDetailsElement.innerHTML = `
            <h2>${character.name}</h2>
            <div class="family-details">
                <h3>Família:</h3>
                <ul>
                    <li><strong>Pai:</strong> ${character.family.father || 'Não especificado'}</li>
                    <li><strong>Mãe:</strong> ${character.family.mother || 'Não especificado'}</li>
                    <li><strong>Filho:</strong> ${character.family.son || 'Não especificado'}</li>
                    <li><strong>Filha:</strong> ${character.family.daughter || 'Não especificado'}</li>
                    <li><strong>Esposa:</strong> ${character.family.wife || 'Não especificado'}</li>
                    <li><strong>Filho Adotivo:</strong> ${character.family['adoptive son'] || 'Não especificado'}</li>
                </ul>
            </div>
            <div class="jutsu-details">
                <h3>Jutsu:</h3>
                <ul>
                    ${character.jutsu.map(jutsu => `<li>${jutsu}</li>`).join('')}
                </ul>
            </div>
            <p><strong>Natureza do Chakra:</strong> ${character.natureType && character.natureType.length > 0 ? character.natureType.join(", ") : 'Não especificado'}</p>
        `;

        const backButton = document.createElement("button");
        backButton.textContent = "Voltar para Personagens";
        backButton.addEventListener("click", voltarParaPersonagens);
        characterDetailsElement.appendChild(backButton);
    } catch (error) {
        console.error("Ocorreu um erro ao obter os detalhes do personagem:", error);
    }
}

function voltarParaPersonagens() {
    window.location.href = "character.html";
}
