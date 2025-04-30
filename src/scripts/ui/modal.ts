const MODAL_OPEN = 'js-modal-open';
const MODAL_DESTROY = 'is-destroy';

export class Modal {
  container: HTMLElement;
  name: string;
  buttons: NodeListOf<HTMLButtonElement>;
  innerAnchors: NodeListOf<HTMLAnchorElement>;
  overlay: HTMLElement;
  content: HTMLElement;
  isOpen: boolean;
  isDestroy: boolean;

  constructor(container: HTMLElement) {
    Modal.instances.push(this); // インスタンスを配列に格納
    this.container = container;
    this.name = container.dataset.modal as string;
    this.buttons = document.querySelectorAll(`[data-modal="${this.name}"][data-modal-module="button"]`) as NodeListOf<HTMLButtonElement>;
    this.innerAnchors = this.container.querySelectorAll('a[href*="#"]') as NodeListOf<HTMLAnchorElement>;
    this.overlay = this.container.querySelector('[data-modal-module="overlay"]') as HTMLElement;
    this.content = this.container.querySelector(':last-child') as HTMLElement;
    this.isOpen = false;
    this.isDestroy = false;

    console.log(this.container);
    this.init();
  }

  static instances = [] as Modal[];

  get open() {
    return this.isOpen;
  }

  get destroy() {
    return this.isDestroy;
  }

  set open(value) {
    this.isOpen = value;
    if (this.destroy) return;
    this.#toggleModal();
  }

  set destroy(value) {
    this.isDestroy = value;
  }

  init() {
    this.#setEventListener();
  }

  // ボタンをクリックしたらモーダルを操作する
  #onClickButton(event: Event) {
    if (this.destroy) return;
    event.preventDefault();
    const button = event.target as HTMLButtonElement;
    const buttonType = button.dataset.modalType as string;

    switch (buttonType) {
      case 'open':
        return (this.open = true);
      case 'close':
        return (this.open = false);
      case 'toggle':
        return (this.open = !this.open);
      default:
        return (this.open = !this.open);
    }
  }

  // モーダルを閉じる
  #closeModal() {
    if (this.destroy) return;
    this.open = false;
  }

  // モーダルを開いている時にエスケープキーを押したらモーダルを閉じる
  #onKeydown(event: KeyboardEvent) {
    if (this.isOpen && (event.key === 'Escape' || event.key === 'Esc')) {
      this.#closeModal();
    }
  }

  // コンテナ内にYouTubeの埋め込みiframeがあれば閉じる時に動画を停止する
  #stopYoutubeVideo() {
    const iframeElements = this.container.querySelectorAll('iframe');
    iframeElements?.forEach((iframe) => {
      const src = iframe.getAttribute('src');
      if (src?.match(/youtube.com/)) {
        const youtube = iframe.contentWindow;
        youtube?.postMessage('{"event": "command", "func": "stopVideo", "args": ""}', '*');
      }
    });
  }

  // イベントリスナーを設定する
  #setEventListener() {
    this.buttons?.forEach((button) => {
      button.addEventListener('click', this.#onClickButton.bind(this));
    });

    this.innerAnchors?.forEach((anchor) => {
      anchor.addEventListener('click', this.#closeModal.bind(this));
    });

    this.overlay.addEventListener('click', this.#closeModal.bind(this));
    document.addEventListener('keydown', this.#onKeydown.bind(this));
  }

  #toggleDestroyClass(action: 'add' | 'remove') {
    this.container.classList[action](MODAL_DESTROY);
    this.buttons?.forEach((button) => {
      button.classList[action](MODAL_DESTROY);
    });
  }

  // モーダルの開閉
  #toggleModal(isOpen = this.isOpen) {
    this.container.setAttribute('aria-modal', `${isOpen}`);
    // this.container.setAttribute('aria-hidden', `${!isOpen}`);
    isOpen ? this.container.removeAttribute('inert') : this.container.setAttribute('inert', '');

    this.buttons?.forEach((button) => {
      const buttonType = button.dataset.modalButton as string;
      const label = isOpen ? 'メニューを閉じる' : 'メニューを開く';
      if (buttonType !== 'toggle') return;

      button.setAttribute('aria-expanded', `${isOpen}`);
      button.setAttribute('aria-label', label);
    });

    // モーダルが開いていたら下層のスクロールを禁止する
    // モーダルの開閉時にイベントを発火する
    if (isOpen) {
      document.body.classList.add(MODAL_OPEN);
      this.container.dispatchEvent(new Event('modal:open'));
    } else {
      document.body.classList.remove(MODAL_OPEN);
      this.#stopYoutubeVideo();
      this.container.dispatchEvent(new Event('modal:close'));
    }
  }

  // モダールを外部から再初期化する
  doInit() {
    this.destroy = false;
    this.#toggleDestroyClass('remove');
  }

  // モーダルを外部から破棄する
  doDestroy() {
    this.destroy = true;
    this.#toggleDestroyClass('add');
    document.body.classList.remove(MODAL_OPEN);
  }

  // モーダルの開閉状態を外部から操作する
  doToggle(value: 'open' | 'close') {
    // 'open'なら開く, 'close'なら閉じる
    value === 'open' ? (this.open = true) : (this.open = false);
  }
}
