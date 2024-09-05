export const machines = [
    {
        id: 1,
        name: 'Herbicide Spraying Machine',
        thumbnail: '/images/machines/machine-image-1.jpg',
        cost: 360,
        cost_unit: 'Hector',
        type: 'Tractors',
        available_unit: 1,
        address: 'Richis',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
        configurations: [
            {
                key: 'horsepower',
                value: 998
            },
            {
                key: 'fuel_type',
                value: 'Gasoline'
            },
            {
                key: 'transmission_type',
                value: 'Manual'
            },
            {
                key: 'age',
                value: 226
            }
        ],
        author: {
            id: 1,
            name: 'Sunny Aveiro',
            avatar: '/images/avatar.png'
        },
    }
]