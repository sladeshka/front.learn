document.addEventListener('DOMContentLoaded', () => {
    (function () {
        "use strict";
        const contactForm = document.getElementById('contactForm');
        const contactsList = document.getElementById('contactsList');

        function displayContacts() {
            contactsList.innerHTML = '';
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.forEach((contact, index) => {
                const contactDiv = document.createElement('div');
                contactDiv.className = 'contact';
                contactDiv.innerHTML = `
                    <span>${contact.name} - ${contact.phone}</span>
                    <button onclick="removeContact(${index})">Удалить</button>
                `;
                contactsList.appendChild(contactDiv);
            });
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.push({ name, phone });
            localStorage.setItem('contacts', JSON.stringify(contacts));

            contactForm.reset();
            displayContacts();
        });

        window.removeContact = (index) => {
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            displayContacts();
        };

        displayContacts();

        function saveData() {
            const inputData = document.getElementById('inputField').value;
            localStorage.setItem('userData', inputData);
        }

        function loadData() {
            const savedData = localStorage.getItem('userData');
            if (savedData) {
                document.getElementById('inputField').value = savedData;
            }
        }

        document.getElementById('saveButton').addEventListener('click', saveData);
        window.addEventListener('load', loadData);

        function saveData() {
            const inputData = document.getElementById('inputField').value;
            sessionStorage.setItem('userData', inputData);
        }

        function loadData() {
            const savedData = sessionStorage.getItem('userData');
            if (savedData) {
                document.getElementById('inputField').value = savedData;
            }
        }

        document.getElementById('saveButton').addEventListener('click', saveData);
        window.addEventListener('load', loadData);
    })();
});