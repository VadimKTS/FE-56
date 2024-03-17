class ItcModal {
  #template = `
    <div class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Модальное окно</h2>
        <p class="modal-description">Описание модального окна</p>
        <select class="modal-select">
          <option value="1">Опция 1</option>
          <option value="2">Опция 2</option>
          <option value="3">Опция 3</option>
        </select>
        <div class="modal-buttons">
          <button class="modal-button modal-button-cancel">Отмена</button>
          <button class="modal-button modal-button-confirm">Подтвердить</button>
`;
}

const modal = new ItcModal();
modal.render();
