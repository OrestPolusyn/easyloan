import 'normalize.css';
import { documentReady } from '../src/scripts';
import '../src/modals/index.styl';

import './style/index.scss';
import './style/index.styl';
import './style/index.less';

documentReady(() => {
  const getHeaderHeight = () => {
    const headerHeight = document.querySelector('.header')?.offsetHeight;
    document
      .querySelector(':root')
      .style.setProperty('--header-height', `${headerHeight}px`);
  };

  window.addEventListener('resize', () => {
    getHeaderHeight();
  });

  const headerHide = () => {
    const doc = document.documentElement;
    const w = window;

    let curScroll;
    let prevScroll = w.scrollY || doc.scrollTop;
    let curDirection = 0;
    let prevDirection = 0;

    const header = document.querySelector('.header');
    let toggled;
    const threshold = 200;

    function checkScroll() {
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) {
        curDirection = 2;
      } else {
        curDirection = 1;
      }

      if (curScroll > threshold) {
        header.classList.add('header-scroll');
      } else {
        header.classList.remove('header-scroll');
      }

      if (curDirection !== prevDirection) {
        toggled = toggleHeader();
      }

      prevScroll = curScroll;
      if (toggled) {
        prevDirection = curDirection;
      }
    }

    function toggleHeader() {
      toggled = true;
      if (curDirection === 2 && curScroll > threshold) {
        header.classList.add('hide');
      } else if (curDirection === 1) {
        header.classList.remove('hide');
      } else {
        toggled = false;
      }
      return toggled;
    }

    window.addEventListener('scroll', checkScroll);
  };

  headerHide();
  getHeaderHeight();
});
