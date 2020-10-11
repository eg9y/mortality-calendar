import React from 'react';
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'

import { Row, Col } from 'antd';

import Box from "../components/Box";

dayjs.extend(weekOfYear)
dayjs().format()

function Calendar() {
    const fullDate = dayjs();
    const birthDate = dayjs('1998-08-09')

    const birthYear = birthDate.year();
    const birthMonth = birthDate.month() + 1;

    const birthDayThisYear = birthDate.add(fullDate.year() - birthYear, 'year');
    const age = fullDate.year() - birthYear;
    return (
        <>
            <Row justify="space-around" style={{
                marginLeft: '45px'
            }}>
                {
                    [
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                    ].map((month, monthNumber) => {
                        return <Col span={24} flex={1}>
                            {
                                (() => {
                                    if (month === "Aug") {
                                        return <h3 style={{
                                            gridColumnStart: 2,
                                            gridColumnEnd: 5,
                                            marginBottom: 0,
                                        }}>{month}</h3>
                                    } else if (month === "Jul") {
                                        return <h3 style={{
                                            gridColumnStart: 46,
                                            gridColumnEnd: 50,
                                            marginBottom: 0,
                                        }}>{month}</h3>
                                    }
                                    return <h3 style={{
                                        gridColumnStart: monthNumber * 4 + 2,
                                        gridColumnEnd: monthNumber * 4 + 6,
                                        marginBottom: 0,
                                    }}>{month}</h3>
                                })()
                            }
                        </Col>
                    })
                }
            </Row>
            <div id="calendar-grid">
                {
                    Array(82).fill(0).map((_, year) => {
                        let displayAge = year;
                        return (
                            [
                                <p style={{ fontSize: '8px' }}>{birthYear + displayAge}</p>,
                                <p>{displayAge - 9 > 0 ? displayAge : `0${displayAge}`}</p>,
                                ...Array(52).fill(0).map((_, week) => {
                                    if (year < age) {
                                        if (year === 0 && week < Math.floor(birthDate.date() / 7)) {
                                            return <Box key={week} date={week + 1} past={true} backgroundColor="#434343"></Box>
                                        }

                                        // already passed
                                        return <Box key={week} date={week + 1} past={true} backgroundColor="#874d00"></Box>
                                    }
                                    // future
                                    else {
                                        if (age === year && week < (fullDate.week() - dayjs(`${fullDate.year()}-${birthMonth}-1`).week())) {
                                            return <Box key={week} date={1 + week} past={true} backgroundColor="#874d00"></Box>
                                        }
                                        return <Box key={week} date={week + 1} past={true} backgroundColor="#7cb305"></Box>
                                    }
                                })
                            ]
                        )
                    })

                }
            </div>
        </>
    );
}

export default Calendar;
