document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        alert('Merci pour votre message ! Je vous répondrai rapidement.');
        form.reset();
      } else {
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    }).catch(() => {
      alert('Une erreur réseau est survenue, veuillez réessayer.');
    });
  });
});