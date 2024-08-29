export const SHEET_TYPES = [
    {id: 1, title: 'Cook/Kitchen'},
    {id: 2, title: 'Front Table'},
];

const COOK_KITCHEN_SHEET_NUMBERS = [];

const FRONT_TABLE_SHEET_NUMBERS = [
    {id: 1, value: 'Table 1'},
    {id: 2, value: 'Table 2'},
];

export const SHEET_NUMBERS = (sheetType) => {
    switch(sheetType){
        case 1:
            return COOK_KITCHEN_SHEET_NUMBERS;
            break;
        case 2:
            return FRONT_TABLE_SHEET_NUMBERS;
            break;
        default:
            return [];
            break;
    }
}

export const PLATE_SIZES = [
    {id: 1, value: '1/1'},
    {id: 2, value: '1/2'},
    {id: 3, value: '1/3'},
    {id: 4, value: '1/4'},
    {id: 5, value: '1/6'},
    {id: 6, value: '1/9'},
    {id: 7, value: '2/1'},
    {id: 8, value: '2/3'},
    {id: 9, value: '2/4'},
];

export const DEPTH_SIZES = [
    {id: 1, value: '2 inch'},
    {id: 2, value: '4 Inch'},
    {id: 3, value: '6 Inch'}
];

export const INSERT_TYPES = [
    {id: 1, value: 'Number of Bottles'},
    {id: 2, value: 'Number of Inserts'},
    {id: 3, value: 'Number of Pieces'},
    {id: 4, value: 'Number of Bags'},
];

export const UPDATE_TYPES = [
    {id: 'increment', title: '+'},
    {id: 'decrement', title: '-'},
];

export const NUMBER_OF_DAYS = [
    {id: 1, value: '1 day'},
    {id: 3, value: '3 days'},
    {id: 5, value: '5 days'},
    {id: 7, value: '1 week'},
];

export const WORKSHEET_TYPES = [
    {id: 'foh', title: 'FOH Worksheet'},
    {id: 'boh', title: 'BOH Worksheet'},
];