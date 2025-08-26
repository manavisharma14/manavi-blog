    // app/ui/fonts.ts
    import localFont from 'next/font/local';

    export const myCustomFont = localFont({
      src: '../../../public/fonts/font.ttf',
      display: 'swap', // or 'auto', 'block', 'fallback', 'optional'
      weight: '400',
      style: 'normal',
    });