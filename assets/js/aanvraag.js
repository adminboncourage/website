const form = document.querySelector('#aanvraag-form');
const expertiseStep = document.querySelector('#expertise-step');
const detailsStep = document.querySelector('#details-step');
const expertiseError = document.querySelector('#expertise-error');
const ready = document.querySelector('#request-ready');
const mailLink = document.querySelector('#request-mail');

form.hidden = false;

document.querySelector('#request-next').addEventListener('click', () => {
    if (!form.querySelector('input[name="expertise"]:checked')) {
        expertiseError.hidden = false;
        form.querySelector('input[name="expertise"]').focus();
        return;
    }

    expertiseError.hidden = true;
    expertiseStep.hidden = true;
    detailsStep.disabled = false;
    detailsStep.hidden = false;
    form.elements.name.focus();
});

document.querySelector('#request-back').addEventListener('click', () => {
    detailsStep.hidden = true;
    detailsStep.disabled = true;
    expertiseStep.hidden = false;
    ready.hidden = true;
    document.querySelector('#request-next').focus();
});

form.addEventListener('input', () => {
    expertiseError.hidden = true;
    ready.hidden = true;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (detailsStep.hidden) {
        document.querySelector('#request-next').click();
        return;
    }

    const data = new FormData(form);
    const subjects = data.getAll('expertise').join(', ');
    const body = [
        `Onderwerpen: ${subjects}`,
        `Naam: ${data.get('name')}`,
        `E-mailadres: ${data.get('email')}`,
        `Telefoonnummer: ${data.get('phone') || 'Niet ingevuld'}`,
        `Bedrijfsnaam: ${data.get('company') || 'Niet ingevuld'}`,
        '',
        'Vraag:',
        data.get('message')
    ].join('\r\n');

    mailLink.href = `mailto:daniel.commers@bon-courage.nl?subject=${encodeURIComponent('Contactaanvraag Bon Courage')}&body=${encodeURIComponent(body)}`;
    ready.hidden = false;
    mailLink.focus();
});
