const form = document.querySelector('#register');

register.onsubmit = (ev) => {
  const number = ev.target.number.value;

  (async () => {
    const xhr = await fetch('/api/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
      })
    });

    console.log(xhr);
  })();

  return false;
};
