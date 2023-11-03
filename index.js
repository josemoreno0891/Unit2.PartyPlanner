//Initialization
const COHORT = "2308-ACC-PT-WEB-PT-A";
const API_URL = `https://fsa-async-await.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/parties`;

 const state = {
    parties: [],
 };

 // References
 const partyList = document.querySelector("#parties");

 const addPartyForm = document.querySelector("#addParty");
 // Event listener
 addPartyForm.addEventListener("submit", addParties);

 //Sync state with the API and rerender
 async function render() {
    await getParties();
    renderParties();
  }
  render();

 //update state with parties from API
 async function getParties() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.parties = json.data;
    } catch (error) {
      console.error(error);
    }
  }

 //render parties from state

function renderParties() {
    if (!state.parties.length) {
    partiesList.innerHTML = "<li>No artists.</li>";
    return;
    }

    const partiesCards = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${party.names}</h2>
        <p>${party.dates}</p>
        <p>${party.times}</p>
        <p>${party.locations}</p>
        <p>${party.description}</p>
    `;
    return li;
    });

    partiesList.replaceChildren(...patiesCards);
}

async function addParty(event){
  event.preventDefuald();

  try{
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        name: addPartyForm.name.value,
        date: addPartyForm.date.value,
        time: addPartyForm.time.value,
        lication: addPartyForm.location.value,
        discription: addPartyForm.discription.value,
      }),
    });
    if(!response.ok){
      throw new Error("Failed to create party")
    }
    render();
  }
  catch(error){
    console.error(error);
  }
}
  
