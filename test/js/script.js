window.addEventListener('DOMContentLoaded', () => {
    (function () {
        "use strict";
        var contactForm = document.getElementById('contact-form-js');
        var contactsList = document.getElementById('contacts-list-js');
        if (contactForm && contactsList) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                var name = document.getElementById('name') ? document.getElementById('name').value : '';
                var email = document.getElementById('email') ? document.getElementById('email').value : '';
                var message = document.getElementById('message') ? document.getElementById('message').value : '';

                var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contacts.push({ name, email, message });
                localStorage.setItem('contacts', JSON.stringify(contacts));

                contactForm.reset();
                displayContacts();
            });

            function displayContacts() {
                contactsList.innerHTML = '';
                var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contacts.forEach((contact, index) => {
                    var contactDiv = document.createElement('div');
                    contactDiv.className = 'contact';
                    contactDiv.innerHTML = `
                        <span>${contact.name} - ${contact.email} - ${contact.message}</span>
                    `;
                    contactsList.appendChild(contactDiv);
                });
            }

            window.removeContact = (index) => {
                var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                displayContacts();
            };
        } else {
            console.log('Форма контактов не найдена на странице.');
        }

        var canvas = document.getElementById('canvas-js');
        if (canvas) {
            var cx = canvas.getContext("2d");
            var img = document.createElement("img");
            img.src = "media/player.png";
            var spriteW = 40, spriteH = 65;
            img.addEventListener("load", function() {
                var cycle = 0;
                setInterval(function() {
                    cx.clearRect(0, 0, spriteW, spriteH);
                    cx.drawImage(img, cycle * spriteW, 0, spriteW, spriteH, 0, 0, spriteW, spriteH);
                    cycle = (cycle + 1) % 8;
                }, 160);
            });
        } else {
            console.log('Canvas не найден на странице.');
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert('Ваше местоположение: ' + position.coords.latitude + ', ' + position.coords.longitude);
            });
        } else {
            console.log('Геолокация не поддерживается вашим браузером.');
        }

        const worker = new Worker('js/worker.js');
        worker.postMessage(10);

        worker.onmessage = function(e) {
            console.log('Результат: ' + e.data);
        };
    })();
});