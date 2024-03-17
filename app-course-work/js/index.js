import {currentTime} from './clock.js';
import {getUserList, getUserById} from './user.js';

// Запускаем clock
currentTime();

class ItcModal {
  #template = `
  <div class="modal" id="myModal">
  <div class="modal-content">
    <input class="modal-title" id="title" value="{{title}}">   Title</input>
    <input class="modal-description" id="description" value="{{description}}">   Description</input>
    <select class="modal-select" id="select">
    {{options}}
    </select>
    <div class="modal-buttons">
      <button class="modal-button modal-button-cancel" >Отмена</button>
      <button class="modal-button modal-button-confirm" >Подтвердить</button>
    </div>
  </div>
</div>
`;

  constructor({title, description, options} = {}) {
    this.title = title;
    this.description = description;
    this.options = options;
  }

  render() {
    const modal = document.createElement('div');

    modal.innerHTML = this.#template
      .replace('{{title}}', this.title)
      .replace('{{description}}', this.description)
      .replace('{{options}}', this.options);
    document.body.append(modal);
  }

  remove() {
    const modal = document.getElementById('myModal');
    modal.remove();
  }
}

const users = getUserList();
const cardId = 1710707235123;
users.then(users => {
  let LScardList = JSON.parse(localStorage.getItem('cards'));
  if (!LScardList) {
    LScardList = [];
  }
  let modal = new ItcModal();
  let indexCard = '';
  LScardList.forEach(card => {
    if (card.id == cardId) {
      indexCard = LScardList.indexOf(card);
      modal = new ItcModal({
        title: card.title,
        description: card.description,
        options: users.map(user => `<option id="${user.id}">${user.name}</option>`).join(''),
      });
      //modal.render();
    }
  });

  // const modal = new ItcModal({
  //   title: 'Заголовок',
  //   description: 'Описание модального окна...',
  //   options: users.map(user => `<option id="${user.id}">${user.name}</option>`).join(''),
  //   footerButtons: [{class: 'btn btn-close', text: 'Закрыть', action: 'close'}],
  // });
  // console.log(modal);
  const open = document.getElementById('openModal');
  open.addEventListener('click', () => {
    modal.render();

    const confirm = document.querySelector('.modal-button-confirm');
    confirm.addEventListener('click', () => {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const select = document.getElementById('select');
      const option = select.options[select.selectedIndex];
      const user = option.id;

      const card = {
        id: cardId,
        title: title,
        description: description,
        user: user,
      };

      let cardList = JSON.parse(localStorage.getItem('cards'));
      if (!cardList) {
        cardList = [];
      }
      cardList[indexCard] = card; // fix logic
      localStorage.setItem('cards', JSON.stringify(cardList)); // Сохраняем данные
      modal.remove();
    });

    const close = document.querySelector('.modal-button-cancel');
    close.addEventListener('click', () => modal.remove());
  });
});

//=====================
// class AddCardModal {
//   #template = `
//   <div class="modal" id="addCardModal">
//   <div class="modal-content">
//     <input class="modal-title" id="title" value="{{title}}">   Title</input>
//     <input class="modal-description" id="description" value="{{description}}">   Description</input>
//     <select class="modal-select" id="select">
//     {{options}}
//     </select>
//     <div class="modal-buttons">
//       <button class="modal-button add-card-modal-button-cancel" >Отмена</button>
//       <button class="modal-button add-card-modal-button-confirm" >Подтвердить</button>
//     </div>
//   </div>
// </div>
// `;

//   constructor({title, description, options} = {}) {
//     this.title = title;
//     this.description = description;
//     this.options = options;
//   }
//   render() {
//     const modal = document.createElement('div');

//     modal.innerHTML = this.#template
//       .replace('{{title}}', this.title)
//       .replace('{{description}}', this.description)
//       .replace('{{options}}', this.options);
//     document.body.append(modal);
//   }

//   remove() {
//     const modal = document.getElementById('addCardModal');
//     modal.remove();
//   }
// }

// //const users = getUserList();
// users.then(users => {
//   const modal = new ItcModal({
//     title: 'Заголовок',
//     description: 'Описание модального окна...',
//     options: users.map(user => `<option id="${user.id}">${user.name}</option>`).join(''),
//     footerButtons: [{class: 'btn btn-close', text: 'Закрыть', action: 'close'}],
//   });
//   console.log(modal);
//   const open = document.getElementById('openModal');
//   open.addEventListener('click', () => {
//     modal.render();

//     const confirm = document.querySelector('.modal-button-confirm');
//     confirm.addEventListener('click', () => {
//       const title = document.getElementById('title').value;
//       const description = document.getElementById('description').value;
//       const select = document.getElementById('select');
//       const option = select.options[select.selectedIndex];
//       const user = option.id;

//       const card = {
//         id: Date.now(),
//         title: title,
//         description: description,
//         user: user,
//       };

//       let cardList = JSON.parse(localStorage.getItem('cards'));
//       if (!cardList) {
//         cardList = [];
//       }
//       cardList.push(card);
//       localStorage.setItem('cards', JSON.stringify(cardList)); // Сохраняем данные
//     });

//     const close = document.querySelector('.modal-button-cancel');
//     close.addEventListener('click', () => modal.remove());
//   });
// });
