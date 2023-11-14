//Initialization
const COHORT = "2308-ACC-PT-WEB-PT-A";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

 const state = {
    parties: [],
 };

 // References
 const partyList = document.querySelector("#parties");

 const addPartyForm = document.querySelector("#addParty");
 // Event listener
 addPartyForm.addEventListener("submit", addParty);

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
    partyList.innerHTML = "<li>No artists.</li>";
    return;
    }

    const partiesCards = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.date}</p>
        <p>${party.location}</p>
        <p>${party.description}</p>
        <p>${party.id}</p>
    `;
   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Me";
    li.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteParty(party.id));
    return li;
  });
  partyList.replaceChildren(...partiesCards);
};

async function addParty(event){
  event.preventDefault();

  try{
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        name: addPartyForm.name.value,
        date: addPartyForm.date.value,
        location: addPartyForm.location.value,
        description: addPartyForm.description.value,
      }),
    });
    if(!response.ok){
      throw new Error("Failed to create party")
    }
    //add more specific error handling for different types of failures like network issues or validation error.
    render();
  }
  catch(error){
    console.error(error);
  }
}
 
async function deleteParty(partyId) {
  try {
      const response = await fetch(`${API_URL}/${partyId}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error('Failed to delete party');
      }

      render(); // Re-render the parties list to reflect the deletion
  } catch (error) {
      console.error(error);
  }
}