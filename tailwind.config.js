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