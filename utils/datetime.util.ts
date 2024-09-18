import dayjs from 'dayjs'

export const formatDateForBackend = (date) => {
    return date ? `${dayjs(date).format(`YYYY-MM-DD`)}` : null ;
}

export const formatDateForFrontend = (date) => {
    return date ? `${dayjs(date).format(`ddd, D MMM, YYYY`)}` : null;
}

export const formatDateRangeForFrontend = (date) => {
    let formattedStartDay = `${dayjs(date[0]).format(`ddd, D MMM, YYYY`)}`,
        formattedEndDay = `${dayjs(date[1]).format(`ddd, D MMM, YYYY`)}`

    return `${formattedStartDay} - ${formattedEndDay}`;
}