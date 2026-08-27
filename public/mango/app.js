/* Mango — friends-first social journal */
(() => {
  "use strict";

  const KEY = "mango-clone-v1";
  const LEGACY_KEY = "peach-clone-v2";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const MANGO_MARK = `<span class="mango-mark" role="img" aria-label="Mango">🥭</span>`;

  const ICONS = {
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 5l-8 7 8 7"/></svg>`,
    gear: `<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M4.506,10.69825l-.34376-.38764a2,2,0,0,1-.23567-2.327L4.485,7.01632a2,2,0,0,1,2.133-.95941l.50768.10388A1.962,1.962,0,0,0,8.5,5.93774h0A1.962,1.962,0,0,0,9.3803,4.85906l.16385-.49153A2,2,0,0,1,11.44151,3h1.117a2,2,0,0,1,1.89736,1.36753l.16385.49153A1.962,1.962,0,0,0,15.5,5.93773h0a1.962,1.962,0,0,0,1.37435.22305l.50768-.10388a2,2,0,0,1,2.133.95941l.55848.96732a2,2,0,0,1-.23567,2.327l-.34376.38764A1.962,1.962,0,0,0,19,12h0a1.962,1.962,0,0,0,.49405,1.30175l.34376.38764a2,2,0,0,1,.23567,2.327l-.55849.96733a2,2,0,0,1-2.133.95941l-.50786-.10392a1.96185,1.96185,0,0,0-1.37415.223h0a1.96186,1.96186,0,0,0-.8803,1.07866l-.16387.49161A2,2,0,0,1,12.55847,21H11.44153a2,2,0,0,1-1.89737-1.36756l-.16387-.49161A1.96186,1.96186,0,0,0,8.5,18.06217h0a1.96185,1.96185,0,0,0-1.37415-.223L6.618,17.9431a2,2,0,0,1-2.133-.95941l-.55849-.96733a2,2,0,0,1,.23567-2.327l.34376-.38764A1.962,1.962,0,0,0,5,12H5A1.962,1.962,0,0,0,4.506,10.69825ZM15,12a3,3,0,1,0-6,0,3,3,0,1,0,6,0Z"/></svg>`,
    star: `<svg viewBox="0 0 15 15" fill="currentColor"><path d="M7.5 11.3649C7.5228 11.3649 7.5456 11.3674 7.56799 11.3724C7.61862 11.3837 7.66595 11.4126 7.76062 11.4705L10.8825 13.3773C11.2045 13.5739 11.3654 13.6723 11.4791 13.6542C11.5778 13.6385 11.663 13.5766 11.7084 13.4876C11.7608 13.385 11.717 13.2015 11.6295 12.8346L10.7807 9.27626C10.7549 9.16836 10.7421 9.1144 10.747 9.06276C10.7513 9.01709 10.7657 8.97294 10.789 8.93343C10.8154 8.88877 10.8575 8.85268 10.9417 8.78052L13.7199 6.4007C14.0065 6.15525 14.1497 6.03252 14.1677 5.9188C14.1833 5.82012 14.1507 5.71994 14.0801 5.64925C13.9987 5.56779 13.8107 5.55272 13.4346 5.52257L9.78819 5.23024C9.67762 5.22137 9.62232 5.21694 9.57473 5.19631C9.53263 5.17806 9.49507 5.15078 9.46472 5.11638C9.43039 5.07749 9.40909 5.02628 9.36649 4.92385L7.96165 1.54623C7.81676 1.19787 7.74432 1.02369 7.6417 0.971478C7.59718 0.948827 7.54859 0.937501 7.5 0.9375V11.3649Z"/><path d="M7.49965 0.9375C7.45105 0.937499 7.40246 0.948825 7.35793 0.971478C7.25532 1.02369 7.18287 1.19787 7.03798 1.54623L5.63315 4.92385C5.59055 5.02628 5.56925 5.07749 5.53492 5.11638C5.50456 5.15078 5.467 5.17806 5.42491 5.19631C5.37731 5.21694 5.32202 5.22137 5.21145 5.23023L1.56502 5.52257C1.18893 5.55272 1.00089 5.56779 0.919529 5.64925C0.848927 5.71994 0.816377 5.82012 0.831948 5.9188C0.849892 6.03252 0.99316 6.15525 1.2797 6.4007L4.05789 8.78052C4.14213 8.85268 4.18426 8.88877 4.21064 8.93343C4.23397 8.97294 4.24832 9.01709 4.25266 9.06276C4.25757 9.1144 4.24471 9.16835 4.21897 9.27625L3.37018 12.8346C3.28264 13.2015 3.23887 13.385 3.2912 13.4876C3.33661 13.5766 3.42182 13.6385 3.52049 13.6542C3.63419 13.6723 3.79518 13.5739 4.11716 13.3773L7.23902 11.4705C7.33368 11.4126 7.38102 11.3837 7.43165 11.3724C7.45404 11.3674 7.47685 11.3649 7.49965 11.3649V0.9375Z"/></svg>`,
    starOn: `<svg viewBox="0 0 15 15" fill="#FFCB47"><path d="M7.5 11.3649C7.5228 11.3649 7.5456 11.3674 7.56799 11.3724C7.61862 11.3837 7.66595 11.4126 7.76062 11.4705L10.8825 13.3773C11.2045 13.5739 11.3654 13.6723 11.4791 13.6542C11.5778 13.6385 11.663 13.5766 11.7084 13.4876C11.7608 13.385 11.717 13.2015 11.6295 12.8346L10.7807 9.27626C10.7549 9.16836 10.7421 9.1144 10.747 9.06276C10.7513 9.01709 10.7657 8.97294 10.789 8.93343C10.8154 8.88877 10.8575 8.85268 10.9417 8.78052L13.7199 6.4007C14.0065 6.15525 14.1497 6.03252 14.1677 5.9188C14.1833 5.82012 14.1507 5.71994 14.0801 5.64925C13.9987 5.56779 13.8107 5.55272 13.4346 5.52257L9.78819 5.23024C9.67762 5.22137 9.62232 5.21694 9.57473 5.19631C9.53263 5.17806 9.49507 5.15078 9.46472 5.11638C9.43039 5.07749 9.40909 5.02628 9.36649 4.92385L7.96165 1.54623C7.81676 1.19787 7.74432 1.02369 7.6417 0.971478C7.59718 0.948827 7.54859 0.937501 7.5 0.9375V11.3649Z"/><path d="M7.49965 0.9375C7.45105 0.937499 7.40246 0.948825 7.35793 0.971478C7.25532 1.02369 7.18287 1.19787 7.03798 1.54623L5.63315 4.92385C5.59055 5.02628 5.56925 5.07749 5.53492 5.11638C5.50456 5.15078 5.467 5.17806 5.42491 5.19631C5.37731 5.21694 5.32202 5.22137 5.21145 5.23023L1.56502 5.52257C1.18893 5.55272 1.00089 5.56779 0.919529 5.64925C0.848927 5.71994 0.816377 5.82012 0.831948 5.9188C0.849892 6.03252 0.99316 6.15525 1.2797 6.4007L4.05789 8.78052C4.14213 8.85268 4.18426 8.88877 4.21064 8.93343C4.23397 8.97294 4.24832 9.01709 4.25266 9.06276C4.25757 9.1144 4.24471 9.16835 4.21897 9.27625L3.37018 12.8346C3.28264 13.2015 3.23887 13.385 3.2912 13.4876C3.33661 13.5766 3.42182 13.6385 3.52049 13.6542C3.63419 13.6723 3.79518 13.5739 4.11716 13.3773L7.23902 11.4705C7.33368 11.4126 7.38102 11.3837 7.43165 11.3724C7.45404 11.3674 7.47685 11.3649 7.49965 11.3649V0.9375Z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM11.25 10.5C10.8358 10.5 10.5 10.8358 10.5 11.25C10.5 11.6642 10.8358 12 11.25 12V16.5C11.25 16.9142 11.5858 17.25 12 17.25H12.75C13.1642 17.25 13.5 16.9142 13.5 16.5C13.5 16.0858 13.1642 15.75 12.75 15.75V11.25C12.75 10.8358 12.4142 10.5 12 10.5H11.25ZM12 6.75C11.4477 6.75 11 7.19772 11 7.75C11 8.30228 11.4477 8.75 12 8.75C12.5523 8.75 13 8.30228 13 7.75C13 7.19772 12.5523 6.75 12 6.75Z"/></svg>`,
    smileCheck: `<svg viewBox="0 0 24 24"><circle cx="11" cy="12" r="8" fill="#FFD60A" stroke="#1C1C1E" stroke-width="1.2"/><circle cx="8.2" cy="10.4" r="1"/><circle cx="13.6" cy="10.4" r="1"/><path d="M8.2 14c.9 1.3 2.3 2 3.8 2s2.9-.7 3.8-2" fill="none" stroke="#1C1C1E" stroke-width="1.2" stroke-linecap="round"/><circle cx="17.4" cy="17.2" r="4.1" fill="#fff" stroke="#1C1C1E" stroke-width="1"/><path d="M15.6 17.3l1.3 1.3 2.4-2.5" fill="none" stroke="#1C1C1E" stroke-width="1.3" stroke-linecap="round"/></svg>`,
    heartBox: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 16.2l-3.2-2.9a2 2 0 112.7-2.9l.5.5.5-.5a2 2 0 112.7 2.9z" stroke-linejoin="round"/></svg>`,
    cam: `<svg viewBox="0 0 28 24"><path d="M3.5 7.5h4l1.6-2.2h9.8l1.6 2.2H24.5v12H3.5z" fill="none" stroke="#1C1C1E" stroke-width="1.7" stroke-linejoin="round"/><circle cx="14" cy="13.4" r="3.6" fill="none" stroke="#1C1C1E" stroke-width="1.6"/><circle cx="14" cy="13.4" r="1.8" fill="#FFD60A"/></svg>`,
    bulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 3.5 10.7c-.9.7-1.5 1.6-1.5 2.6h-4c0-1-.6-1.9-1.5-2.6A6 6 0 0 1 12 3z"/></svg>`,
    wand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 20L14 10"/><path d="M15 5.2l.4 1.6 1.6.4-1.6.4L15 9.2l-.4-1.6-1.6-.4 1.6-.4z"/><path d="M19.2 11.2l.3 1.1 1.1.3-1.1.3-.3 1.1-.3-1.1-1.1-.3 1.1-.3z"/></svg>`,
    house: `<svg viewBox="0 0 24 24" fill="none"><path d="M9.5 20.5V16C9.5 14.619 10.619 13.5 12 13.5C13.381 13.5 14.5 14.619 14.5 16V20.5H20V11.914C20 11.384 19.789 10.875 19.414 10.5L12.707 3.79301C12.316 3.40201 11.683 3.40201 11.293 3.79301L4.586 10.5C4.211 10.875 4 11.384 4 11.914V20.5H9.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    houseOff: `<svg viewBox="0 0 24 24" fill="none"><path d="M9.5 20.5V16C9.5 14.619 10.619 13.5 12 13.5C13.381 13.5 14.5 14.619 14.5 16V20.5H20V11.914C20 11.384 19.789 10.875 19.414 10.5L12.707 3.79301C12.316 3.40201 11.683 3.40201 11.293 3.79301L4.586 10.5C4.211 10.875 4 11.384 4 11.914V20.5H9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    smile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.2"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M8.6 14.2c.9 1.4 2.3 2.2 3.4 2.2s2.5-.8 3.4-2.2" stroke-linecap="round"/></svg>`,
    chats: `<svg viewBox="0 0 24 24" fill="none"><path d="M7.7168 3.52343C9.7064 3.36337 11.8446 4.12242 13.3584 5.4082C15.0442 6.84969 16.0893 8.90148 16.2656 11.1123C16.4527 13.3724 15.7261 15.6136 14.248 17.334C12.7871 19.051 10.8435 19.9469 8.61914 20.125C6.4676 20.1996 4.49902 19.5586 2.86914 18.1289C1.17562 16.6625 0.147452 14.5732 0.0175773 12.3369C-0.12217 10.1204 0.617634 7.9378 2.07617 6.26269C3.50865 4.63932 5.52996 3.65351 7.69141 3.52538L7.7168 3.52343ZM17.0537 4.66503C19.6845 4.64758 22.0043 6.16331 23.1992 8.47656C24.0678 10.1707 24.2371 12.1387 23.6699 13.956C23.0706 15.8235 21.8393 17.3713 20.083 18.2715C18.5177 19.0767 16.6949 19.2201 15.0225 18.6709C14.8208 18.5976 14.6496 18.5303 14.4844 18.458C14.6465 18.2945 14.807 18.1249 14.96 17.9453C15.5252 17.2874 15.9886 16.5594 16.3486 15.7871C16.5058 15.8216 16.6683 15.8479 16.8555 15.8584C17.7041 15.9053 18.537 15.6157 19.1738 15.0527C19.6815 14.596 20.0407 13.9793 20.0771 13.2881C19.6709 13.2735 19.2072 13.2834 18.7979 13.2832H17.1152C17.229 12.565 17.2624 11.8305 17.2061 11.0937L17.2012 11.0342C17.0242 8.82543 16.0653 6.76187 14.5127 5.20312C15.1874 4.9038 15.7864 4.75094 16.6416 4.67871C16.7648 4.6629 16.9284 4.66589 17.0537 4.66503ZM11.8477 13.4053C9.72651 13.3697 7.59139 13.4239 5.46875 13.4023C5.14232 13.399 4.8017 13.3957 4.47559 13.4043C4.49044 14.1328 4.89717 14.8632 5.41699 15.3584C6.87961 16.7511 9.34398 16.7855 10.8359 15.4238C11.4025 14.8787 11.8187 14.2157 11.8477 13.4053ZM19.0596 9.14355C18.4822 9.22852 18.0825 9.76538 18.167 10.3428C18.2515 10.9201 18.7878 11.3201 19.3652 11.2363C19.9436 11.1522 20.3444 10.6143 20.2598 10.0361C20.1748 9.45838 19.6374 9.05863 19.0596 9.14355ZM5.55762 8.72265C4.86948 8.72379 4.31207 9.28274 4.31348 9.9707C4.31515 10.6589 4.87517 11.2151 5.56348 11.2129C6.25086 11.2105 6.80636 10.6521 6.80469 9.96484C6.80284 9.27774 6.2448 8.72183 5.55762 8.72265ZM10.7158 8.72753C10.0318 8.76392 9.50617 9.34825 9.54199 10.0322C9.57811 10.7163 10.1624 11.2418 10.8467 11.206C11.5311 11.17 12.0576 10.5857 12.0215 9.90136C11.9853 9.21717 11.4002 8.69151 10.7158 8.72753Z" fill="currentColor"/></svg>`,
    chatsOff: `<svg viewBox="0 0 24 24" fill="none"><path d="M13.642 5.61603C15.3682 4.69945 17.1541 4.44963 19.0447 5.02947C20.8234 5.58129 22.3083 6.82077 23.1696 8.47258C24.0645 10.1923 24.244 12.1959 23.6692 14.0474C23.1204 15.8679 21.8665 17.3932 20.1869 18.2835C18.5916 19.1131 16.7346 19.2833 15.0151 18.7575C14.6198 18.6341 13.9123 18.3489 13.5724 18.1114C13.8055 17.925 14.196 17.509 14.394 17.279C14.7254 17.4778 15.389 17.7031 15.7685 17.7879C17.2327 18.1184 18.7684 17.8483 20.0322 17.0381C21.3995 16.1668 22.3658 14.7887 22.719 13.206C23.0776 11.6131 22.7831 9.94284 21.9009 8.56893C21.0805 7.298 19.7348 6.33304 18.2503 6.01698C17.1895 5.78759 16.0861 5.85541 15.0614 6.21294C14.9246 6.26034 14.576 6.39104 14.4615 6.46515C14.2215 6.17124 13.9216 5.8718 13.642 5.61603Z" fill="#ABAAAA"/><path d="M15.539 15.5545C15.9174 14.729 16.0984 14.1804 16.2672 13.2854C16.3535 13.3074 17.063 13.2972 17.1983 13.2972L19.0986 13.2968C19.4241 13.2967 19.792 13.2873 20.1129 13.2988C20.1037 13.9488 19.8471 14.4393 19.3859 14.8914C18.7313 15.5214 17.8538 15.8664 16.9454 15.8511C16.4417 15.8441 16.0028 15.7427 15.539 15.5545Z" fill="#ABAAAA"/><path d="M19.0066 9.27231C19.5951 9.19307 20.1364 9.60616 20.2155 10.1949C20.2947 10.7837 19.8815 11.3251 19.293 11.4041C18.7045 11.483 18.1635 11.07 18.0845 10.4814C18.0054 9.89282 18.4182 9.35154 19.0066 9.27231Z" fill="#ABAAAA"/><path d="M7.52441 3.56076C9.86936 3.36613 11.8658 4.11145 13.6416 5.61643C13.9212 5.8722 14.2219 6.17115 14.4619 6.46506C15.9724 8.31402 16.5784 10.4087 16.3369 12.7795C16.3196 12.949 16.3 13.1178 16.2676 13.2854C16.0987 14.1804 15.9175 14.7294 15.5391 15.5549C15.18 16.2441 14.8885 16.6757 14.3936 17.2785C14.2451 17.4509 13.9889 17.7284 13.7715 17.9348L13.5723 18.1115C12.417 19.2069 10.5786 19.9477 9.00098 20.0891C6.82603 20.2794 4.66453 19.5984 2.99121 18.1955C1.29754 16.7736 0.226985 14.8182 0.0371102 12.6067C-0.174948 10.3752 0.520974 8.15221 1.9668 6.43967C3.36993 4.78772 5.36595 3.75389 7.52441 3.56076ZM8.04004 4.87131C4.19859 4.9632 1.15842 8.15183 1.24805 11.9944C1.33786 15.8371 4.52358 18.8799 8.36524 18.7922C12.2096 18.7042 15.2539 15.5147 15.1641 11.6692C15.074 7.82376 11.8842 4.77958 8.04004 4.87131Z" fill="#5A5A5A"/><path d="M4.48352 13.4844L11.9218 13.483C11.9226 13.523 11.922 13.5631 11.9199 13.603C11.8808 14.4082 11.486 14.9512 10.9148 15.4708C10.1182 16.1168 9.30637 16.4186 8.27638 16.4497C6.60248 16.5005 4.51202 15.3444 4.48352 13.4844Z" fill="#5A5A5A"/><path d="M5.51994 8.77672C6.21629 8.72373 6.82424 9.24427 6.87933 9.94066C6.9344 10.637 6.41584 11.2467 5.71983 11.3039C5.02082 11.3614 4.40812 10.84 4.3528 10.1406C4.29749 9.44124 4.82061 8.82994 5.51994 8.77672Z" fill="#5A5A5A"/><path d="M10.7027 8.77943C11.3968 8.73191 11.9987 9.25452 12.0493 9.94857C12.0999 10.6426 11.5801 11.247 10.8865 11.3007C10.1885 11.3547 9.57966 10.8308 9.52875 10.1324C9.47785 9.43397 10.0043 8.82726 10.7027 8.77943Z" fill="#5A5A5A"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15.696 4C18.871 4 21 6.98 21 9.755C21 15.388 12.161 20 12 20C11.839 20 3 15.388 3 9.755C3 6.98 5.129 4 8.304 4C10.119 4 11.311 4.905 12 5.711C12.689 4.905 13.881 4 15.696 4Z"/></svg>`,
    heartOn: `<svg viewBox="0 0 24 24" fill="#FF3B30" stroke="#FF3B30" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15.696 4C18.871 4 21 6.98 21 9.755C21 15.388 12.161 20 12 20C11.839 20 3 15.388 3 9.755C3 6.98 5.129 4 8.304 4C10.119 4 11.311 4.905 12 5.711C12.689 4.905 13.881 4 15.696 4Z"/></svg>`,
    bubble: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5882" stroke-linecap="round" stroke-linejoin="round"><path d="M4.541 17.003C3.577 15.571 3 13.857 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C10.474 21 9.04 20.613 7.78 19.943C6.434 20.661 4.907 21.084 3.276 21.084C2.842 21.084 2.419 21.045 2 20.99C3.173 19.923 4.055 18.553 4.541 17.003Z"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.082 8.95158C6.196 9.503 2.50256 13.6346 2.5 18.5516V19.1636C4.62349 16.6055 7.75786 15.1019 11.082 15.0466V18.2736C11.082 18.9482 11.6291 19.4953 12.304 19.4953C12.5786 19.4953 12.8452 19.4028 13.0608 19.2328L21.0508 12.9238C21.5622 12.5207 21.65 11.7794 21.247 11.268C21.1895 11.1951 21.1237 11.1292 21.0508 11.0718L13.0608 4.76276C12.531 4.34468 11.7626 4.43525 11.3445 4.96505C11.1744 5.18061 11.0818 5.44717 11.0818 5.72176L11.082 8.95158Z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5882" stroke-linecap="round" stroke-linejoin="round"><path d="M4.541 17.003C3.577 15.571 3 13.857 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21C10.474 21 9.04 20.613 7.78 19.943C6.434 20.661 4.907 21.084 3.276 21.084C2.842 21.084 2.419 21.045 2 20.99C3.173 19.923 4.055 18.553 4.541 17.003Z"/></svg>`,
    more: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 11.997C6.5 11.722 6.275 11.497 6 11.5C5.725 11.5 5.5 11.725 5.5 12C5.5 12.275 5.725 12.5 6 12.5C6.275 12.5 6.5 12.275 6.5 11.997Z"/><path d="M12.5 11.997C12.5 11.722 12.275 11.497 12 11.5C11.725 11.5 11.5 11.725 11.5 12C11.5 12.275 11.725 12.5 12 12.5C12.275 12.5 12.5 12.275 12.5 11.997Z"/><path d="M18.5 11.997C18.5 11.722 18.275 11.497 18 11.5C17.725 11.5 17.5 11.725 17.5 12C17.5 12.275 17.725 12.5 18 12.5C18.275 12.5 18.5 12.275 18.5 11.997Z"/></svg>`,
    sticker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h9l5 5v11H6z"/><path d="M15 4v5h5"/><circle cx="10" cy="13" r=".8" fill="currentColor"/><circle cx="14.5" cy="13" r=".8" fill="currentColor"/><path d="M10 16.2c.8 1 1.8 1.4 2.4 1.4s1.6-.4 2.4-1.4" stroke-linecap="round"/></svg>`,
    reply: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7H13v5"/><path d="M4 7l3-3M4 7l3 3"/></svg>`
  };

  const MAGIC = [
    { word: "shout", desc: "Write big words" },
    { word: "draw", desc: "Draw something" },
    { word: "gif", desc: "Search for a GIF" },
    { word: "song", desc: "What's playing" },
    { word: "rate", desc: "Rate 1-5 stars" },
    { word: "battery", desc: "Current charge %" },
    { word: "weather", desc: "Add current weather" },
    { word: "here", desc: "Add current location" },
    { word: "mood", desc: "How are you feeling" },
    { word: "goodmorning", desc: "A sunrise" },
    { word: "goodnight", desc: "Lights out" },
    { word: "time", desc: "The time" },
    { word: "date", desc: "The date" },
    { word: "dice", desc: "Roll the dice" },
    { word: "movie", desc: "Add a movie" },
    { word: "tv", desc: "Add TV show" },
    { word: "game", desc: "Add a game" },
    { word: "move", desc: "Add steps today" },
    { word: "meetings", desc: "Meetings left" },
    { word: "throwback", desc: "A photo from then" },
    { word: "noise", desc: "How loud is it" },
    { word: "caption", desc: "Caption a GIF" },
    { word: "image", desc: "Search photos" },
    { word: "play", desc: "Mangoball" }
  ];
  const CHEAT = [
    ["gif", "Search for a GIF"], ["weather", "Add current weather"],
    ["tv", "Add TV show"], ["here", "Add current location"],
    ["shout", "Write big words"], ["rate", "Rate 1-5 stars"],
    ["draw", "Draw something"], ["dice", "Roll the dice"],
    ["battery", "Current charge %"], ["move", "Add steps today"]
  ];
  const PROMPTS = [
    "A book I wish I'd written is…",
    "I wish I was really good at ___.",
    "What's the weirdest thing you've ever eaten?",
    "Right now I wish I was…",
    "If I had a theme song it would be…",
    "The last time I was brave, I…",
    "Describe your day as a weather report:",
    "A tiny thing that ruined me today:"
  ];
  const SHOUT_COLORS = [
    { bg: "#FF2D78", fg: "#fff" }, { bg: "#FF5A1F", fg: "#fff" },
    { bg: "#C8FF2E", fg: "#111" }, { bg: "#111111", fg: "#fff" },
    { bg: "#FFFFFF", fg: "#111" }, { bg: "#7A3CFF", fg: "#fff" },
    { bg: "#FF9F0A", fg: "#111" }, { bg: "#FF375F", fg: "#fff" }
  ];
  const GIFS = [
    { q: "cat typing keyboard work", label: "at work", url: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" },
    { q: "dance party vibe", label: "dance", url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" },
    { q: "mind blown wow", label: "wow", url: "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif" },
    { q: "coffee sip morning", label: "coffee", url: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" },
    { q: "shrug idk whatever", label: "shrug", url: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif" },
    { q: "yes nodding excited", label: "yes", url: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" },
    { q: "no nope michael", label: "nope", url: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif" },
    { q: "heart love kiss", label: "heart", url: "https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif" },
    { q: "sleepy tired nap", label: "sleepy", url: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif" },
    { q: "clap applause yes", label: "clap", url: "https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif" },
    { q: "wave hello hi", label: "wave", url: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif" },
    { q: "bye leave disappear", label: "bye", url: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" }
  ];
  const PHOTOS = [
    { q: "pizza brooklyn", label: "pizza", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
    { q: "cat window", label: "cat", url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80" },
    { q: "city night", label: "city", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" },
    { q: "beach summer", label: "beach", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
    { q: "forest trees", label: "forest", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" },
    { q: "flowers pink", label: "flowers", url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80" },
    { q: "coffee shop", label: "coffee", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" },
    { q: "subway train", label: "train", url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" }
  ];
  const SONGS = [
    { title: "Midnight City", artist: "M83", color: "radial-gradient(circle at 30% 30%, #7aa7ff, #2a2158)" },
    { title: "Redbone", artist: "Childish Gambino", color: "radial-gradient(circle at 30% 30%, #e07a5a, #4a1520)" },
    { title: "Get Lucky", artist: "Daft Punk", color: "radial-gradient(circle at 30% 30%, #f4d35e, #c36f09)" },
    { title: "New York I Love You", artist: "LCD Soundsystem", color: "radial-gradient(circle at 30% 30%, #f4a07f, #5c2a4a)" }
  ];
  const MOVIES = [
    { title: "Moonlight", color: "#2d4a6f" }, { title: "La La Land", color: "#d46a8a" },
    { title: "Mad Max: Fury Road", color: "#c45c2c" }, { title: "Zootopia", color: "#3aa0c8" }
  ];
  const SHOWS = [
    { title: "Atlanta", color: "#5a3d2b" }, { title: "Stranger Things", color: "#c0392b" },
    { title: "Broad City", color: "#e07a5a" }, { title: "The Good Place", color: "#3d9b8f" }
  ];
  const GAMES = [
    { title: "Stardew Valley", color: "#6a9b4e" }, { title: "Overwatch", color: "#f99e1a" },
    { title: "Pokemon GO", color: "#4a90d9" }, { title: "The Witness", color: "#5ec8e0" }
  ];
  const MOODS = [
    { id: "good", emoji: "😊", label: "good" }, { id: "meh", emoji: "😐", label: "meh" },
    { id: "tired", emoji: "😴", label: "tired" }, { id: "electric", emoji: "⚡", label: "electric" },
    { id: "soft", emoji: "🌸", label: "soft" }, { id: "feral", emoji: "🐺", label: "feral" }
  ];
  const PLACES = [
    { name: "Cool Pizza", sub: "33 N 2nd Street Brooklyn" },
    { name: "Cafe Grumpy", sub: "Greenpoint" },
    { name: "Prospect Park", sub: "the meadow, probably" },
    { name: "the L train", sub: "between stops, spiritually" }
  ];
  const ACTIONS = [
    { id: "wave", emoji: "👋", label: "Wave", verb: "waved at", past: "waved" },
    { id: "cake", emoji: "🍰", label: "Cake", verb: "caked", past: "caked" },
    { id: "100", emoji: "💯", label: "100", verb: "100'd", past: "100'd" },
    { id: "boop", emoji: "👉👃", label: "Boop", verb: "booped", past: "booped" },
    { id: "quarantine", emoji: "😷", label: "Quarantine", verb: "quarantined", past: "quarantined" },
    { id: "kiss", emoji: "😘", label: "Kiss", verb: "blew a kiss at", past: "kissed" },
    { id: "ring", emoji: "💍", label: "Ring", verb: "put a ring on", past: "put a ring on" },
    { id: "hiss", emoji: "😾", label: "Hiss", verb: "hissed at", past: "hissed" }
  ];
  const AVATAR_COLORS = ["#E8896A", "#7BA3C9", "#8BB89A", "#C9A06B", "#9B8EC4", "#E07A9A"];
  const PIC = n => "/assets/placeholders/profile-pics/pic-" + n + ".png";
  const PEOPLE = {
    mira: { name: "Mira ✨", handle: "mira", color: "#E8A0B0", bio: "bodegas, pigeons, unhinged optimism", photo: PIC(1) },
    theo: { name: "Theo", handle: "theo", color: "#7BA3C9", bio: "aux cord diplomat. will DJ your crisis.", photo: PIC(2) },
    sage: { name: "Sage 🌙", handle: "sage", color: "#8BB89A", bio: "soup and 47 unread messages", photo: PIC(3) },
    nico: { name: "Nico", handle: "nico", color: "#C9A06B", bio: "doodles and questionable dice", photo: PIC(4) },
    priya: { name: "Priya", handle: "priya", color: "#D4846A", bio: "walks on purpose. iced oat everything.", photo: PIC(5) },
    jun: { name: "Jun", handle: "jun", color: "#9B8EC4", bio: "playlists named after feelings", photo: PIC(6) },
    lina: { name: "Lina 🐦", handle: "lina", color: "#E8B86D", bio: "will send you a bird fact, unprompted", photo: PIC(7) }
  };
  const NICO_DOODLE = `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" aria-label="a doodle">
    <rect width="300" height="180" fill="#fff"/>
    <path d="M70 110c20-50 80-70 120-28 18 20 8 50-18 58-40 12-90 4-102-30" fill="none" stroke="#1C1C1E" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="128" cy="88" r="2.4" fill="#1C1C1E"/><circle cx="168" cy="86" r="2.4" fill="#1C1C1E"/>
    <path d="M132 108c12 8 28 8 40-2" fill="none" stroke="#1C1C1E" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M86 92c-10-18-6-32 8-28" fill="none" stroke="#1C1C1E" stroke-width="1.4" stroke-linecap="round"/>
    <text x="188" y="142" font-family="-apple-system, Helvetica Neue, sans-serif" font-size="16" font-weight="600" fill="#1C1C1E">ok.</text>
  </svg>`;

  function ago(h, extraMin) { return Date.now() - h * 3600000 - (extraMin || 0) * 60000; }
  function uid(p) { return (p || "p") + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function seedPosts() {
    return {
      you: [
        { id: "you-gm", type: "goodmorning", ts: ago(3, 20), data: { label: "good morning" } }
      ],
      mira: [
        { id: "mira-1", type: "shout", ts: ago(2), data: { frames: [
          { text: "BRB living", bg: "#FF2D78", fg: "#fff", size: 46, italic: true },
          { text: "don't wait up", bg: "#C8FF2E", fg: "#111", size: 42, italic: true },
          { text: "ok wait up", bg: "#7A3CFF", fg: "#fff", size: 44, italic: true }
        ]}},
        { id: "mira-2", type: "photobooth", ts: ago(5), data: { frames: [
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"
        ]}, caption: "4 frames of me becoming a bodega cat" },
        { id: "mira-3", type: "caption", ts: ago(8), data: { url: GIFS[0].url, text: "when leftovers have taken over the fridge" } },
        { id: "mira-4", type: "rate", ts: ago(13, 10), data: { thing: "bodega sandwich that fought back", stars: 3 } }
      ],
      theo: [
        { id: "theo-1", type: "play", ts: ago(0.6), data: { score: 4, throws: 5 } },
        { id: "theo-2", type: "song", ts: ago(3), data: SONGS[1] },
        { id: "theo-3", type: "battery", ts: ago(7), data: { pct: 12 }, caption: "this is a cry for help" }
      ],
      sage: [
        { id: "sage-1", type: "throwback", ts: ago(6), data: {
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
          stamp: "JUL 12, 2014  4:03 PM"
        }, caption: "when we thought the woods were a personality" },
        { id: "sage-2", type: "noise", ts: ago(11), data: { db: 47 } },
        { id: "sage-3", type: "goodnight", ts: ago(14), data: { label: "good night" } }
      ],
      nico: [
        { id: "nico-1", type: "dice", ts: ago(1.1), data: { a: 3, b: 5 }, caption: "the dice said go to bed and i said make me" },
        { id: "nico-2", type: "draw", ts: ago(4), data: { svg: NICO_DOODLE }, caption: "self portrait, emotionally" },
        { id: "nico-3", type: "game", ts: ago(9), data: GAMES[0], caption: "the villagers know too much" }
      ],
      priya: [
        { id: "priya-1", type: "here", ts: ago(1.4), data: PLACES[1] },
        { id: "priya-2", type: "rate", ts: ago(1.6), data: { thing: "iced oat latte", stars: 5 }, caption: "this latte just believed in me" },
        { id: "priya-3", type: "move", ts: ago(7), data: { steps: 11204 }, caption: "walked to the other bodega on purpose" }
      ],
      jun: [
        { id: "jun-1", type: "shout", ts: ago(5), data: { frames: [{ text: "ok but consider: nap", bg: "#7A3CFF", fg: "#fff", size: 40, italic: true }] } },
        { id: "jun-2", type: "song", ts: ago(13), data: SONGS[0] }
      ],
      lina: [
        { id: "lina-1", type: "weather", ts: ago(2.2), data: { temp: 72, sky: "partly cloudy", place: "Brooklyn" } },
        { id: "lina-2", type: "text", ts: ago(15), data: { text: "bird fact: pigeons can recognize themselves in mirrors. so can i. barely." } }
      ]
    };
  }

  function defaultState() {
    return {
      user: null,
      squad: ["mira", "theo", "sage", "nico", "priya"],
      favorites: ["mira"],
      posts: seedPosts(),
      hearts: { "mira-1": ["theo", "you"], "theo-1": ["you"], "priya-2": ["you"], "you-gm": ["mira"] },
      comments: {
        "mira-1": [{ id: "c1", by: "theo", text: "go off", ts: ago(1.8) }],
        "you-gm": [{ id: "c2", by: "sage", text: "rise and grind but make it soup", ts: ago(2.5) }]
      },
      activities: [
        { id: "a1", type: "action", from: "nico", action: "cake", ts: ago(6) },
        { id: "a2", type: "heart", from: "mira", postId: "you-gm", ts: ago(2.2) },
        { id: "a3", type: "comment", from: "sage", postId: "you-gm", text: "rise and grind but make it soup", ts: ago(2.5) },
        { id: "a4", type: "mention", from: "theo", text: "evan get here, midnight city is on", ts: ago(4) },
        { id: "a5", type: "action", from: "priya", action: "wave", ts: ago(8) }
      ],
      gestures: {
        mira: [{ from: "theo", action: "ring", ts: ago(2.4) }],
        sage: [{ from: "nico", action: "quarantine", ts: ago(5) }],
        you: [{ from: "nico", action: "cake", ts: ago(6) }]
      },
      chats: {
        mira: [
          { id: "m1", from: "mira", type: "gif", ts: ago(9), data: { url: GIFS[0].url, label: "at work" } },
          { id: "m2", from: "you", type: "text", ts: ago(8.8), data: { text: "this is so you" } }
        ],
        theo: [
          { id: "t1", from: "theo", type: "text", ts: ago(5), data: { text: "did you hear midnight city at that bar" } },
          { id: "t2", from: "you", type: "text", ts: ago(4.9), data: { text: "i was THERE" } }
        ]
      },
      unread: { mira: true, theo: true, nico: true },
      online: ["mira", "theo"],
      settings: { wallpaper: "cream", autoAccept: true, replaceDots: false, bio: "just juicy" },
      promptIndex: 0
    };
  }

  let state = defaultState();
  let view = { screen: "splash", person: "you", commenting: null, chatId: null, replyAct: null };
  let overlayEsc = null;
  let composeTo = { kind: "space" };
  let timers = [];
  let lastTap = { id: null, t: 0 };

  function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }
  function every(fn, ms) { const id = setInterval(fn, ms); timers.push(id); return id; }
  function clearTimers() {
    timers.forEach(id => { clearTimeout(id); clearInterval(id); });
    timers = [];
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const seeded = seedPosts();
      state = Object.assign(defaultState(), saved);
      state.posts = Object.assign({}, seeded, saved.posts || {});
      if (saved.posts && saved.posts.you) state.posts.you = saved.posts.you;
    } catch (err) { state = defaultState(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (err) {}
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function rel(ts, withAgo) {
    const d = Date.now() - ts;
    let t;
    if (d < 45000) t = "now";
    else if (d < 3600000) t = Math.max(1, Math.floor(d / 60000)) + "m";
    else if (d < 86400000) t = Math.floor(d / 3600000) + "h";
    else t = Math.floor(d / 86400000) + "d";
    return withAgo && t !== "now" ? t + " ago" : t;
  }
  function handleFrom(name) {
    const h = (name || "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 16);
    return h || "mango";
  }
  function person(id) {
    if (id === "you" && state.user) {
      return { name: state.user.name, handle: state.user.handle, color: state.user.color, bio: state.settings.bio || "", photo: state.user.photo || PIC(8) };
    }
    return PEOPLE[id] || { name: id, handle: id, color: "#E8896A", bio: "" };
  }
  function avatar(id, size) {
    const p = person(id);
    const on = state.online.indexOf(id) >= 0;
    const pip = on && size !== "sm" ? `<i class="online-pip"></i>` : "";
    if (p.photo) {
      return `<div class="avatar ${size || ""}"><img src="${esc(p.photo)}" alt="" />${pip}</div>`;
    }
    const initial = (p.name || "?").trim().charAt(0).toUpperCase();
    return `<div class="avatar ${size || ""}" style="background:${p.color}">${esc(initial)}${pip}</div>`;
  }
  function latest(id) {
    const list = (state.posts[id] || []).slice().sort((a, b) => b.ts - a.ts);
    return list[0] || null;
  }
  function heartCount(id) {
    const h = state.hearts[id];
    if (!h) return 0;
    return Array.isArray(h) ? h.length : (h ? 1 : 0);
  }
  function hasHeart(id) {
    const h = state.hearts[id];
    if (!h) return false;
    return Array.isArray(h) ? h.indexOf("you") >= 0 : !!h;
  }
  function toggleHeart(id) {
    let h = state.hearts[id];
    if (!h) h = [];
    if (!Array.isArray(h)) h = h ? ["you"] : [];
    const i = h.indexOf("you");
    if (i >= 0) h.splice(i, 1); else h.push("you");
    state.hearts[id] = h;
  }
  function glyph(post) {
    const map = {
      text: "✏️", shout: "📣", song: "♫", rate: "⭐", battery: "🔋", weather: "⛅",
      here: "📍", mood: "💫", goodmorning: "☀️", goodnight: "🌙", time: "🕐", date: "📅",
      dice: "🎲", movie: "🎥", tv: "📺", game: "🎮", move: "👣", meetings: "📆",
      gif: "🎞️", draw: "✏️", photo: "📷", prompt: "💡", throwback: "📷", noise: "🔊",
      caption: "🎞️", image: "📷", play: "🏀", photobooth: "📷", loop: "📷", video: "🎥"
    };
    return map[post.type] || "✏️";
  }
  function previewText(post) {
    if (!post) return "quiet, for now";
    const d = post.data || {};
    let line = "";
    if (post.type === "text") line = d.text;
    else if (post.type === "shout") line = (d.frames && d.frames[0] && d.frames[0].text) || d.text || "shout";
    else if (post.type === "song") line = "♫ " + d.title;
    else if (post.type === "rate") line = d.thing;
    else if (post.type === "mood") line = d.label;
    else if (post.type === "battery") line = "🔋 " + d.pct + "%";
    else if (post.type === "gif" || post.type === "caption") line = "Gif";
    else if (post.type === "here") line = d.name;
    else if (post.type === "weather") line = "⛅ " + d.temp + "º " + d.sky;
    else if (post.type === "movie") line = "🎥 " + d.title;
    else if (post.type === "tv" || post.type === "game") line = d.title;
    else if (post.type === "move") line = "👣 " + Number(d.steps).toLocaleString() + " steps today";
    else if (post.type === "meetings") line = d.n + " meetings left";
    else if (post.type === "dice") line = "🎲 " + (d.a || d.n) + (d.b ? " 🎲 " + d.b : "");
    else if (post.type === "prompt") line = d.a;
    else if (post.type === "goodmorning") line = "Good morning";
    else if (post.type === "goodnight") line = "Good night";
    else if (post.type === "draw") line = "Drawing";
    else if (post.type === "photo" || post.type === "image" || post.type === "loop") line = "Image";
    else if (post.type === "photobooth") line = "Photobooth";
    else if (post.type === "throwback") line = "Throwback";
    else if (post.type === "noise") line = d.db + " dB";
    else if (post.type === "play") line = "Mangoball " + d.score;
    else if (post.type === "video") line = "Video";
    else if (post.type === "time") line = "the time";
    else if (post.type === "date") line = "the date";
    else line = post.caption || post.type;
    return line || post.type;
  }
  function dieHTML(n) {
    return `<div class="die n${n}" aria-label="${n}">${[1,2,3,4,5,6,7,8,9].map(i => `<i class="p${i}"></i>`).join("")}</div>`;
  }
  const appEl = () => $("#app");
  function setThemeColor(c) {
    let m = document.querySelector('meta[name="theme-color"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "theme-color");
      document.head.appendChild(m);
    }
    m.setAttribute("content", c);
  }
  function go(screen, extra) {
    view = Object.assign({}, view, { screen: screen }, extra || {});
    render();
  }
  function render(opts) {
    clearTimers();
    const pageBg = (view.screen === "squad" || view.screen === "activity") ? "#FFF0E6" : "#FAF7F5";
    setThemeColor(pageBg);
    document.documentElement.style.setProperty("--page-bg", pageBg);
    updateNav();
    if (view.screen === "splash") return renderSplash();
    if (view.screen === "onboard") return renderOnboard(0);
    if (view.screen === "onboard2") return renderOnboard(1);
    if (view.screen === "squad") return renderSquad();
    if (view.screen === "space") return renderSpace(view.person || "you", !(opts && opts.noAnim));
    if (view.screen === "activity") return renderActivity();
    if (view.screen === "chat") return renderChat(view.chatId);
    if (view.screen === "chats") return renderChats();
    renderSquad();
  }

  function renderSplash() {
    appEl().innerHTML = `<section class="screen splash" id="splash">
      <div class="mark">${MANGO_MARK}</div>
      <h1>mango</h1>
      <p>share vividly</p>
    </section>`;
    let done = false;
    const skip = () => {
      if (done) return;
      done = true;
      if (!state.user) { go("onboard"); return; }
      go("squad");
    };
    $("#splash").addEventListener("click", skip);
    later(skip, 1400);
  }

  function renderOnboard(step) {
    const color = state._draftColor || AVATAR_COLORS[0];
    const name = state._draftName || "";
    const handle = state._draftHandle || handleFrom(name);
    const initial = (name.trim().charAt(0) || "?").toUpperCase();
    if (step === 0) {
      appEl().innerHTML = `<section class="screen onboard fade-in">
        <h2>hey.<br>what should we call you?</h2>
        <p class="lede">first name is plenty.</p>
        <div class="avatar-preview" style="background:${color}">${esc(initial)}</div>
        <input class="name-input" id="nameIn" maxlength="18" placeholder="your first name" value="${esc(name)}" autocomplete="given-name" />
        <div class="swatches">${AVATAR_COLORS.map(c => `<button type="button" class="swatch ${c===color?"on":""}" data-c="${c}" style="background:${c}"></button>`).join("")}</div>
        <button type="button" class="btn green" id="goBtn" ${name.trim()?"":"disabled"}>continue</button>
      </section>`;
      const nameIn = $("#nameIn");
      nameIn.focus();
      nameIn.addEventListener("input", () => {
        state._draftName = nameIn.value;
        $(".avatar-preview").textContent = (nameIn.value.trim().charAt(0) || "?").toUpperCase();
        $("#goBtn").disabled = !nameIn.value.trim();
      });
      $$(".swatch").forEach(b => b.addEventListener("click", () => {
        state._draftColor = b.dataset.c;
        state._draftName = $("#nameIn").value;
        renderOnboard(0);
      }));
      $("#goBtn").addEventListener("click", () => {
        if (!nameIn.value.trim()) return;
        state._draftName = nameIn.value.trim();
        state._draftHandle = handleFrom(state._draftName);
        go("onboard2");
      });
      return;
    }
    appEl().innerHTML = `<section class="screen onboard fade-in">
      <h2>pick a handle</h2>
      <p class="lede">this is how friends find you.</p>
      <div class="avatar-preview" style="background:${color}">${esc(initial)}</div>
      <input class="name-input" id="hIn" maxlength="16" value="${esc(handle)}" />
      <div class="handle-hint" id="hh">@${esc(handle)}</div>
      <button type="button" class="btn green" id="goBtn" style="margin-top:24px">that's me</button>
    </section>`;
    const hIn = $("#hIn");
    hIn.focus();
    hIn.addEventListener("input", () => {
      const h = handleFrom(hIn.value);
      hIn.value = h;
      $("#hh").textContent = "@" + h;
    });
    $("#goBtn").addEventListener("click", () => {
      const h = handleFrom(hIn.value);
      state.user = { name: state._draftName, handle: h, color: color };
      delete state._draftName; delete state._draftColor; delete state._draftHandle;
      save();
      toast("welcome, " + state.user.name);
      go("squad");
    });
  }

  function wpClass() {
    const w = (state.settings && state.settings.wallpaper) || "cream";
    return w === "cream" ? "" : " wp-" + w;
  }
  function navIcons(active) {
    return `<button type="button" data-nav="activity" class="${active==="activity"?"on":""}" aria-label="Activity">${active==="activity"?ICONS.chats:ICONS.chatsOff}</button>
      <button type="button" data-nav="home" class="${active==="home"?"on":""}" aria-label="Home">${active==="home"?ICONS.house:ICONS.houseOff}</button>`;
  }
  // Persistent nav pill: lives in #device (above #app) so the sliding pages pass
  // underneath it instead of carrying it along. Created once; clicks are delegated.
  function updateNav() {
    const showOn = view.screen === "squad" || view.screen === "activity";
    let pill = $("#navPill", $("#device"));
    if (!showOn) { if (pill) pill.hidden = true; return; }
    if (!pill) {
      pill = document.createElement("div");
      pill.className = "nav-pill";
      pill.id = "navPill";
      $("#device").appendChild(pill);
      pill.addEventListener("click", e => {
        const b = e.target.closest("[data-nav]");
        if (!b) return;
        const target = b.dataset.nav === "home" ? "squad" : "activity";
        if (navAnimating || view.screen === target) return;
        if (view.screen === "squad" || view.screen === "activity") slideNav(target);
        else go(target);
      });
    }
    pill.hidden = false;
    pill.innerHTML = navIcons(view.screen === "squad" ? "home" : "activity");
  }
  let navAnimating = false;
  function slideNav(target) {
    const cur = appEl().querySelector(".screen");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cur || reduce) { go(target); return; }
    // Activity is the left page, the home feed is the right page.
    const goingLeft = target === "activity";
    const enterFrom = goingLeft ? "-100%" : "100%";
    const exitTo = goingLeft ? "100%" : "-100%";
    // Snapshot the outgoing screen as a static clone (no listeners) + its scroll offsets.
    const scrollTops = $$(".scroll", cur).map(s => s.scrollTop);
    const ghost = cur.cloneNode(true);
    ghost.classList.remove("fade-in", "push-in");
    // Render the real incoming screen so its events bind correctly.
    navAnimating = true;
    go(target);
    const incoming = appEl().querySelector(".screen");
    if (!incoming) { navAnimating = false; return; }
    incoming.classList.remove("fade-in", "push-in");
    // Mount the ghost on top and restore its scroll position.
    appEl().appendChild(ghost);
    $$(".scroll", ghost).forEach((s, i) => { s.scrollTop = scrollTops[i] || 0; });
    // Prime start positions, force one reflow, then animate both together.
    incoming.style.transform = "translateX(" + enterFrom + ")";
    ghost.style.transform = "translateX(0)";
    void incoming.offsetWidth;
    incoming.classList.add("nav-sliding");
    ghost.classList.add("nav-sliding");
    incoming.style.transform = "translateX(0)";
    ghost.style.transform = "translateX(" + exitTo + ")";
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      ghost.remove();
      incoming.classList.remove("nav-sliding");
      incoming.style.transform = "";
      navAnimating = false;
    };
    ghost.addEventListener("transitionend", done, { once: true });
    const fallback = setTimeout(done, 420);
  }
  // Back/pop: the current screen slides off to the right, revealing the target
  // beneath it (mirror of the push-in used when entering a space).
  function slideBack(target, extra) {
    const cur = appEl().querySelector(".screen");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cur || reduce || navAnimating) { go(target, extra); return; }
    const ghost = cur.cloneNode(true);
    ghost.classList.remove("fade-in", "push-in");
    navAnimating = true;
    go(target, extra);
    const incoming = appEl().querySelector(".screen");
    if (!incoming) { navAnimating = false; return; }
    incoming.classList.remove("fade-in", "push-in");
    // Mount the outgoing clone on top of the revealed target, then slide it away.
    appEl().appendChild(ghost);
    ghost.style.transform = "translateX(0)";
    void ghost.offsetWidth;
    ghost.classList.add("nav-sliding");
    ghost.style.transform = "translateX(100%)";
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      ghost.remove();
      navAnimating = false;
    };
    ghost.addEventListener("transitionend", done, { once: true });
    const fallback = setTimeout(done, 420);
  }

  function renderSquad() {
    const q = (view.search || "").toLowerCase();
    const fav = state.favorites || [];
    const ids = state.squad.slice().sort((a, b) => {
      const fa = fav.indexOf(a) >= 0 ? 0 : 1;
      const fb = fav.indexOf(b) >= 0 ? 0 : 1;
      if (fa !== fb) return fa - fb;
      return ((latest(b) && latest(b).ts) || 0) - ((latest(a) && latest(a).ts) || 0);
    }).filter(id => {
      if (!q) return true;
      const p = person(id);
      return (p.name + p.handle).toLowerCase().indexOf(q) >= 0;
    });
    const youPost = latest("you");
    const you = person("you");
    const rows = ids.map(id => {
      const p = person(id);
      const post = latest(id);
      const unread = !!state.unread[id];
      const starred = fav.indexOf(id) >= 0;
      const dot = unread
        ? (state.settings.replaceDots ? `<span class="unread-alt">*</span>` : `<i class="unread-dot"></i>`)
        : "";
      return `<button type="button" class="friend-row" data-id="${id}">
        ${avatar(id)}
        <div class="meta">
          <div class="who">${esc(p.name)}${starred ? `<span class="star-mini">★</span>` : ""}</div>
          <div class="preview">${dot}<span class="txt">${esc(previewText(post))}</span></div>
        </div>
        <span class="when">${post ? rel(post.ts) : ""}</span>
      </button>`;
    }).join("");

    appEl().innerHTML = `<section class="screen home-feed fade-in${wpClass()}">
      <div class="scroll home-scroll">
        <button type="button" class="you-card" id="youCard">
          ${avatar("you")}
          <div class="meta">
            <div class="who">${esc(you.name)}</div>
            <div class="preview">${esc(previewText(youPost))}</div>
          </div>
          <span class="chev">›</span>
        </button>
        <div class="cta-row">
          <button type="button" class="btn tan" id="tellBtn">Tell a Friend 😄</button>
          <button type="button" class="btn green" id="addBtn">Add by Username</button>
          <button type="button" class="icon-btn" id="gearBtn" aria-label="settings">${ICONS.gear}</button>
        </div>
        <div class="squad-card">${rows || `<div class="empty-space">no one matches</div>`}</div>
      </div>
    </section>`;
    $("#youCard").addEventListener("click", () => go("space", { person: "you" }));
    $$(".friend-row").forEach(b => b.addEventListener("click", () => {
      state.unread[b.dataset.id] = false;
      save();
      go("space", { person: b.dataset.id });
    }));
    $("#addBtn").addEventListener("click", openAddFriend);
    $("#tellBtn").addEventListener("click", openTell);
    $("#gearBtn").addEventListener("click", openSettings);
  }

  function renderSpace(id, animate = true) {
    const p = person(id);
    const mine = id === "you";
    const posts = (state.posts[id] || []).slice().sort((a, b) => b.ts - a.ts);
    const fav = (state.favorites || []).indexOf(id) >= 0;
    const gestures = (state.gestures[id] || []).slice().sort((a,b)=>b.ts-a.ts)[0];
    const tools = mine
      ? `<button type="button" class="icon-btn" id="gearBtn" aria-label="settings">${ICONS.gear}</button>
         <button type="button" class="icon-btn" id="actBtn" aria-label="activity">${ICONS.heartBox}</button>`
      : `<button type="button" class="icon-btn" id="starBtn" aria-label="favorite">${fav ? ICONS.starOn : ICONS.star}</button>
         <button type="button" class="icon-btn" id="chatBtn" aria-label="chat">${ICONS.chat}</button>
         <button type="button" class="icon-btn" id="infoBtn" aria-label="info">${ICONS.info}</button>`;
    const gNote = (!mine && gestures) ? (() => {
      const a = ACTIONS.find(x => x.id === gestures.action);
      return `<div style="padding:0 16px 8px"><div style="display:inline-flex;align-items:center;gap:6px;background:#fff;border-radius:99px;padding:6px 12px;font-size:12px;font-weight:600">
        ${a ? a.emoji : ""} ${esc(person(gestures.from).name)} ${a ? a.past : ""} · ${rel(gestures.ts)}
      </div></div>`;
    })() : "";
    const body = posts.length
      ? posts.map(post => renderPost(post, mine)).join("")
      : `<div class="empty-space">your space is quiet.<br>write something.</div>`;
    const dock = mine ? renderComposer() : "";
    const end = mine ? "" : `<div class="action-end">
      <div class="hint">thinking of them</div>
      <div class="actions">${ACTIONS.map(c =>
        `<button type="button" class="act" data-act="${c.id}" aria-label="${c.label}">${c.emoji}<em>${esc(c.label)}</em></button>`
      ).join("")}</div>
      <div class="next-hint">drag up for the next friend</div>
    </div>`;

    // Preserve scroll position on in-place re-renders (likes/comments/favorite)
    // so the page doesn't jump to the top when only the animation is suppressed.
    const prevScroll = animate ? 0 : ($("#spaceScroll") ? $("#spaceScroll").scrollTop : 0);

    appEl().innerHTML = `<section class="screen${animate ? " push-in" : ""}${wpClass()}">
      <div class="space-head profile">
        <button type="button" class="icon-btn" id="backBtn" aria-label="back">${ICONS.back}</button>
        ${avatar(id)}
        <div class="meta">
          <div class="who">${esc(p.name)}</div>
          <div class="preview">@${esc(p.handle)}</div>
        </div>
        <div class="space-tools">${tools}</div>
      </div>
      ${gNote}
      <div class="scroll" id="spaceScroll">
        <div class="posts">${body}</div>
        ${end}
      </div>
      ${dock}
    </section>`;

    if (!animate && $("#spaceScroll")) $("#spaceScroll").scrollTop = prevScroll;

    $("#backBtn").addEventListener("click", () => slideBack("squad"));
    if (mine) {
      $("#gearBtn").addEventListener("click", openSettings);
      $("#actBtn").addEventListener("click", () => go("activity"));
      bindComposer();
    } else {
      $("#starBtn").addEventListener("click", () => {
        const f = state.favorites || [];
        const i = f.indexOf(id);
        if (i >= 0) f.splice(i, 1);
        else if (f.length < 20) f.push(id);
        else return toast("20 favorites max");
        state.favorites = f; save(); renderSpace(id, false);
      });
      $("#infoBtn").addEventListener("click", () => openInfo(id));
      $("#chatBtn").addEventListener("click", () => go("chat", { chatId: id }));
      bindActions(id);
      bindStackFlip(id);
    }
    bindPostEvents(id);
    bindShoutAnims();
  }

  function bindStackFlip(id) {
    const sc = $("#spaceScroll");
    if (!sc) return;
    let startY = 0, pulling = false;
    sc.addEventListener("touchstart", e => { startY = e.touches[0].clientY; pulling = true; }, { passive: true });
    sc.addEventListener("touchend", e => {
      if (!pulling) return;
      pulling = false;
      const dy = startY - (e.changedTouches[0].clientY);
      const atBottom = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 24;
      if (atBottom && dy > 70) nextFriend(id);
    });
    sc.addEventListener("wheel", e => {
      const atBottom = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 8;
      if (atBottom && e.deltaY > 40) { e.preventDefault(); nextFriend(id); }
    }, { passive: false });
  }
  function nextFriend(id) {
    const fav = state.favorites || [];
    const list = state.squad.slice().sort((a, b) => {
      const fa = fav.indexOf(a) >= 0 ? 0 : 1;
      const fb = fav.indexOf(b) >= 0 ? 0 : 1;
      if (fa !== fb) return fa - fb;
      return ((latest(b) && latest(b).ts) || 0) - ((latest(a) && latest(a).ts) || 0);
    });
    const i = list.indexOf(id);
    const n = list[(i + 1) % list.length];
    state.unread[n] = false; save();
    toast(person(n).name);
    go("space", { person: n });
  }

  function renderPost(post) {
    const inner = postInner(post);
    const bleed = post.type === "shout" || post.type === "goodmorning" || post.type === "goodnight";
    const hc = heartCount(post.id);
    const comments = state.comments[post.id] || [];
    const heartOn = hasHeart(post.id);
    const commentOpen = view.commenting === post.id;
    const cap = (post.caption && post.type !== "text")
      ? `<div class="post-caption" style="${bleed ? "padding:8px 16px 0" : ""}">${esc(post.caption)}</div>` : "";
    return `<article class="post ${bleed ? "bleed" : ""}" data-id="${post.id}">
      ${inner}${cap}
      <div class="post-foot">
        <button type="button" class="meta-ico ${heartOn?"on":""}" data-heart="${post.id}" aria-label="heart">${heartOn?ICONS.heartOn:ICONS.heart}${hc?`<span>${hc}</span>`:""}</button>
        <button type="button" class="meta-ico" data-cmt="${post.id}" aria-label="comment">${ICONS.bubble}${comments.length?`<span>${comments.length}</span>`:""}</button>
        <span class="dash">—</span>
        <span>${rel(post.ts, true)}</span>
        <span class="sp"></span>
        <button type="button" class="meta-ico share-ico" data-share="${post.id}" aria-label="share">${ICONS.share}</button>
      </div>
      ${comments.length ? `<div class="comments">${comments.map(c => `<div class="comment"><b>${esc(person(c.by).name)}</b>${esc(c.text)}</div>`).join("")}</div>` : ""}
      ${commentOpen ? `<form class="comment-row" data-form="${post.id}"><input maxlength="80" placeholder="say something nice" /><button type="submit" class="meta-ico" style="color:var(--blue);font-weight:700">send</button></form>` : ""}
    </article>`;
  }

  function postInner(post) {
    const d = post.data || {};
    switch (post.type) {
      case "text": return `<div class="post-text">${esc(d.text)}</div>`;
      case "shout": {
        const frames = d.frames || [{ text: d.text, bg: d.bg, fg: d.fg, size: d.size || 46, italic: d.italic !== false }];
        const f0 = frames[0];
        return `<div class="shout-block shout-anim" data-frames='${esc(JSON.stringify(frames))}' style="background:${f0.bg};color:${f0.fg}">
          <span style="font-size:${f0.size||46}px;font-style:${f0.italic===false?"normal":"italic"}">${esc(f0.text)}</span>
        </div>`;
      }
      case "song":
        return `<div class="song-card"><div class="vinyl" style="background:${d.color}"></div>
          <div><div class="magic-line">♫ ${esc(d.title)}</div><div class="s">${esc(d.artist)}</div>
          <div class="song-links">
            <a href="https://music.apple.com/search?term=${encodeURIComponent(d.title+" "+d.artist)}" target="_blank" rel="noopener">Apple Music</a>
            <a href="https://open.spotify.com/search/${encodeURIComponent(d.title+" "+d.artist)}" target="_blank" rel="noopener">Spotify</a>
          </div></div></div>`;
      case "rate": {
        const stars = [1,2,3,4,5].map(i => i <= d.stars ? "★" : "<span class='off'>★</span>").join("");
        return `<div class="post-text">${esc(d.thing)}</div><div class="rate-line">Rating: <span class="stars">${stars}</span> ${d.stars}/5</div>`;
      }
      case "battery":
        return `<div class="batt-card"><div class="batt-art ${d.pct<20?"low":""}"><i style="width:${Math.max(8,d.pct)}%"></i></div>
          <div class="magic-line">🔋 ${d.pct}%</div></div>`;
      case "weather":
        return `<div class="magic-line">⛅ ${d.temp}° ${esc(d.sky)}</div><div class="s">${esc(d.place)}</div>`;
      case "here":
        return `<div class="here-card"><div class="here-ico">🏢</div><div><div class="nm">${esc(d.name)}</div><div class="ad">${esc(d.sub||"")}</div></div></div>`;
      case "mood":
        return `<div class="mood-card"><div class="mood-face">${d.emoji||""}</div><div class="m">${esc(d.label)}</div></div>`;
      case "goodmorning": return `<div class="gm-card"><span>good morning</span></div>`;
      case "goodnight": return `<div class="gn-card"><span>good night</span></div>`;
      case "time": {
        const t = d.str || new Date(post.ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        return `<div class="time-card"><div class="big">${esc(t)}</div></div>`;
      }
      case "date": {
        const dt = new Date(post.ts);
        const dow = d.dow || dt.toLocaleDateString("en-US", { weekday: "long" });
        const date = d.date || dt.toLocaleDateString("en-US", { month: "long", day: "numeric" });
        return `<div class="date-card"><div class="dow">${esc(dow)}</div><div class="d">${esc(date)}</div></div>`;
      }
      case "dice":
        return `<div class="dice-card">${dieHTML(d.a||d.n||1)}${d.b?dieHTML(d.b):""}
          <div class="magic-line">🎲 ${d.a||d.n}${d.b?"  "+d.b:""}</div></div>`;
      case "movie":
        return `<div class="media-card"><div class="poster" style="background:${d.color}">🎥</div><div class="magic-line">🎥 ${esc(d.title)}</div></div>`;
      case "tv":
        return `<div class="media-card"><div class="poster" style="background:${d.color}">📺</div><div class="magic-line">📺 ${esc(d.title)}</div></div>`;
      case "game":
        return `<div class="media-card"><div class="poster" style="background:${d.color}">🎮</div><div class="magic-line">🎮 ${esc(d.title)}</div></div>`;
      case "move":
        return `<div class="magic-line">👣 ${Number(d.steps).toLocaleString()} steps today</div>`;
      case "meetings":
        return `<div class="magic-line">📆 ${d.n} meetings left today</div>`;
      case "gif":
        return `<div class="gif-wrap"><img src="${esc(d.url)}" alt="${esc(d.label||"gif")}" /></div>`;
      case "caption":
        return `<div class="gif-wrap"><img src="${esc(d.url)}" alt="gif" /><div class="caption-on">${esc(d.text)}</div></div>`;
      case "draw":
        if (d.svg) return `<div class="draw-wrap">${d.svg}</div>`;
        return `<div class="draw-wrap"><img src="${esc(d.src)}" alt="doodle" /></div>`;
      case "photo":
      case "image":
        return `<div class="photo-wrap"><img src="${esc(d.src||d.url)}" alt="photo" /></div>`;
      case "loop":
        return `<div class="photo-wrap loop-photo"><img src="${esc(d.src||d.url)}" alt="looping photo" /></div>`;
      case "photobooth":
        return `<div class="booth">${(d.frames||[]).map(u=>`<img src="${esc(u)}" alt="" />`).join("")}</div>`;
      case "video":
        return `<div class="photo-wrap"><video src="${esc(d.src)}" muted playsinline controls data-cap="15"></video></div>`;
      case "throwback":
        return `<div class="photo-wrap throwback"><img src="${esc(d.url)}" alt="throwback" /><div class="stamp">${esc(d.stamp)}</div></div>`;
      case "noise":
        return `<div class="noise-card"><div class="meter" style="--p:${Math.round((d.db/80)*360)}deg"><span>${d.db}</span></div>
          <div><div class="magic-line">🔊 ${d.db} dB</div><div class="s">your room, allegedly</div></div></div>`;
      case "play":
        return `<div class="play-card"><div class="lb">mangoball</div><div class="sc">${d.score}</div><div class="s">${d.throws} throws</div></div>`;
      case "prompt":
        return `<div class="prompt-q">${esc(d.q)}</div><div class="prompt-a">${esc(d.a)}</div>`;
      case "sticker":
        return `<div class="chat-sticker">${esc(d.text)}</div>`;
      default:
        return `<div class="post-text">${esc(post.type)}</div>`;
    }
  }

  function bindShoutAnims() {
    $$(".shout-anim").forEach(el => {
      let frames;
      try { frames = JSON.parse(el.getAttribute("data-frames")); } catch (e) { return; }
      if (!frames || frames.length < 2) return;
      let i = 0;
      every(() => {
        i = (i + 1) % frames.length;
        const f = frames[i];
        el.style.background = f.photo ? "#111" : f.bg;
        el.style.color = f.fg;
        el.style.backgroundImage = f.photo ? "url(" + f.photo + ")" : "";
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        const sp = el.querySelector("span");
        if (sp) {
          sp.textContent = f.text;
          sp.style.fontSize = (f.size || 46) + "px";
          sp.style.fontStyle = f.italic === false ? "normal" : "italic";
        }
      }, 900);
    });
    $$("video[data-cap]").forEach(v => {
      v.addEventListener("timeupdate", () => { if (v.currentTime > 15) v.currentTime = 0; });
    });
  }

  function bindPostEvents(ownerId) {
    $$("[data-heart]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      toggleHeart(b.dataset.heart); save(); renderSpace(ownerId, false);
    }));
    $$("[data-cmt]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      view.commenting = view.commenting === b.dataset.cmt ? null : b.dataset.cmt;
      renderSpace(ownerId, false);
      const input = $(".comment-row input");
      if (input) input.focus();
    }));
    $$("[data-form]").forEach(f => f.addEventListener("submit", e => {
      e.preventDefault();
      const input = $("input", f);
      const text = (input.value || "").trim();
      if (!text) return;
      const pid = f.dataset.form;
      if (!state.comments[pid]) state.comments[pid] = [];
      state.comments[pid].push({ id: uid("c"), by: "you", text, ts: Date.now() });
      view.commenting = null; save(); renderSpace(ownerId, false);
    }));
    $$("[data-share]").forEach(b => b.addEventListener("click", () => toast("copied a pretend permalink")));
    $$(".post").forEach(el => {
      el.addEventListener("dblclick", () => { toggleHeart(el.dataset.id); save(); renderSpace(ownerId, false); });
      el.addEventListener("touchend", () => {
        const now = Date.now();
        if (lastTap.id === el.dataset.id && now - lastTap.t < 280) {
          toggleHeart(el.dataset.id); save(); renderSpace(ownerId, false);
          lastTap = { id: null, t: 0 };
        } else lastTap = { id: el.dataset.id, t: now };
      });
    });
  }

  function renderComposer() {
    return `<div class="dock">
      <textarea class="composer-text" id="composer" rows="1" placeholder="write something..." maxlength="280"></textarea>
      <div class="composer-tools">
        <button type="button" class="icon-btn cam-ico" id="camBtn" aria-label="camera">${ICONS.cam}</button>
        <button type="button" class="icon-btn" id="bulbBtn" aria-label="prompt">${ICONS.bulb}</button>
        <button type="button" class="icon-btn" id="wandBtn" aria-label="magic words">${ICONS.wand}</button>
        <span class="sp"></span>
        <button type="button" class="suggest-pill" id="chip" hidden></button>
        <button type="button" class="btn sm ghost-post" id="sendBtn" disabled>Post</button>
      </div>
    </div>`;
  }

  function bindComposer() {
    composeTo = { kind: "space" };
    const input = $("#composer");
    const send = $("#sendBtn");
    const chip = $("#chip");
    const paint = () => {
      const t = input.value.trim();
      const m = matchMagic(input.value);
      if (m) { chip.hidden = false; chip.textContent = m.word + ": " + m.desc; chip.dataset.word = m.word; }
      else chip.hidden = true;
      send.disabled = !t;
      send.className = t ? "btn sm green" : "btn sm ghost-post";
    };
    input.addEventListener("input", paint);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); trySend(); }
    });
    send.addEventListener("click", trySend);
    chip.addEventListener("click", () => { if (chip.dataset.word) openTool(chip.dataset.word); });
    function trySend() {
      const text = input.value.trim();
      if (!text) return;
      const exact = MAGIC.find(m => m.word === text.toLowerCase());
      if (exact) { openTool(exact.word); return; }
      publish({ type: "text", data: { text } });
    }
    $("#camBtn").addEventListener("click", openCamera);
    $("#bulbBtn").addEventListener("click", openPrompt);
    $("#wandBtn").addEventListener("click", openWand);
    paint();
  }
  function matchMagic(text) {
    const t = text.trim().toLowerCase();
    if (t.length < 2) return null;
    const last = t.split(/\s+/).pop();
    return MAGIC.find(m => m.word === last || m.word.startsWith(last)) || null;
  }
  function bindActions(id) {
    $$("[data-act]").forEach(b => b.addEventListener("click", () => {
      const c = ACTIONS.find(x => x.id === b.dataset.act);
      if (!state.gestures[id]) state.gestures[id] = [];
      state.gestures[id].unshift({ from: "you", action: c.id, ts: Date.now() });
      save();
      toast(c.emoji + " " + c.verb + " " + person(id).name);
      floatEmoji(c.emoji, b);
    }));
  }

  function publish(post) {
    const p = Object.assign({ id: uid("you-"), ts: Date.now() }, post);
    if (composeTo.kind === "chat") {
      const id = composeTo.id;
      if (!state.chats[id]) state.chats[id] = [];
      state.chats[id].push(Object.assign({}, p, { from: "you" }));
      save(); closeAllOverlays(); renderChat(id); toast("sent");
      return;
    }
    if (!state.posts.you) state.posts.you = [];
    state.posts.you.push(p);
    save();
    view.person = "you"; view.screen = "space";
    closeAllOverlays(); render({ noAnim: true }); toast("posted");
  }

  function closeAllOverlays() {
    $$(".overlay", $("#device")).forEach(o => o.remove());
    const stage = $(".stage");
    if (stage) stage.classList.remove("dimmed");
    if (overlayEsc) { document.removeEventListener("keydown", overlayEsc); overlayEsc = null; }
  }
  function openOverlay(opts) {
    closeAllOverlays();
    const wrap = document.createElement("div");
    wrap.className = "overlay" + (opts.full ? " full" : "") + (opts.bleed ? " bleed-over" : "");
    wrap.innerHTML = `<div class="backdrop" data-close="1"></div><div class="sheet" role="dialog" aria-modal="true"></div>`;
    const sheet = $(".sheet", wrap);
    const close = () => {
      wrap.classList.remove("show");
      const stage = $(".stage");
      if (stage) stage.classList.remove("dimmed");
      document.removeEventListener("keydown", onEsc);
      overlayEsc = null;
      setTimeout(() => wrap.remove(), 300);
    };
    const onEsc = e => { if (e.key === "Escape") close(); };
    overlayEsc = onEsc;
    document.addEventListener("keydown", onEsc);
    wrap.addEventListener("click", e => { if (e.target.dataset.close) close(); });
    $("#device").appendChild(wrap);
    opts.build(sheet, close);
    requestAnimationFrame(() => {
      wrap.classList.add("show");
      const stage = $(".stage");
      if (stage) stage.classList.add("dimmed");
    });
    return { wrap, sheet, close };
  }
  function sheetChrome(sheet, title, extra) {
    sheet.innerHTML = `<div class="grab"></div>
      <div class="sheet-head"><h3>${esc(title)}</h3>
      <button type="button" class="close-x" data-x="1" aria-label="close">×</button></div>
      <div class="sheet-body">${extra || ""}</div>`;
    $(".close-x", sheet).addEventListener("click", () => {
      const bd = sheet.closest(".overlay").querySelector(".backdrop");
      if (bd) bd.click();
    });
    return $(".sheet-body", sheet);
  }
  function openTool(word) {
    const tools = {
      shout: openShout, draw: openDraw, gif: openGif, song: openSong, rate: openRate,
      battery: openBattery, weather: openWeather, here: openHere, mood: openMood,
      goodmorning: () => openSimple("goodmorning", "good morning"),
      goodnight: () => openSimple("goodnight", "good night"),
      time: openTime, date: openDate, dice: openDice,
      movie: () => openMedia("movie", MOVIES, "watching"),
      tv: () => openMedia("tv", SHOWS, "watching"),
      game: () => openMedia("game", GAMES, "playing"),
      move: openMove, meetings: openMeetings,
      throwback: openThrowback, noise: openNoise, caption: openCaption,
      image: openImage, play: openMangoball
    };
    (tools[word] || openWand)();
  }

  function openShout() {
    const frames = [{ text: "", bg: SHOUT_COLORS[0].bg, fg: SHOUT_COLORS[0].fg, size: 48, italic: true, photo: "" }];
    let idx = 0;
    openOverlay({ bleed: true, title: "shout", build: (sheet, close) => {
      const paint = () => {
        const f = frames[idx];
        sheet.innerHTML = `<div class="shout-ui" style="background:${f.photo?"#111":f.bg};color:${f.fg};${f.photo?"background-image:url("+f.photo+");background-size:cover;background-position:center":""}">
          <div class="shout-top">
            <button type="button" class="close-x" id="shClose">×</button>
            <button type="button" class="btn sm green" id="shPost">shout</button>
          </div>
          <textarea id="shText" maxlength="40" placeholder="a few words">${esc(f.text)}</textarea>
          <div class="shout-tools">
            <button type="button" class="size-btn" id="szDown">−</button>
            <button type="button" class="size-btn" id="szUp">+</button>
            <button type="button" class="size-btn" id="photoBtn">📷</button>
          </div>
          <div class="swatch-row">${SHOUT_COLORS.map((c,i)=>`<button type="button" data-i="${i}" class="${c.bg===f.bg?"on":""}" style="background:${c.bg}"></button>`).join("")}</div>
          <div class="frame-dots">${frames.map((_,i)=>`<i class="${i===idx?"on":""}"></i>`).join("")}</div>
          <div class="shout-hint">tap text for italics · swipe left for extra frames · ${40 - (f.text||"").length} left</div>
          <input type="file" accept="image/*" id="shFile" hidden />
        </div>`;
        const ta = $("#shText", sheet);
        ta.style.fontSize = f.size + "px";
        ta.style.fontStyle = f.italic ? "italic" : "normal";
        ta.focus();
        ta.addEventListener("input", () => { frames[idx].text = ta.value.slice(0, 40); });
        let tapAt = 0;
        ta.addEventListener("pointerdown", () => { tapAt = Date.now(); });
        ta.addEventListener("pointerup", () => {
          if (Date.now() - tapAt < 200 && document.activeElement === ta && ta.value) {
            frames[idx].italic = !frames[idx].italic;
            ta.style.fontStyle = frames[idx].italic ? "italic" : "normal";
          }
        });
        $("#szDown", sheet).addEventListener("click", () => { frames[idx].size = Math.max(22, frames[idx].size - 6); paint(); });
        $("#szUp", sheet).addEventListener("click", () => { frames[idx].size = Math.min(72, frames[idx].size + 6); paint(); });
        $$(".swatch-row button", sheet).forEach(b => b.addEventListener("click", () => {
          const c = SHOUT_COLORS[+b.dataset.i];
          frames[idx].bg = c.bg; frames[idx].fg = c.fg; frames[idx].photo = "";
          paint();
        }));
        $("#photoBtn", sheet).addEventListener("click", () => $("#shFile", sheet).click());
        $("#shFile", sheet).addEventListener("change", e => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;
          const r = new FileReader();
          r.onload = () => { frames[idx].photo = r.result; paint(); };
          r.readAsDataURL(file);
        });
        $("#shClose", sheet).addEventListener("click", close);
        $("#shPost", sheet).addEventListener("click", () => {
          frames.forEach(fr => { if (!fr.text.trim()) fr.text = "hey"; });
          publish({ type: "shout", data: { frames } });
        });
        let sx = 0;
        const ui = $(".shout-ui", sheet);
        ui.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
        ui.addEventListener("touchend", e => {
          const dx = e.changedTouches[0].clientX - sx;
          if (dx < -50 && frames.length < 4) {
            frames.push({ text: "", bg: SHOUT_COLORS[frames.length % SHOUT_COLORS.length].bg, fg: "#fff", size: 48, italic: true, photo: "" });
            idx = frames.length - 1; paint();
          } else if (dx < -50 && frames.length >= 2) {
            idx = (idx + 1) % frames.length; paint();
          } else if (dx > 50 && frames.length > 1) {
            idx = (idx - 1 + frames.length) % frames.length; paint();
          }
        });
      };
      paint();
    }});
  }

  function openDraw() {
    openOverlay({ full: true, title: "draw", build: sheet => {
      sheetChrome(sheet, "draw", `
        <div style="display:flex;gap:8px;align-items:center;padding:8px 0">
          <span class="s" style="flex:1">thin black only</span>
          <button type="button" class="btn gray sm" id="undoBtn">undo</button>
        </div>
        <canvas id="drawCanvas" width="340" height="380"></canvas>
        <button type="button" class="btn green" id="drawPost" style="margin-top:14px">Post</button>
      `);
      const canvas = $("#drawCanvas", sheet);
      const ctx = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = Math.max(canvas.clientWidth || 0, 320);
      const cssH = 380;
      canvas.width = cssW * dpr; canvas.height = cssH * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 1.8;
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cssW, cssH);
      const strokes = []; let cur = null;
      const pos = e => {
        const r = canvas.getBoundingClientRect();
        const t = e.touches ? e.touches[0] : e;
        return { x: t.clientX - r.left, y: t.clientY - r.top };
      };
      const redraw = () => {
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cssW, cssH);
        ctx.strokeStyle = "#1C1C1E"; ctx.lineWidth = 1.8;
        for (const st of strokes) {
          if (st.length < 1) continue;
          ctx.beginPath(); ctx.moveTo(st[0].x, st[0].y);
          for (let i = 1; i < st.length; i++) {
            const p = st[i], prev = st[i-1];
            ctx.quadraticCurveTo(prev.x, prev.y, (prev.x+p.x)/2, (prev.y+p.y)/2);
          }
          ctx.stroke();
        }
      };
      const down = e => { e.preventDefault(); cur = [pos(e)]; strokes.push(cur); };
      const move = e => { if (!cur) return; e.preventDefault(); cur.push(pos(e)); redraw(); };
      const up = () => { cur = null; };
      canvas.addEventListener("pointerdown", down);
      canvas.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      $("#undoBtn", sheet).addEventListener("click", () => { strokes.pop(); redraw(); });
      $("#drawPost", sheet).addEventListener("click", () => {
        publish({ type: "draw", data: { src: canvas.toDataURL("image/png") } });
        window.removeEventListener("pointerup", up);
      });
    }});
  }

  function openGif() {
    let list = GIFS.slice();
    let i = 0;
    openOverlay({ full: true, title: "gif", build: sheet => {
      sheetChrome(sheet, "gif", `
        <input class="field" id="gifQ" placeholder="search gifs" />
        <p class="s" style="margin:10px 0 0">use the arrows to cycle results</p>
        <div class="gif-stage">
          <button type="button" class="arrow-btn" id="gL">‹</button>
          <div class="gif-view"><img id="gImg" alt="gif" /><button type="button" class="gif-nav l" id="gL2">‹</button><button type="button" class="gif-nav r" id="gR2">›</button></div>
          <button type="button" class="arrow-btn" id="gR">›</button>
        </div>
        <button type="button" class="btn green" id="gPost" style="margin-top:14px">Post</button>
      `);
      const show = () => {
        if (!list.length) list = GIFS.slice();
        i = ((i % list.length) + list.length) % list.length;
        $("#gImg", sheet).src = list[i].url;
      };
      const filt = q => {
        const qq = (q || "").toLowerCase();
        list = GIFS.filter(g => !qq || g.q.includes(qq) || g.label.includes(qq));
        i = 0; show();
      };
      $("#gifQ", sheet).addEventListener("input", e => filt(e.target.value));
      $("#gL", sheet).addEventListener("click", () => { i--; show(); });
      $("#gR", sheet).addEventListener("click", () => { i++; show(); });
      $("#gL2", sheet).addEventListener("click", () => { i--; show(); });
      $("#gR2", sheet).addEventListener("click", () => { i++; show(); });
      $("#gPost", sheet).addEventListener("click", () => publish({ type: "gif", data: { url: list[i].url, label: list[i].label } }));
      $("#gifQ", sheet).focus();
      show();
    }});
  }

  function openSong() {
    openOverlay({ title: "song", build: sheet => {
      sheetChrome(sheet, "song", `<div class="listen"><div class="rings">♫</div><p class="s">listening…</p></div>`);
      later(() => {
        const body = $(".sheet-body", sheet);
        if (!body) return;
        body.innerHTML = `<p class="s">we heard something like:</p>
          <div class="pick-list">${SONGS.map((s,i)=>`<button type="button" class="pick" data-i="${i}">
            <div class="col-block" style="background:${s.color};border-radius:50%"></div>
            <div><strong>${esc(s.title)}</strong><div class="s">${esc(s.artist)}</div>
            <div class="song-links">
              <a href="https://music.apple.com/search?term=${encodeURIComponent(s.title)}" target="_blank" rel="noopener">Apple Music</a>
              <a href="https://open.spotify.com/search/${encodeURIComponent(s.title)}" target="_blank" rel="noopener">Spotify</a>
            </div></div></button>`).join("")}</div>`;
        $$(".pick", sheet).forEach(b => b.addEventListener("click", e => {
          if (e.target.closest("a")) return;
          publish({ type: "song", data: SONGS[+b.dataset.i] });
        }));
      }, 1200);
    }});
  }

  function openRate() {
    let stars = 0;
    openOverlay({ title: "rate", build: sheet => {
      sheetChrome(sheet, "rate anything", `
        <input class="field" id="rateThing" placeholder="what are we rating" maxlength="48" />
        <div class="star-pick" id="starPick" style="margin:18px 0">${[1,2,3,4,5].map(i=>`<button type="button" data-n="${i}">★</button>`).join("")}</div>
        <button type="button" class="btn green" id="ratePost" disabled>Post</button>
      `);
      const thing = $("#rateThing", sheet);
      thing.focus();
      const paint = () => {
        $$("#starPick button", sheet).forEach(b => b.classList.toggle("on", +b.dataset.n <= stars));
        $("#ratePost", sheet).disabled = !(thing.value.trim() && stars);
      };
      $$("#starPick button", sheet).forEach(b => b.addEventListener("click", () => { stars = +b.dataset.n; paint(); }));
      thing.addEventListener("input", paint);
      $("#ratePost", sheet).addEventListener("click", () => publish({ type: "rate", data: { thing: thing.value.trim(), stars } }));
    }});
  }

  async function getBatteryPct() {
    try {
      if (navigator.getBattery) {
        const b = await navigator.getBattery();
        return Math.round(b.level * 100);
      }
    } catch (err) {}
    return 64;
  }
  function openBattery() {
    openOverlay({ title: "battery", build: async sheet => {
      sheetChrome(sheet, "battery", `<p class="s">checking pockets…</p>`);
      const pct = await getBatteryPct();
      const body = $(".sheet-body", sheet);
      body.innerHTML = `<div class="preview-pane"><div class="post">${postInner({ type:"battery", data:{ pct } })}</div></div>
        <button type="button" class="btn green" id="battPost">Post ${pct}%</button>`;
      $("#battPost", sheet).addEventListener("click", () => publish({ type: "battery", data: { pct } }));
    }});
  }
  function openWeather() {
    const data = { temp: 72, sky: "partly cloudy", place: "Brooklyn" };
    openOverlay({ title: "weather", build: sheet => {
      sheetChrome(sheet, "weather", `<div class="preview-pane"><div class="post">${postInner({ type:"weather", data })}</div></div>
        <button type="button" class="btn green" id="wxPost">Post</button>`);
      $("#wxPost", sheet).addEventListener("click", () => publish({ type: "weather", data }));
    }});
  }
  function openHere() {
    openOverlay({ title: "here", build: sheet => {
      sheetChrome(sheet, "here", `<div class="pick-list">${PLACES.map((p,i)=>
        `<button type="button" class="pick" data-i="${i}"><div class="here-ico">🏢</div>
          <div><strong>${esc(p.name)}</strong><div class="s">${esc(p.sub)}</div></div></button>`
      ).join("")}</div>`);
      $$(".pick", sheet).forEach(b => b.addEventListener("click", () => publish({ type: "here", data: PLACES[+b.dataset.i] })));
    }});
  }
  function openMood() {
    openOverlay({ title: "mood", build: sheet => {
      sheetChrome(sheet, "how are you feeling", `<div class="mood-row">${MOODS.map(m =>
        `<button type="button" class="mood-pick" data-id="${m.id}"><span class="f">${m.emoji}</span>${esc(m.label)}</button>`
      ).join("")}</div>`);
      $$(".mood-pick", sheet).forEach(b => b.addEventListener("click", () => {
        const m = MOODS.find(x => x.id === b.dataset.id);
        publish({ type: "mood", data: { id: m.id, emoji: m.emoji, label: m.label } });
      }));
    }});
  }
  function openSimple(type, title) {
    openOverlay({ title, build: sheet => {
      sheetChrome(sheet, title, `<div class="preview-pane">${postInner({ type, data: { label: title } })}</div>
        <button type="button" class="btn green" id="simplePost">Post</button>`);
      $("#simplePost", sheet).addEventListener("click", () => publish({ type, data: { label: title } }));
    }});
  }
  function openTime() {
    const str = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    openOverlay({ title: "time", build: sheet => {
      sheetChrome(sheet, "time", `<div class="preview-pane">${postInner({ type:"time", data:{ str }, ts: Date.now() })}</div>
        <button type="button" class="btn green" id="tPost">Post</button>`);
      $("#tPost", sheet).addEventListener("click", () => publish({ type: "time", data: { str } }));
    }});
  }
  function openDate() {
    const dt = new Date();
    const data = { dow: dt.toLocaleDateString("en-US", { weekday: "long" }), date: dt.toLocaleDateString("en-US", { month: "long", day: "numeric" }) };
    openOverlay({ title: "date", build: sheet => {
      sheetChrome(sheet, "date", `<div class="preview-pane">${postInner({ type:"date", data, ts: Date.now() })}</div>
        <button type="button" class="btn green" id="dPost">Post</button>`);
      $("#dPost", sheet).addEventListener("click", () => publish({ type: "date", data }));
    }});
  }
  function openDice() {
    openOverlay({ title: "dice", build: sheet => {
      let a = 1, b = 1;
      sheetChrome(sheet, "dice", `
        <div style="display:flex;justify-content:center;gap:14px;padding:18px 0" id="diceBox">${dieHTML(1)}${dieHTML(1)}</div>
        <button type="button" class="btn gray" id="reRoll" style="margin-bottom:8px">roll again</button>
        <button type="button" class="btn green" id="dicePost">Post</button>
      `);
      const box = $("#diceBox", sheet);
      const postBtn = $("#dicePost", sheet);
      const roll = () => {
        postBtn.disabled = true;
        const iv = setInterval(() => {
          box.innerHTML = dieHTML(1+Math.floor(Math.random()*6)) + dieHTML(1+Math.floor(Math.random()*6));
          $$(".die", box).forEach(d => d.classList.add("rolling"));
        }, 70);
        later(() => {
          clearInterval(iv);
          a = 1 + Math.floor(Math.random()*6);
          b = 1 + Math.floor(Math.random()*6);
          box.innerHTML = dieHTML(a) + dieHTML(b);
          postBtn.disabled = false;
        }, 720);
      };
      roll();
      $("#reRoll", sheet).addEventListener("click", roll);
      postBtn.addEventListener("click", () => publish({ type: "dice", data: { a, b } }));
    }});
  }
  function openMedia(type, list, verb) {
    openOverlay({ title: type, build: sheet => {
      sheetChrome(sheet, type, `<div class="pick-list">${list.map((m,i)=>
        `<button type="button" class="pick" data-i="${i}"><div class="col-block" style="background:${m.color}"></div>
          <div><div class="s">${esc(verb)}</div><strong>${esc(m.title)}</strong></div></button>`
      ).join("")}</div>`);
      $$(".pick", sheet).forEach(b => b.addEventListener("click", () => publish({ type, data: list[+b.dataset.i] })));
    }});
  }
  function openMove() {
    const data = { steps: 8432 };
    openOverlay({ title: "move", build: sheet => {
      sheetChrome(sheet, "move", `<div class="preview-pane"><div class="post">${postInner({ type:"move", data })}</div></div>
        <button type="button" class="btn green" id="mvPost">Post</button>`);
      $("#mvPost", sheet).addEventListener("click", () => publish({ type: "move", data }));
    }});
  }
  function openMeetings() {
    const data = { n: 2 };
    openOverlay({ title: "meetings", build: sheet => {
      sheetChrome(sheet, "meetings", `<div class="preview-pane"><div class="post">${postInner({ type:"meetings", data })}</div></div>
        <button type="button" class="btn green" id="mtPost">Post</button>`);
      $("#mtPost", sheet).addEventListener("click", () => publish({ type: "meetings", data }));
    }});
  }

  function openThrowback() {
    const url = PHOTOS[Math.floor(Math.random()*PHOTOS.length)].url;
    const year = 2013 + Math.floor(Math.random()*3);
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const stamp = months[Math.floor(Math.random()*12)] + " " + (1+Math.floor(Math.random()*27)) + ", " + year + "  " + (1+Math.floor(Math.random()*11)) + ":" + String(Math.floor(Math.random()*60)).padStart(2,"0") + " PM";
    const data = { url, stamp };
    openOverlay({ title: "throwback", build: sheet => {
      sheetChrome(sheet, "throwback", `<div class="preview-pane">${postInner({ type:"throwback", data })}</div>
        <button type="button" class="btn green" id="tbPost">Post</button>`);
      $("#tbPost", sheet).addEventListener("click", () => publish({ type: "throwback", data }));
    }});
  }
  function openNoise() {
    const db = 34 + Math.floor(Math.random()*29);
    openOverlay({ title: "noise", build: sheet => {
      sheetChrome(sheet, "noise", `<div class="preview-pane">${postInner({ type:"noise", data:{ db } })}</div>
        <button type="button" class="btn green" id="nPost">Post</button>`);
      $("#nPost", sheet).addEventListener("click", () => publish({ type: "noise", data: { db } }));
    }});
  }
  function openCaption() {
    const g = GIFS[Math.floor(Math.random()*GIFS.length)];
    openOverlay({ title: "caption", build: sheet => {
      sheetChrome(sheet, "caption a gif", `
        <div class="gif-wrap" style="border-radius:10px;position:relative">
          <img src="${esc(g.url)}" alt="" style="width:100%;height:210px;object-fit:cover" />
          <div class="caption-on" id="capPrev">…</div>
        </div>
        <input class="field" id="capIn" placeholder="write on it" maxlength="48" style="margin-top:10px" />
        <button type="button" class="btn green" id="capPost" style="margin-top:12px" disabled>Post</button>
      `);
      const inp = $("#capIn", sheet);
      inp.focus();
      inp.addEventListener("input", () => {
        $("#capPrev", sheet).textContent = inp.value || "…";
        $("#capPost", sheet).disabled = !inp.value.trim();
      });
      $("#capPost", sheet).addEventListener("click", () => publish({ type: "caption", data: { url: g.url, text: inp.value.trim() } }));
    }});
  }
  function openImage() {
    let list = PHOTOS.slice();
    openOverlay({ full: true, title: "image", build: sheet => {
      sheetChrome(sheet, "image", `
        <input class="field" id="imQ" placeholder="search photos" />
        <div class="pick-list" id="imList" style="margin-top:10px"></div>
      `);
      const paint = q => {
        const qq = (q||"").toLowerCase();
        list = PHOTOS.filter(p => !qq || p.q.includes(qq) || p.label.includes(qq));
        $("#imList", sheet).innerHTML = list.map((p,i) =>
          `<button type="button" class="pick" data-i="${i}"><img src="${esc(p.url)}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:8px" />
           <strong>${esc(p.label)}</strong></button>`
        ).join("");
        $$(".pick", sheet).forEach(b => b.addEventListener("click", () => publish({ type: "image", data: { url: list[+b.dataset.i].url } })));
      };
      $("#imQ", sheet).addEventListener("input", e => paint(e.target.value));
      paint("");
    }});
  }
  function openPrompt() {
    const q = PROMPTS[state.promptIndex % PROMPTS.length];
    state.promptIndex = (state.promptIndex + 1) % PROMPTS.length;
    save();
    openOverlay({ title: "prompt", build: sheet => {
      sheetChrome(sheet, "a little prompt", `
        <p class="prompt-q" style="font-size:18px;color:var(--ink)">${esc(q)}</p>
        <textarea class="field" id="promptA" rows="3" placeholder="answer, vividly" maxlength="180" style="min-height:90px;resize:none"></textarea>
        <button type="button" class="btn green" id="prPost" style="margin-top:14px" disabled>Post</button>
      `);
      const ta = $("#promptA", sheet);
      ta.focus();
      ta.addEventListener("input", () => { $("#prPost", sheet).disabled = !ta.value.trim(); });
      $("#prPost", sheet).addEventListener("click", () => publish({ type: "prompt", data: { q, a: ta.value.trim() } }));
    }});
  }
  function openWand() {
    openOverlay({ bleed: true, title: "magic words", build: (sheet, close) => {
      sheet.innerHTML = `<div class="wand-screen">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
          <button type="button" class="close-x" id="wClose">×</button>
          <span style="font-weight:700;color:#555">magic words</span>
          <span style="width:30px"></span>
        </div>
        <div class="wand-grid">${CHEAT.map(c =>
          `<button type="button" class="wand-cell" data-word="${c[0]}"><div class="wand-box">${esc(c[0])}</div><small>${esc(c[1])}</small></button>`
        ).join("")}</div>
        <p class="wand-more">...and more!</p>
        <div class="wand-grid" style="margin-top:18px">${MAGIC.filter(m => !CHEAT.find(c=>c[0]===m.word)).map(m =>
          `<button type="button" class="wand-cell" data-word="${m.word}"><div class="wand-box">${esc(m.word)}</div><small>${esc(m.desc)}</small></button>`
        ).join("")}</div>
      </div>`;
      $("#wClose", sheet).addEventListener("click", close);
      $$(".wand-cell", sheet).forEach(b => b.addEventListener("click", () => openTool(b.dataset.word)));
    }});
  }

  function openCamera() {
    openOverlay({ title: "camera", build: sheet => {
      sheetChrome(sheet, "camera", `
        <div class="cam-opts">
          <button type="button" class="cam-opt" id="upPhoto">Take / upload photo<span>from this computer</span></button>
          <button type="button" class="cam-opt" id="loopPhoto">Looping photo<span>a gentle Ken Burns loop</span></button>
          <button type="button" class="cam-opt" id="booth">Looping photobooth<span>4 frames, gif-like</span></button>
          <button type="button" class="cam-opt" id="upVid">Upload a short clip<span>plays up to 15 seconds</span></button>
        </div>
        <input type="file" accept="image/*" id="fileIn" hidden />
        <input type="file" accept="video/*" id="vidIn" hidden />
      `);
      const readImg = (file, type) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const c = document.createElement("canvas");
          const max = 720;
          const scale = Math.min(1, max / img.width);
          c.width = Math.round(img.width * scale);
          c.height = Math.round(img.height * scale);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          publish({ type, data: { src: c.toDataURL("image/jpeg", 0.78) } });
          URL.revokeObjectURL(url);
        };
        img.src = url;
      };
      $("#upPhoto", sheet).addEventListener("click", () => { $("#fileIn", sheet).dataset.mode = "photo"; $("#fileIn", sheet).click(); });
      $("#loopPhoto", sheet).addEventListener("click", () => { $("#fileIn", sheet).dataset.mode = "loop"; $("#fileIn", sheet).click(); });
      $("#fileIn", sheet).addEventListener("change", e => {
        const file = e.target.files && e.target.files[0];
        if (file) readImg(file, e.target.dataset.mode || "photo");
      });
      $("#upVid", sheet).addEventListener("click", () => $("#vidIn", sheet).click());
      $("#vidIn", sheet).addEventListener("change", e => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const r = new FileReader();
        r.onload = () => publish({ type: "video", data: { src: r.result } });
        r.readAsDataURL(file);
      });
      $("#booth", sheet).addEventListener("click", openBooth);
    }});
  }
  function openBooth() {
    const frames = [null, null, null, null];
    openOverlay({ full: true, title: "photobooth", build: sheet => {
      sheetChrome(sheet, "looping photobooth", `
        <p class="s">pick 4 frames</p>
        <div class="booth-slots">${[0,1,2,3].map(i=>`<button type="button" data-i="${i}" id="bs${i}">frame ${i+1}</button>`).join("")}</div>
        <input type="file" accept="image/*" id="bf" hidden />
        <button type="button" class="btn green" id="boothPost" disabled>Post</button>
      `);
      let slot = 0;
      const file = $("#bf", sheet);
      $$(".booth-slots button", sheet).forEach(b => b.addEventListener("click", () => { slot = +b.dataset.i; file.click(); }));
      file.addEventListener("change", e => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => {
          frames[slot] = r.result;
          $("#bs"+slot, sheet).innerHTML = `<img src="${r.result}" alt="" />`;
          $("#boothPost", sheet).disabled = frames.some(x => !x);
        };
        r.readAsDataURL(f);
        file.value = "";
      });
      $("#boothPost", sheet).addEventListener("click", () => publish({ type: "photobooth", data: { frames: frames.slice() } }));
    }});
  }

  function openMangoball() {
    const BALLS = ["🏀","💰","🌍","💣","🍪","💿"];
    openOverlay({ bleed: true, title: "mangoball", build: (sheet, close) => {
      sheet.innerHTML = `<div class="ball-ui">
        <canvas id="pb"></canvas>
        <div class="ball-hud">
          <button type="button" class="close-x" id="pbX">×</button>
          <div class="sc" id="pbSc">0</div>
          <div class="s" id="pbTh">5 left</div>
        </div>
        <div class="ball-hint" id="pbHint">flick the ball at the hoop</div>
        <button type="button" class="btn green ball-done" id="pbDone" hidden>done · post score</button>
      </div>`;
      const canvas = $("#pb", sheet);
      const ctx = canvas.getContext("2d");
      const W = 390, H = 812;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = "100%"; canvas.style.height = "100%";
      ctx.scale(dpr, dpr);
      let throwsLeft = 5, score = 0, makes = 0, ballI = 0, hoopA = 0;
      let ball = { x: W/2, y: H - 120, vx: 0, vy: 0, r: 18, flying: false };
      let scored = false, over = false, drag = null, raf = 0;
      const hoop = () => ({ cx: W/2 + Math.sin(hoopA)*18, cy: 190, w: 56, a: hoopA });
      function tick() {
        if (!over && ball.flying) {
          ball.vy += 0.42; ball.x += ball.vx; ball.y += ball.vy;
          if (ball.x < ball.r) { ball.x = ball.r; ball.vx *= -0.55; }
          if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx *= -0.55; }
          const h = hoop();
          [{x:h.cx-h.w/2,y:h.cy},{x:h.cx+h.w/2,y:h.cy}].forEach(rim => {
            const dx = ball.x - rim.x, dy = ball.y - rim.y;
            const dist = Math.hypot(dx, dy);
            if (dist < ball.r + 6 && dist > 0) {
              const nx = dx/dist, ny = dy/dist;
              const dot = ball.vx*nx + ball.vy*ny;
              ball.vx -= 2.1 * dot * nx; ball.vy -= 2.1 * dot * ny;
              ball.x = rim.x + nx * (ball.r + 6.2);
              ball.y = rim.y + ny * (ball.r + 6.2);
            }
          });
          if (!scored && ball.vy > 0 && ball.y > h.cy - 6 && ball.y < h.cy + 10 &&
              ball.x > h.cx - h.w/2 + 8 && ball.x < h.cx + h.w/2 - 8) {
            scored = true; score++; makes++;
            $("#pbSc").textContent = score;
            if (makes % 2 === 0) { ballI = (ballI + 1) % BALLS.length; hoopA = (Math.random()*0.8 - 0.4); }
            toast("swish");
            later(resetBall, 500);
          }
          if (ball.y > H - 40) {
            if (!scored) { throwsLeft--; $("#pbTh").textContent = throwsLeft + " left"; }
            if (throwsLeft <= 0) endGame();
            else later(resetBall, 300);
            ball.flying = false;
          }
        }
        draw();
        raf = requestAnimationFrame(tick);
      }
      function resetBall() {
        if (over) return;
        ball = { x: W/2, y: H - 120, vx: 0, vy: 0, r: 18, flying: false };
        scored = false;
      }
      function endGame() {
        over = true;
        $("#pbHint").hidden = true;
        $("#pbDone").hidden = false;
        $("#pbTh").textContent = "done";
      }
      function draw() {
        ctx.clearRect(0, 0, W, H);
        const h = hoop();
        ctx.save();
        ctx.translate(h.cx, h.cy); ctx.rotate(h.a);
        ctx.fillStyle = "#fff"; ctx.fillRect(-40, -52, 80, 8);
        ctx.strokeStyle = "#e85d04"; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.ellipse(0, 0, h.w/2, 8, 0, 0, Math.PI*2); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.lineWidth = 1;
        for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i*7, 0); ctx.lineTo(i*5, 28); ctx.stroke(); }
        ctx.restore();
        ctx.font = "36px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(BALLS[ballI], ball.x, ball.y);
      }
      canvas.addEventListener("pointerdown", e => {
        if (over || ball.flying) return;
        const r = canvas.getBoundingClientRect();
        const x = (e.clientX - r.left) * (W / r.width);
        const y = (e.clientY - r.top) * (H / r.height);
        if (Math.hypot(x-ball.x, y-ball.y) < 50) drag = { x, y };
      });
      canvas.addEventListener("pointerup", e => {
        if (!drag || over) { drag = null; return; }
        const r = canvas.getBoundingClientRect();
        const x = (e.clientX - r.left) * (W / r.width);
        const y = (e.clientY - r.top) * (H / r.height);
        ball.vx = (x - drag.x) * 0.18;
        ball.vy = (y - drag.y) * 0.18;
        if (Math.hypot(ball.vx, ball.vy) < 2) { ball.vy = -11; ball.vx = (Math.random()-0.5)*2; }
        ball.flying = true; scored = false;
        $("#pbHint").style.opacity = "0";
        drag = null;
      });
      $("#pbX", sheet).addEventListener("click", () => { cancelAnimationFrame(raf); close(); });
      $("#pbDone", sheet).addEventListener("click", () => { cancelAnimationFrame(raf); publish({ type: "play", data: { score, throws: 5 } }); });
      raf = requestAnimationFrame(tick);
    }});
  }

  function openAddFriend() {
    openOverlay({ title: "add", build: sheet => {
      sheetChrome(sheet, "Add by Username", `
        <input class="field" id="un" placeholder="username" />
        <div id="found" style="margin-top:12px"></div>
      `);
      const un = $("#un", sheet);
      un.focus();
      const paint = () => {
        const q = un.value.trim().toLowerCase().replace(/^@/, "");
        const extras = Object.keys(PEOPLE).filter(id => PEOPLE[id].handle === q || PEOPLE[id].name.toLowerCase().indexOf(q) === 0);
        const box = $("#found", sheet);
        if (!q) { box.innerHTML = `<p class="s">try jun or lina</p>`; return; }
        if (!extras.length) { box.innerHTML = `<p class="s">couldn't find @${esc(q)}</p>`; return; }
        box.innerHTML = extras.map(id => {
          const p = PEOPLE[id];
          const already = state.squad.indexOf(id) >= 0;
          return `<div class="friend-add">
            ${avatar(id)}
            <div class="col" style="flex:1"><strong>${esc(p.name)}</strong><div class="vibe">${esc(p.bio)}</div></div>
            ${already ? `<span class="s">friends</span>` : `<button type="button" class="btn sm green" data-add="${id}">Add</button>`}
          </div>`;
        }).join("");
        $$("[data-add]", sheet).forEach(b => b.addEventListener("click", () => {
          const id = b.dataset.add;
          if (state.squad.indexOf(id) === -1) state.squad.push(id);
          save(); closeAllOverlays(); toast(PEOPLE[id].name + " added"); renderSquad();
        }));
      };
      un.addEventListener("input", paint);
      paint();
    }});
  }
  function openTell() {
    const handle = (state.user && state.user.handle) || "you";
    openOverlay({ title: "tell", build: sheet => {
      sheetChrome(sheet, "Tell a Friend", `
        <p style="font-size:15px;line-height:1.45">get mango. i'm @${esc(handle)} — mango · share vividly</p>
        <button type="button" class="btn green" id="copyInv">Copy invite</button>
      `);
      $("#copyInv", sheet).addEventListener("click", () => {
        const t = "get mango — i'm @" + handle;
        if (navigator.clipboard) navigator.clipboard.writeText(t).catch(function(){});
        toast("copied"); closeAllOverlays();
      });
    }});
  }
  function openInfo(id) {
    const p = person(id);
    openOverlay({ title: "info", build: sheet => {
      sheetChrome(sheet, p.name, `
        <div style="display:grid;place-items:center;margin-bottom:12px">${avatar(id)}</div>
        <div class="settings-row"><div class="col">${esc(p.name)}<span>@${esc(p.handle)}</span></div></div>
        <div class="settings-row"><div class="col">${esc(p.bio||"")}<span>bio</span></div></div>
        <button type="button" class="btn gray" id="msgBtn">Message</button>
        <button type="button" class="ghost-btn" id="rmBtn">Remove friend</button>
      `);
      $("#msgBtn", sheet).addEventListener("click", () => { closeAllOverlays(); go("chat", { chatId: id }); });
      $("#rmBtn", sheet).addEventListener("click", () => {
        state.squad = state.squad.filter(x => x !== id);
        save(); closeAllOverlays(); go("squad");
      });
    }});
  }
  function openSettings() {
    const u = state.user || { name: "you", handle: "you", color: "#E8896A" };
    openOverlay({ full: true, title: "settings", build: sheet => {
      sheetChrome(sheet, "Settings", `
        <div style="display:grid;place-items:center;margin-bottom:12px">${avatar("you")}</div>
        <label class="s">name</label>
        <input class="field" id="setName" value="${esc(u.name)}" style="margin:6px 0 10px" />
        <label class="s">handle</label>
        <input class="field" id="setHandle" value="${esc(u.handle)}" style="margin:6px 0 10px" />
        <label class="s">bio</label>
        <input class="field" id="setBio" value="${esc(state.settings.bio||"")}" maxlength="80" style="margin:6px 0 10px" />
        <div class="s">wallpaper</div>
        <div class="wp-picks">
          ${[["cream","#FAF7F5"],["sunset","#f3e6dc"],["mint","#e4eee8"],["lavender","#ece6f0"],["photo","#c9b8a8"]].map(pair =>
            `<button type="button" data-w="${pair[0]}" class="${(state.settings.wallpaper||"cream")===pair[0]?"on":""}" style="background:${pair[1]}"></button>`
          ).join("")}
        </div>
        <button type="button" class="settings-row" id="autoBtn"><div class="col">Auto-accept requests<span>skip the handshake</span></div><div class="toggle ${state.settings.autoAccept?"on":""}"><i></i></div></button>
        <button type="button" class="settings-row" id="dotsBtn"><div class="col">Replace green dots<span>unread becomes a star</span></div><div class="toggle ${state.settings.replaceDots?"on":""}"><i></i></div></button>
        <button type="button" class="btn gray" id="chatsBtn" style="margin-top:8px">Chats</button>
        <button type="button" class="ghost-btn" id="resetBtn">Reset Mango</button>
      `);
      const saveUser = () => {
        state.user.name = $("#setName", sheet).value.trim() || state.user.name;
        state.user.handle = handleFrom($("#setHandle", sheet).value);
        state.settings.bio = $("#setBio", sheet).value;
        save();
      };
      $("#setName", sheet).addEventListener("change", saveUser);
      $("#setHandle", sheet).addEventListener("change", saveUser);
      $("#setBio", sheet).addEventListener("change", saveUser);
      $$(".wp-picks button", sheet).forEach(b => b.addEventListener("click", () => {
        state.settings.wallpaper = b.dataset.w; save();
        $$(".wp-picks button", sheet).forEach(x => x.classList.toggle("on", x===b));
      }));
      $("#autoBtn", sheet).addEventListener("click", () => {
        state.settings.autoAccept = !state.settings.autoAccept; save();
        $(".toggle", $("#autoBtn", sheet)).classList.toggle("on", state.settings.autoAccept);
      });
      $("#dotsBtn", sheet).addEventListener("click", () => {
        state.settings.replaceDots = !state.settings.replaceDots; save();
        $(".toggle", $("#dotsBtn", sheet)).classList.toggle("on", state.settings.replaceDots);
      });
      $("#chatsBtn", sheet).addEventListener("click", () => { closeAllOverlays(); go("chats"); });
      $("#resetBtn", sheet).addEventListener("click", () => {
        localStorage.removeItem(KEY);
        localStorage.removeItem(LEGACY_KEY);
        state = defaultState();
        closeAllOverlays();
        go("splash");
      });
    }});
  }

  function renderActivity() {
    const items = (state.activities || []).slice().sort((a,b)=>b.ts-a.ts);
    appEl().innerHTML = `<section class="screen fade-in act-screen">
      <div class="space-head white">
        <button type="button" class="icon-btn" id="backBtn">${ICONS.back}</button>
        <h2 class="act-title">Activity</h2>
        <span style="width:36px"></span>
      </div>
      <div class="scroll" id="actScroll"></div>
    </section>`;
    const root = $("#actScroll");
    root.innerHTML = items.map(a => {
      const who = person(a.from);
      const post = findPost(a.postId);
      let desc = "";
      let thumb = "";
      let kind = "";
      if (a.type === "heart") { desc = "liked your post"; kind = postKind(post); thumb = thumbFor(post); }
      else if (a.type === "comment") { desc = a.text; kind = postKind(post); thumb = thumbFor(post); }
      else if (a.type === "mention") { desc = a.text; kind = "Mention"; }
      else if (a.type === "action") {
        const act = ACTIONS.find(x => x.id === a.action);
        desc = (act ? act.emoji + " " : "") + who.handle + " " + (act ? act.past : a.action) + " you";
      }
      const canReply = a.type === "comment" || a.type === "action" || a.type === "mention";
      const open = view.replyAct === a.id;
      return `<div class="act-item">
        ${avatar(a.from, "sm")}
        <div class="body">
          <div class="nm">${esc(who.name)}<span class="t">${rel(a.ts)}</span></div>
          <div class="desc">${esc(desc)}</div>
          ${thumb ? `<div class="act-thumb-row">${thumb}<span class="act-kind">${esc(kind)}</span></div>` : ""}
          ${canReply && !open ? `<button type="button" class="reply-pill" data-reply="${a.id}">REPLY ${ICONS.reply}</button>` : ""}
          ${open ? `<form class="reply-box" data-rid="${a.id}"><input placeholder="say something nice" /><button class="btn sm green" type="submit">send</button></form>` : ""}
          ${(a.replies||[]).map(r=>`<div class="comment"><b>you</b>${esc(r.text)}</div>`).join("")}
        </div>
      </div>`;
    }).join("") || `<div class="empty-space">nothing yet</div>`;
    $("#backBtn").addEventListener("click", () => go("squad"));
    $$("[data-reply]").forEach(b => b.addEventListener("click", () => { view.replyAct = b.dataset.reply; renderActivity(); }));
    $$("[data-rid]").forEach(f => f.addEventListener("submit", e => {
      e.preventDefault();
      const text = $("input", f).value.trim();
      if (!text) return;
      const a = state.activities.find(x => x.id === f.dataset.rid);
      if (!a.replies) a.replies = [];
      a.replies.push({ text, ts: Date.now() });
      view.replyAct = null; save(); renderActivity();
    }));
  }
  function findPost(id) {
    if (!id) return null;
    for (const k of Object.keys(state.posts)) {
      const p = (state.posts[k] || []).find(x => x.id === id);
      if (p) return p;
    }
    return null;
  }
  function postKind(p) {
    if (!p) return "";
    if (p.type === "shout") return "Shout";
    if (p.type === "gif" || p.type === "caption") return "Gif";
    if (p.type === "draw") return "Draw";
    if (p.type === "goodmorning") return "Shout";
    return p.type.charAt(0).toUpperCase() + p.type.slice(1);
  }
  function thumbFor(p) {
    if (!p) return "";
    if (p.type === "shout") {
      const f = (p.data.frames && p.data.frames[0]) || p.data;
      return `<div class="act-thumb sh" style="background:${f.bg}">${esc((f.text||"").slice(0,8))}</div>`;
    }
    if (p.type === "gif" || p.type === "caption") return `<div class="act-thumb"><img src="${esc(p.data.url)}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>`;
    if (p.type === "goodmorning") return `<div class="act-thumb" style="background:#F4A06A">gm</div>`;
    return `<div class="act-thumb" style="background:#ddd;color:#555">${esc(glyph(p))}</div>`;
  }

  function renderChats() {
    const ids = Object.keys(state.chats);
    appEl().innerHTML = `<section class="screen fade-in">
      <div class="space-head white">
        <button type="button" class="icon-btn" id="backBtn">${ICONS.back}</button>
        <h2 class="act-title">Chats</h2>
        <span style="width:36px"></span>
      </div>
      <div class="scroll" style="background:#fff">${ids.map(id => {
        const msgs = state.chats[id] || [];
        const last = msgs[msgs.length-1];
        return `<button type="button" class="inbox-row" data-id="${id}">
          ${avatar(id)}<div class="meta" style="flex:1;min-width:0"><div style="font-weight:700">${esc(person(id).name)}</div>
          <div class="s" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(last ? previewText(last) : "")}</div></div>
          <span class="when">${last?rel(last.ts):""}</span></button>`;
      }).join("") || `<div class="empty-space">no chats yet</div>`}</div>
    </section>`;
    $("#backBtn").addEventListener("click", () => go("squad"));
    $$("[data-id]").forEach(b => b.addEventListener("click", () => go("chat", { chatId: b.dataset.id })));
  }

  function renderChat(id) {
    const p = person(id);
    const online = state.online.indexOf(id) >= 0;
    const msgs = state.chats[id] || [];
    appEl().innerHTML = `<section class="screen push-in">
      <div class="space-head white">
        <button type="button" class="icon-btn" id="backBtn">${ICONS.back}</button>
        <div class="who" style="flex:1;text-align:center">
          <strong>${esc(p.name)}</strong>
          <span>@${esc(p.handle)} · ${online ? `<span class="here-now">here now</span>` : "offline"}</span>
        </div>
        <button type="button" class="icon-btn" id="moreBtn">${ICONS.more}</button>
      </div>
      <div class="scroll chat-thread" id="thread">${msgs.map(m => chatMsg(m)).join("")}</div>
      <div class="chat-dock">
        <textarea class="composer-text" id="composer" rows="1" placeholder="Message"></textarea>
        <div class="composer-tools">
          <button type="button" class="icon-btn cam-ico" id="camBtn">${ICONS.cam}</button>
          <button type="button" class="icon-btn" id="stickerBtn">${ICONS.sticker}</button>
          <button type="button" class="icon-btn" id="wandBtn">${ICONS.wand}</button>
          <span class="sp"></span>
          <button type="button" class="btn sm ghost-post" id="sendBtn" disabled>Send</button>
        </div>
      </div>
    </section>`;
    $("#backBtn").addEventListener("click", () => slideBack("space", { person: id }));
    $("#moreBtn").addEventListener("click", () => openInfo(id));
    composeTo = { kind: "chat", id };
    const input = $("#composer");
    const send = $("#sendBtn");
    input.addEventListener("input", () => {
      send.disabled = !input.value.trim();
      send.className = input.value.trim() ? "btn sm green" : "btn sm ghost-post";
    });
    const sendText = () => {
      const text = input.value.trim();
      if (!text) return;
      const exact = MAGIC.find(m => m.word === text.toLowerCase());
      if (exact) { openTool(exact.word); return; }
      publish({ type: "text", data: { text } });
    };
    send.addEventListener("click", sendText);
    input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } });
    $("#camBtn").addEventListener("click", openCamera);
    $("#wandBtn").addEventListener("click", openWand);
    $("#stickerBtn").addEventListener("click", () => {
      const stickers = ["🙌🍕🍕🍕", "👋", "💯", "😭", "🔥", "🍑"];
      openOverlay({ title: "sticker", build: sheet => {
        sheetChrome(sheet, "stickers", `<div style="display:flex;flex-wrap:wrap;gap:10px;font-size:40px">${stickers.map((s,i)=>
          `<button type="button" data-s="${i}" style="padding:8px">${s}</button>`).join("")}</div>`);
        $$("[data-s]", sheet).forEach(b => b.addEventListener("click", () => publish({ type: "sticker", data: { text: stickers[+b.dataset.s] } })));
      }});
    });
    const th = $("#thread");
    th.scrollTop = th.scrollHeight;
    bindShoutAnims();
  }
  function chatMsg(m) {
    const who = person(m.from);
    let body = "";
    if (m.type === "text") body = esc(m.data.text);
    else if (m.type === "sticker") body = `<div class="chat-sticker">${esc(m.data.text)}</div>`;
    else body = postInner(m);
    const t = new Date(m.ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return `<div class="chat-row">${avatar(m.from,"sm")}<div class="bubble">
      <div class="chat-name">${esc(who.handle)}<span class="t">${esc(t)}</span></div>
      <div class="chat-body">${body}</div>
    </div></div>`;
  }

  function toast(msg) {
    let t = $("#toastEl", $("#device"));
    if (!t) {
      t = document.createElement("div");
      t.id = "toastEl"; t.className = "toast";
      $("#device").appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._to);
    t._to = setTimeout(() => t.classList.remove("show"), 1500);
  }
  function floatEmoji(emoji, fromEl) {
    const f = document.createElement("div");
    f.className = "floater"; f.textContent = emoji;
    const device = $("#device");
    const dr = device.getBoundingClientRect();
    const r = fromEl.getBoundingClientRect();
    f.style.left = (r.left + r.width/2 - dr.left) + "px";
    f.style.top = (r.top - dr.top) + "px";
    device.appendChild(f);
    setTimeout(() => f.remove(), 850);
  }

  load();
  if (state.user) go("squad");
  else go("splash");
})();
