/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        colors: {
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'black': '#000000',
            'gray': {
                25: '#FCFCFD',
                50: '#F9FAFB',
                100: '#F2F4F7',
                200: '#EAECF0',
                300: '#D0D5DD',
                400: '#98A2B3',
                500: '#667085',
                600: '#475467',
                700: '#344054',
                800: '#1D2939',
                900: '#101828',
            },
            'primary': {
                25: '#F2F4F3',
                50: '#E9ECEB',
                100: '#D0D7D5',
                200: '#B4BFBC',
                300: '#93A5A0',
                400: '#68857D',
                500: '#015B4C',
                600: '#015345',
                700: '#014A3E',
                800: '#014036',
                900: '#01352C',
            },
            'gray-neutral': {
                25: '#FCFCFD',
                50: '#F9FAFB',
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D2D6DB',
                400: '#9DA4AE',
                500: '#6C737F',
                600: '#4D5761',
                700: '#384250',
                800: '#1F2A37',
                900: '#111927',
            },
            'wispy-white': {
                25: '#FFFAF7',
                50: '#FFF6F1',
                100: '#FFEDE2',
                200: '#FFE3D2',
                300: '#FFD9C1',
                400: '#FFCEAD',
                500: '#FFC398',
                600: '#E9B28B',
                700: '#D09F7C',
                800: '#B48A6B',
                900: '#937158',
            },
            'pale-sky': {
                25: '#F9FEFF',
                50: '#F6FDFF',
                100: '#ECFBFE',
                200: '#E2F9FE',
                300: '#D8F7FE',
                400: '#CDF5FD',
                500: '#CDF5FD',
                600: '#B0DEE7',
                700: '#9EC6CE',
                800: '#88ACB3',
                900: '#708C92',
            },
            'fuzzy-duckling': {
                25: '#FFFDF4',
                50: '#FFFCED',
                100: '#FFF8D9',
                200: '#FFF5C4',
                300: '#FFF1AC',
                400: '#FFF1AC',
                500: '#FFF1AC',
                600: '#E9D664',
                700: '#D0BF59',
                800: '#B4A54D',
                900: '#93873F',
            },
            'creamy-avocado': {
                25: '#FBFFF7',
                50: '#F8FFF2',
                100: '#F1FEE4',
                200: '#EAFED5',
                300: '#E3FDC5',
                400: '#DBFDB3',
                500: '#D3FCA0',
                600: '#C1E692',
                700: '#ACCE83',
                800: '#95B271',
                900: '#7A925C',
            },
            'royal-flycatcher-crest': {
                25: '#FEF4F2',
                50: '#FDEDE9',
                100: '#FCD8D0',
                200: '#FAC2B4',
                300: '#F8A993',
                400: '#F78C68',
                500: '#F56600',
                600: '#E05D00',
                700: '#C85300',
                800: '#AD4800',
                900: '#8E3B00',
            },
            'error': {
                25: '#FFFBFA',
                50: '#FEF3F2',
                100: '#FEE4E2',
                200: '#FECDCA',
                300: '#FDA29B',
                400: '#F97066',
                500: '#F04438',
                600: '#D92D20',
                700: '#B42318',
                800: '#912018',
                900: '#7A271A',
            },
            'warning': {
                25: '#FFFCF5',
                50: '#FFFAEB',
                100: '#FEF0C7',
                200: '#FEDF89',
                300: '#FEC84B',
                400: '#FDB022',
                500: '#F79009',
                600: '#DC6803',
                700: '#B54708',
                800: '#93370D',
                900: '#7A2E0E',
            },
            'success': {
                25: '#F6FEF9',
                50: '#ECFDF3',
                100: '#D1FADF',
                200: '#A6F4C5',
                300: '#6CE9A6',
                400: '#32D583',
                500: '#12B76A',
                600: '#039855',
                700: '#027A48',
                800: '#05603A',
                900: '#054F31',
            },
        },
        typography: () => ({
            DEFAULT: {
                css: {
                    h1: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h2: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '32px',
                        lineHeight: '50px',
                    },
                    h3: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '26px',
                        lineHeight: '38px',
                    },
                    h4: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h5: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h6: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                },
            },
            tablet: {
                css: {
                    h1: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h2: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '32px',
                        lineHeight: '50px',
                    },
                    h3: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '26px',
                        lineHeight: '38px',
                    },
                    h4: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h5: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h6: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                },
            },
            laptop: {
                css: {
                    h1: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h2: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '32px',
                        lineHeight: '50px',
                    },
                    h3: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '26px',
                        lineHeight: '38px',
                    },
                    h4: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h5: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h6: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                },
            },
            desktop: {
                css: {
                    h1: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h2: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '32px',
                        lineHeight: '50px',
                    },
                    h3: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '26px',
                        lineHeight: '38px',
                    },
                    h4: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h5: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                    h6: {
                        fontFamily: 'Figtree, sans-serif',
                        fontWeight: '600',
                        fontSize: '46px',
                        lineHeight: '70px',
                    },
                },
            },
        }),
        fontSize: {
            b1: ['40px', {lineHeight: '60px'}],
            b2: ['32px', {lineHeight: '50px'}],
            b3: ['26px', {lineHeight: '38px'}],
            b4: ['20px', {lineHeight: '30px'}],
            b5: ['18px', {lineHeight: '28px'}],
            b6: ['16px', {lineHeight: '26px'}],
            b7: ['15px', {lineHeight: '25px'}],
            b8: ['14px', {lineHeight: '24px'}],
            b9: ['13px', {lineHeight: '23px'}],
            b10: ['12px', {lineHeight: '22px'}],
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            heading: ['Figtree', 'sans-serif'],
        },
        screens: {
            tablet: '820px',
            laptop: '1024px',
            desktop: '1441px',
        },
        container: {
            center: true,
            screens: {
                tablet: '992px',
                laptop: '1232px',
                desktop: '1232px',
            },
            padding: {
                DEFAULT: '1rem',
                tablet: '1rem',
                laptop: '1rem',
                desktop: '1rem',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Figtree', 'sans-serif'],
            },
            backgroundImage: {
                'linear-gradient-1':
                    'linear-gradient(85.57deg, #A2271F 0%, #D7544B 100%)',
                'linear-gradient-2':
                    'linear-gradient(224.16deg, #505463 0%, #1F2128 100%)',
                'linear-gradient-3':
                    'linear-gradient(224.16deg, rgba(75, 81, 103, 0.5) 0%, rgba(31, 33, 40, 0.3) 100%)',
                'linear-gradient-4':
                    'linear-gradient(224.16deg, rgba(75, 81, 103, 0.99) 0%, rgba(31, 33, 40, 0.99) 100%)',
                'linear-gradient-5':
                    'linear-gradient(88.98deg, #353844 0%, #414D75 100%)',
            },
            boxShadow: {
                'elevation-1': '0px 1px 2px 0px #383E4826',
                'elevation-2': '0px 3px 8px 0px #383E481A',
                'elevation-3': '0px 4px 10px 0px #383E4814',
                'elevation-4': '0px 6px 20px 0px #383E481C',
                'elevation-5': '0px 12px 40px 0px #383E4866',
                'drop-1': '0px 16px 46px 0px #0000004D',
                'drop-2': '0px 4px 10px 0px #2F2F3633',
                'drop-3': '0px 2px 12px 0px #00000066',
                'drop-4': '0px 0px 3px 0px #3759D180',
                'drop-5': '0px 4px 30px 0px #00000066',
                'drop-6': '0px 10px 30px 0px #00000040',
                'drop-red': '0px 2px 14px 0px #CD302666',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms')
    ],
}