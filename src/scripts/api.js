const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: 'cd982747-985d-4d60-8917-00c59ce2d418',
    'Content-Type': 'application/json'
  }
};

const check = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInfoUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const addCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => check(res))
  .catch((err) => {
    console.log(err);
  }); 
};