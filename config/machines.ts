export const machines = [
    {
        id: 1,
        name: 'Herbicide Spraying Machine',
        thumbnail: '/images/machines/machine-image-1.jpg',
        cost: 360,
        cost_unit: 'Hectare',
        type: 'Tractors',
        available_unit: 1,
        address: 'Richis',
        description: 'High-efficiency herbicide sprayer with adjustable nozzles for precise application. Suitable for large-scale farming operations.',
        configurations: [
            { key: 'horsepower', value: 150 },
            { key: 'transmission_type', value: 'Automatic' },
            { key: 'fuel_type', value: 'Diesel' },
        ],
        author: {
            id: 1,
            name: 'Sunny Aveiro',
            avatar: '/images/avatar.png'
        },
    },
    {
        id: 2,
        name: 'Combine Harvester',
        thumbnail: '/images/machines/machine-image-2.jpg',
        cost: 500,
        cost_unit: 'Hectare',
        type: 'Harvesters',
        available_unit: 2,
        address: 'Meadowbrook',
        description: 'State-of-the-art combine harvester with advanced grain separation technology. Ideal for wheat, corn, and soybean harvesting.',
        configurations: [
            { key: 'horsepower', value: 490 },
            { key: 'transmission_type', value: 'Hydrostatic' },
            { key: 'fuel_type', value: 'Diesel' },
        ],
        author: {
            id: 2,
            name: 'Emma Thompson',
            avatar: '/images/avatar.png'
        },
    },
    {
        id: 3,
        name: 'Precision Seeder',
        thumbnail: '/images/machines/machine-image-3.jpg',
        cost: 250,
        cost_unit: 'Hectare',
        type: 'Planters',
        available_unit: 3,
        address: 'Greenfield',
        description: 'GPS-guided precision seeder for optimal seed placement and spacing. Features adjustable row spacing and depth control.',
        configurations: [
            { key: 'horsepower', value: 120 },
            { key: 'transmission_type', value: 'CVT' },
            { key: 'fuel_type', value: 'Diesel' },
        ],
        author: {
            id: 3,
            name: 'Marcus Chen',
            avatar: '/images/avatar.png'
        },
    },
    {
        id: 4,
        name: 'Rotary Tiller',
        thumbnail: '/images/machines/machine-image-4.jpg',
        cost: 180,
        cost_unit: 'Hectare',
        type: 'Cultivators',
        available_unit: 5,
        address: 'Sunnyvale',
        description: 'Heavy-duty rotary tiller for soil preparation. Efficiently breaks up soil clods and incorporates crop residue.',
        configurations: [
            { key: 'horsepower', value: 75 },
            { key: 'transmission_type', value: 'Manual' },
            { key: 'fuel_type', value: 'Gasoline' },
        ],
        author: {
            id: 4,
            name: 'Olivia Martinez',
            avatar: '/images/avatar.png'
        },
    },
    {
        id: 5,
        name: 'Center Pivot Irrigation System',
        thumbnail: '/images/machines/machine-image-5.jpg',
        cost: 15,
        cost_unit: 'Hectare',
        type: 'Irrigation',
        available_unit: 1,
        address: 'Drylands',
        description: 'Efficient center pivot irrigation system with remote monitoring and control. Covers large circular areas with uniform water distribution.',
        configurations: [
            { key: 'horsepower', value: 50 },
            { key: 'transmission_type', value: 'Electric' },
            { key: 'fuel_type', value: 'Electric' },
        ],
        author: {
            id: 5,
            name: 'Ahmed Al-Fayed',
            avatar: '/images/avatar.png'
        },
    },
    {
        id: 6,
        name: 'Potato Harvester',
        thumbnail: '/images/machines/machine-image-6.jpg',
        cost: 420,
        cost_unit: 'Hectare',
        type: 'Harvesters',
        available_unit: 2,
        address: 'Spudville',
        description: 'Specialized potato harvester with advanced sorting capabilities. Gently lifts and cleans potatoes while minimizing damage.',
        configurations: [
            { key: 'horsepower', value: 200 },
            { key: 'transmission_type', value: 'Hydrostatic' },
            { key: 'fuel_type', value: 'Diesel' },
        ],
        author: {
            id: 6,
            name: 'Isabella Rossi',
            avatar: '/images/avatar.png'
        },
    },
]