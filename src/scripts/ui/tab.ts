export class Tab {
  container: HTMLElement;
  tablist: HTMLElement;
  tabs: NodeListOf<HTMLAnchorElement>;
  tabpanels: NodeListOf<HTMLElement>;
  currentIndex: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.tablist = this.container.querySelector('[role="tablist"]') as HTMLElement;
    this.tabs = this.container.querySelectorAll('[role="tab"]') as NodeListOf<HTMLAnchorElement>;
    this.tabpanels = this.container.querySelectorAll('[role="tabpanel"]') as NodeListOf<HTMLElement>;
    this.currentIndex = 0;

    this.init();
  }

  get current() {
    return this.currentIndex;
  }

  set current(value) {
    this.currentIndex = value;
    this.#activateTab(this.currentIndex);
  }

  init() {
    this.#setEventListener();
    this.#setTabAttributes();
    this.#activateTab(this.currentIndex);
  }

  #setEventListener() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (event) => this.#handleClick(event, index), false);
      tab.addEventListener('keyup', (event) => this.#handleKeyNavigation(event, index), false);
    });

    this.tabpanels.forEach((panel) => {
      panel.addEventListener('beforematch', (event) => this.#handleBeforeMatch(event), true);
    });

    window.addEventListener('hashchange', () => this.#handleHashchange(), false);
  }

  #setTabAttributes() {
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-controls', this.tabpanels[index].id);
      tab.setAttribute('tabindex', '-1');
    });
  }

  // アクティブなタブを更新する
  #activateTab(index: number) {
    this.tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    this.tabpanels.forEach((tabpanel, i) => {
      if (i !== index) {
        tabpanel.setAttribute('hidden', 'until-found');
        tabpanel.removeAttribute('tabindex');
      } else {
        tabpanel.removeAttribute('hidden');
        tabpanel.setAttribute('tabindex', '0');
      }
    });
  }

  // クリックイベントを制御する
  #handleClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.#activateTab(index);
  }

  // キーボードナビゲーションを制御する
  #handleKeyNavigation(event: KeyboardEvent, index: number) {
    const orientation = this.tablist.getAttribute('aria-orientation') || 'horizontal';

    const keyActions: Record<string, () => number> = {
      [orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft']: () => (index - 1 >= 0 ? index - 1 : this.tabs.length - 1),
      [orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight']: () => (index + 1) % this.tabs.length,
      Home: () => 0,
      End: () => this.tabs.length - 1,
    };

    const action = keyActions[event.key];

    if (action) {
      event.preventDefault();
      const newIndex = action();
      this.tabs[newIndex].focus();
      this.#activateTab(newIndex);
    }
  }

  #handleHashchange() {
    const hash = window.location.hash;
    const index = [...this.tabs].findIndex((tab) => `#${tab.id}` === hash);

    if (index !== -1) {
      this.#activateTab(index);
    }
  }

  // タブパネルが表示される前にアクティブなタブを更新する
  #handleBeforeMatch(event: Event) {
    const panel = event.currentTarget as HTMLElement;
    const tabIndex = [...this.tabpanels].indexOf(panel);

    if (tabIndex !== -1) {
      this.#activateTab(tabIndex);
    }
  }
}

export const initTab = () => {
  const tabContainers = document.querySelectorAll('[data-tab-container]');
  tabContainers.forEach((container) => {
    new Tab(container as HTMLElement);
  });
};
