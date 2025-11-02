(function(){
  const form = document.getElementById('form');
  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMessage');
  
  if (!form || !btn || !msg) {
    console.error("Un ou plusieurs éléments n'ont pas été trouvés");
    return;
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault(); // empêche la redirection par défaut
    btn.disabled = true;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
      alert('Message envoyé avec succès !');
      form.reset();
      } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      alert('Erreur réseau. Réessayez plus tard.');
    } finally {
      btn.disabled = false;
      msg.textContent = '';
    }
  });
})();