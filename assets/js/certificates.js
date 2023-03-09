async function getCertificates() {
    const res = await fetch('/json/certificates.json');
    const data = await res.json();
    console.log(data);
    return data;
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
    return certificate;
}
