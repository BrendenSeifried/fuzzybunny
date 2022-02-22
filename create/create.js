import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    //const name = formData.get('bunny-name');
    //const familyId = formData.get('family-id');
    const bunnie = { name: formData.get('bunny-name'), familyId: formData.get('family-id') };
    console.log(bunnie);
    await createBunny(bunnie);
    // location.replace('../families');
    // prevent default

    // get the name and family id from the form

    // use createBunny to create a bunny with this name and family id
    
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    // const select = document.querySelector('select');
    // go get the families from supabase
    const select = document.querySelector('select');
    const families = await getFamilies();
    for (let family of families) {
        const option = document.createElement('option');
        option.value = family.id;
        option.textContent = family.name;
        select.append(option);
    }
    // for each family

    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
