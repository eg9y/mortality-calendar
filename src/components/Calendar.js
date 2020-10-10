import React from 'react';
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'

import Box from "../components/Box";

dayjs.extend(weekOfYear)
dayjs().format()

function Calendar() {
    const fullDate = dayjs();
    const birthDate = dayjs('1998-08-09')

    const birthYear = birthDate.year();
    const birthDayThisYear = birthDate.add(fullDate.year() - birthYear, 'year');
    const age = fullDate.year() - birthYear;
    return (
        <div id="calendar-grid">
            {/* <div className="grid grid-cols-2 w-full">
                <div className="">
                    <p><strong>Y-axis:</strong>age</p>
                    <p><strong>X-axis:</strong>week of year</p>
                    <p>
                        <span><strong>Date:</strong></span> {fullDate.format('DD/MM/YYYY')}
                    </p>
                </div>
                <div>
                    <div className="grid grid-cols-2" style={{
                        gridTemplateColumns: "auto 1fr",
                        gridColumnGap: "1px",
                        gridRowGap: "5px",
                    }}>
                        <Box past={false} className=" bg-gray-300" />
                        <div>: before born</div>
                        <Box past={false} className=" bg-gray-500" />
                        <div>: lived</div>
                        <Box past={false} className="bg-none border-solid border-2 border-gray-800" />
                        <div>: future</div>
                    </div>
                </div>
            </div> */}
            {
                [
                    // ...[
                    //     "Jan",
                    //     "Feb",
                    //     "Mar",
                    //     "Apr",
                    //     "May",
                    //     "Jun",
                    //     "Jul",
                    //     "Aug",
                    //     "Sep",
                    //     "Oct",
                    //     "Nov",
                    //     "Dec",
                    // ].map((month, monthNumber) => {
                    //     if (month === "Jan") {
                    //         return <h3 style={{
                    //             gridColumnStart: 2,
                    //             gridColumnEnd: 5,
                    //         }}>{month}</h3>
                    //     } else if (month === "Dec") {
                    //         return <h3 style={{
                    //             gridColumnStart: 46,
                    //             gridColumnEnd: 50,
                    //         }}>{month}</h3>
                    //     }
                    //     return <h3 style={{
                    //         gridColumnStart: monthNumber * 4 + 2,
                    //     }}>{month}</h3>
                    // }),
                    ...Array(30).fill(0).map((_, year) => {
                        let displayAge = year + 1;
                        if (age <= year) {
                            displayAge = year;
                        }
                        return (
                            [
                                <p>{displayAge}</p>,
                                ...Array(52).fill(0).map((_, week) => {
                                    if (year < age) {

                                        // not born yet
                                        if (year === 0 && week <= birthDate.week()) {
                                            return <Box key={week} date={week + 1} past={false} backgroundColor=" #434343"></Box>
                                        }
                                        // already passed
                                        else {
                                            return <Box key={week} date={week + 1} past={true} backgroundColor=" #874d00"></Box>
                                        }
                                    }
                                    // future
                                    else {
                                        return <Box key={week} date={week + 1} past={true} backgroundColor=" white"></Box>
                                    }
                                })
                            ]
                        )
                    })
                ]
            }
        </div>
    );
}

export default Calendar;
