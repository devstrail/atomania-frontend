import dayjs from 'dayjs';

export const formatDateForBackend = (date) => {
    date = new Date(date);
    // Extracting year, month, and day components from the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    // Concatenating components with dashes to form Y-m-d format
    return `${year}-${month}-${day}`;
}

export const formatDateForTableData = (date) => {
    return `${dayjs(date).format(`ddd DD MMM, YYYY`)} at ${dayjs(date).format(`hh:mm a`)}`
}

export const formatDateRangeForFrontend = (date) => {
    let formattedStartDay = `${dayjs(date[0]).format(`ddd, D MMM, YYYY`)}`,
        formattedEndDay = `${dayjs(date[1]).format(`ddd, D MMM, YYYY`)}`

    return `${formattedStartDay} - ${formattedEndDay}`;
}