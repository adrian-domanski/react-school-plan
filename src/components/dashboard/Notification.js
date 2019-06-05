import React from 'react';
import Parser from 'html-react-parser';
import moment from 'moment';

class Notification extends React.Component {
    getDay = nr => {
        switch (nr) {
            case 1: return 'Poniedziałek';
            case 2: return 'Wtorek';
            case 3: return 'Środa';
            case 4: return 'Czwartek';
            case 5: return 'Piątek';
            case 6: return 'Sobota';
            case 0: return 'Niedziela';
            default: return 'Error #404'
        }
    }

    render() {
        const { notif, id, text_date, date } = this.props;
        let format_date = document.createElement('span');
        let lessThanWeek = false
        let weekDay = null;
        let now = new Date();
        let when = date.toDate();
        when.setHours(12, 0, 0, 0)
        let difference = when - now;
        let color = '';
        if (difference < 518400000) {
            let date = moment(when);
            lessThanWeek = true;
            weekDay = this.getDay(date.day());
            if (difference < 10539801) {
                color = 'red'
                weekDay = 'DZISIAJ';
            }
            else if (difference < 106161922) {
                color = 'red'
                weekDay = 'JUTRO';
            }
            else color = 'yellow';
        }
        const inp_month = `${text_date[0]}${text_date[1]}`;
        const inp_day = `${text_date[3]}${text_date[4]}`;
        const inp_year = `${text_date[6]}${text_date[7]}${text_date[8]}${text_date[9]}`;

        format_date.innerHTML = `(<span style='color: lightgreen'>${inp_day}</span>/<span style='color: lightgreen'>${inp_month}</span>/<span style='color: lightgreen'>${inp_year}</span>)`

        return (
            <p onClick={() => this.props.handleNotifAdmin(notif)}>
                {id}. {notif.content} {<span style={{ marginLeft: '6px' }}>{!lessThanWeek ? (Parser(format_date.innerHTML)) : (<span style={{ color: color }}>{weekDay}</span>)}</span>}
            </p>
        )

    }
}

export default Notification