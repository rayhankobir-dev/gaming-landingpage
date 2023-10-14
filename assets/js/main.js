window.addEventListener('load', async () => {
    getTeams();

    const tournaments = document.getElementsByClassName('tournament');
    for(let i = 0; i<tournaments.length; i++) {
        tournaments[i].addEventListener('mouseover', function() {
            const imageContainer = tournaments[i].querySelector('.image-container');
            const image = imageContainer.querySelector('img');
            generateImage(image);
        })
    }

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            navLinks.forEach(function (link) { link.classList.remove('active') })
            this.classList.add("active");
        });
    });
});

function toggleMenu() {
    const navItems = document.getElementById("navItems");
    navItems.classList.toggle("visible");

    var menuIcon = document.getElementById("menuIcon");

    if (navItems.classList.contains('visible')) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-x");
    } else {
        menuIcon.classList.remove("fa-x");
        menuIcon.classList.add("fa-bars");
    }
}
  
async function getTeams() {
    const response = await fetch('https://api.opendota.com/api/teams')
    if(response.ok) {
        const data = await response.json();
        const teamsContainer = document.getElementById('teams');
        teamsContainer.innerHTML = '';

        for (let i = 0; i < Math.min(data.length, 12); i++) {
            const team = data[i];
            const item = `
                <div class="team" >
                    <b class="tag">${team.tag}</b>
                    <div class="team-image">
                        <img src="${team.logo_url}" alt="">
                    </div>
                    <div class="team-data">
                        <h2>${team.name}</h2>
                        <div class="stats">
                            <p><b>Wins:</b> ${team.wins}</p>
                            <p><b>Losses:</b> ${team.losses}</p>
                        </div>
                    </div>
                </div>
            `;
            teamsContainer.innerHTML += item;
        }
    }else {
        console.log('Something elese')
    }
}

const images = [
    'assets/images/characters/character-1.png',
    'assets/images/characters/character-2.png',
    'assets/images/characters/character-3.png',
    'assets/images/characters/character-4.png',
]
function generateImage(img) {
    const randomIndex = Math.floor(Math.random() * images.length);
    img.src = images[randomIndex];
}
