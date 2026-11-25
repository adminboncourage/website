const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    const status = document.querySelector('#contact-form-status');
    const mailLink = document.querySelector('#contact-mail-link');
    contactForm.hidden = false;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(contactForm);
        const body = [
            `Onderwerp: ${data.get('topic')}`,
            `Naam: ${data.get('name')}`,
            `Bedrijfsnaam: ${data.get('company') || 'Niet ingevuld'}`,
            `E-mailadres: ${data.get('email')}`,
            `Telefoonnummer: ${data.get('phone') || 'Niet ingevuld'}`,
            '',
            'Bericht:',
            data.get('message')
        ].join('\r\n');

        mailLink.href = `mailto:daniel.commers@bon-courage.nl?subject=${encodeURIComponent('Contactaanvraag Bon-Courage')}&body=${encodeURIComponent(body)}`;
        mailLink.hidden = false;
        status.textContent = 'Uw bericht is nog niet verstuurd. Open uw e-mailprogramma via de link hieronder en verstuur het daar.';
        status.hidden = false;
        mailLink.focus();
    });
}
