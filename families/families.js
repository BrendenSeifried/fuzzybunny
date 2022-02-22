import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');
console.log(familiesEl);
logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamily() {

    familiesEl.textContent = '';
    const families = await getFamilies();

    for (let family of families) {
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');

        bunniesEl.classList.add('bunnies');
        familyEl.classList.add('family');
        nameEl.textContent = family.name;

        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('div');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;
            bunnyEl.addEventListener('click', async ()=> {
                await deleteBunny(bunny.id);

                const newFamilies = await getFamilies();
                displayFamily(newFamilies);
            });
            bunniesEl.append(bunnyEl);
        }
        familyEl.append(nameEl, bunniesEl);
        familiesEl.append(familyEl);

    }
}





window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamily(families);
});


