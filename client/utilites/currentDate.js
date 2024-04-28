import moment from 'moment'

export const currentDate = (date) => {
    let format = moment().format("MMMM DD, YYYY")
    return format;
}
