async function getCertificates() {
    return inData.Achivement.items.Certificates.items;
}

async function renderCertificates() {
    const certificatesContainer = document.querySelector('.certificates-container');
    getCertificates().then(data => {
        data.forEach(certificate => {
            certificatesContainer.appendChild(createCertificate(certificate));
        });
    });
}

// template
// {
//     "name":"",
//     "image":""
// }
function createCertificate(data) {
    const aos = document.createElement('div');
    // aos
    aos.setAttribute('data-aos', 'fade-up');
    aos.setAttribute('data-aos-delay', '100');
    aos.setAttribute('data-aos-duration', '500');

    const certificate = document.createElement('div');
    certificate.classList.add('certificate');
    const image = document.createElement('img');
    image.src = data.image;
    const name = document.createElement('p');
    name.textContent = data.name;
    certificate.appendChild(name);
    certificate.appendChild(image);
    certificate.addEventListener('click', () => {
        window.open(data.image, '_blank');
    });

    aos.appendChild(certificate);
    return aos;
}
