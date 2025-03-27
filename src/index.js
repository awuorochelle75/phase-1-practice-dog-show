document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.querySelector("#table-body");
    const dogForm = document.querySelector("#dog-form");

    let selectedDogId = null;

   
    function fetchDogs() {
        fetch("http://localhost:3000/dogs")
            .then(response => response.json())
            .then(dogs => {
                dogTable.innerHTML = "";
                dogs.forEach(dog => renderDogRow(dog));
            });
    }

    function renderDogRow(dog) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class="edit-btn" data-id="${dog.id}">Edit</button></td>
        `;

       
        row.querySelector(".edit-btn").addEventListener("click", () => {
            selectedDogId = dog.id;
            dogForm.name.value = dog.name;
            dogForm.breed.value = dog.breed;
            dogForm.sex.value = dog.sex;
        });

        dogTable.appendChild(row);
    }

    
    dogForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!selectedDogId) return;

        const updatedDog = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        };

        fetch(`http://localhost:3000/dogs/${selectedDogId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedDog)
        })
        .then(response => response.json())
        .then(() => {
            fetchDogs(); 
            dogForm.reset();
            selectedDogId = null;
        });
    });

    
    fetchDogs();

})