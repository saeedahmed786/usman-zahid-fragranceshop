import moment from 'moment'

export const formatDate = (date) => {
    let format = moment(date).format("MMMM DD, YYYY")
    return format;
}
