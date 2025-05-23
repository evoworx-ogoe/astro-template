const MIDST_ANIME_CLASS = 'is_midst_anime'; // アニメーション中のクラス
const OPEN_CLASS = 'is-open'; // 開いているときのクラス

// アニメーションのオプション
const animeOptions: KeyframeAnimationOptions = {
  duration: 400,
  easing: 'ease',
};

class Accordion {
  details: HTMLDetailsElement;
  animeOption: KeyframeAnimationOptions;
  summary: HTMLElement;
  content: HTMLElement;
  toggleTests: NodeListOf<HTMLElement>;
  isOpen: boolean;
  isSync: boolean;

  constructor(details: HTMLDetailsElement, animeOption = {}, isSync = false) {
    Accordion.instances.push(this); // インスタンスを配列に格納
    this.details = details;
    Object.keys(animeOption).length === 0 ? (this.animeOption = animeOptions) : (this.animeOption = animeOption); // animeOptionが空ならデフォルト値を設定
    this.summary = this.details.querySelector('[data-accordion="summary"]') as HTMLElement;
    this.content = this.details.querySelector('[data-accordion="content"]') as HTMLElement;
    this.toggleTests = this.details.querySelectorAll('[data-accordion="toggle_text"]') as NodeListOf<HTMLElement>;
    this.isOpen = false;
    this.isSync = isSync;

    this.#init();
  }

  #init() {
    this.#onClickSummary();
  }

  static instances = [] as Accordion[];

  // アコーディオンの開閉状態を取得
  get open() {
    return this.isOpen;
  }

  // アコーディオンの開閉状態を設定
  set open(value) {
    this.isOpen = value;
    this.#toggleAccordion();
  }

  // アニメーションのオプション
  get animeOptions() {
    return this.animeOption;
  }

  // アコーディオンを開くときのキーフレーム
  get openingAnimeKeyframes() {
    return [
      {
        height: 0,
      },
      {
        height: `${this.content.offsetHeight}px`,
      },
    ];
  }

  // アコーディオンを閉じるときのキーフレーム
  get closingAnimeKeyframes() {
    return [
      {
        height: `${this.content.offsetHeight}px`,
      },
      {
        height: 0,
      },
    ];
  }

  // サマリーをクリックしたときの処理
  #onClickSummary() {
    this.summary.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.details.classList.contains(MIDST_ANIME_CLASS)) return; // アニメーション中なら中断
      this.open = !this.open;
    });
  }

  // アコーディオンを排他的に開く（デフォルト: false）
  #asyncAccordion() {
    if (!this.isSync) return;
    const accordionName = this.details.dataset.accordionSync;

    Accordion.instances.forEach((instance) => {
      if (instance === this) return; // 自分自身なら中断
      const isSameName = instance.details.dataset.accordionSync === accordionName;
      const isOpend = instance.open;
      const hasOpenAttr = instance.details.open;

      // 同じnameかつ開いているかつopen属性が付与されていたら閉じる
      if (isSameName && isOpend && hasOpenAttr) {
        instance.details.open = false;
        instance.doToggle('close');
      }
    });
  }

  // アコーディオンの開閉処理
  #toggleAccordion() {
    if (this.open) {
      // 開いているとき
      this.#openAccordion();
      this.#asyncAccordion();
      this.details.dispatchEvent(new Event('modal:open'));
    } else {
      // 閉じている時
      this.#closeAccordion();
      this.details.dispatchEvent(new Event('modal:close'));
    }
    this.#setToggleText();
  }

  // アコーディオンを開くアニメーション
  #openAccordionAnime() {
    this.details.classList.add(MIDST_ANIME_CLASS);
    const openAnime = this.content.animate(this.openingAnimeKeyframes, this.animeOptions);
    openAnime.onfinish = () => {
      this.details.classList.remove(MIDST_ANIME_CLASS);
    };
  }

  // アコーディオンを閉じるアニメーション
  #closeAccordionAnime() {
    this.details.classList.add(MIDST_ANIME_CLASS);
    const closeAnime = this.content.animate(this.closingAnimeKeyframes, this.animeOptions);
    closeAnime.onfinish = () => {
      this.details.classList.remove(MIDST_ANIME_CLASS);
      this.details.open = false; // アニメーションが完了したらopen属性をfalseにする
    };
  }

  // this.toggleTestsにテキストを設定
  // 開いているときは閉じる, 閉じているときは開く
  #setToggleText() {
    this.toggleTests?.forEach((toggleTest) => {
      if (this.open) {
        toggleTest.textContent = '閉じる';
      } else {
        toggleTest.textContent = '開く';
      }
    });
  }

  // アコーディオンを開く
  #openAccordion() {
    this.details.open = true;
    this.details.classList.add(OPEN_CLASS);
    this.#openAccordionAnime();
  }

  // アコーディオンを閉じる
  #closeAccordion() {
    this.details.classList.remove(OPEN_CLASS);
    this.#closeAccordionAnime();
  }

  // アコーディオンの開閉状態を外部から操作する
  doToggle(value: 'open' | 'close') {
    // 'open'なら開く, 'close'なら閉じる
    value === 'open' ? (this.open = true) : (this.open = false);
  }
}

export const initAccordion = () => {
  const accordions = document.querySelectorAll('[data-accordion="details"]') as NodeListOf<HTMLDetailsElement>;
  accordions?.forEach((accordion) => {
    new Accordion(accordion);
  });
};
