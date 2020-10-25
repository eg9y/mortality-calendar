import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'
import { Row, Col } from 'antd';

import Box from "../components/Box";
import { generatePhaseColor } from '../utils/generatePhaseColor'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(weekOfYear)
dayjs.extend(relativeTime)
dayjs().format()


/*
    ASSUMPTIONS:
    - phase happens earlier than next phase
    - phases don't intersect
*/

function Calendar(props) {
    const { fields, form, dynamicFields } = props;

    const [age, setAge] = useState(dayjs().diff(dayjs('1998-01-01'), 'year'));
    const [birthDate, setBirthDate] = useState(dayjs('1998-01-01'));
    const [phases, setPhases] = useState([]);
    const [calendar, setCalendar] = useState(Array(82).fill(Array(52).fill({ color: "none" })));



    const [months, setMonths] = useState([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]);

    const fullDate = dayjs();

    useEffect(() => {
        const newBirthDate = form.getFieldValue('birthDate');
        const newPhase = form.getFieldValue('phases');

        if (newBirthDate) {
            const templateMonths = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];

            const sliceToShiftRight = templateMonths.slice(0, newBirthDate.month());
            const sliceToShiftLeft = templateMonths.slice(newBirthDate.month());
            setMonths(() => [...sliceToShiftLeft, ...sliceToShiftRight]);

            setAge(() => dayjs().year() - form.getFieldValue('birthDate').year());
            setBirthDate(() => form.getFieldValue('birthDate'));

        }
        if (newPhase && newPhase.length > 0 && newPhase[0] !== undefined) {
            let sortedPhase = newPhase.map((phase, index) => {
                if (!phase) {
                    return null
                }
                return {
                    date: phase,
                    color: dynamicFields[index].color
                }
            });
            sortedPhase = sortedPhase.sort((phaseA, phaseB) => {
                return phaseA && phaseB ? phaseA.date[1].diff(phaseB.date[0]) >= 0 : 0;
            });

            setPhases(sortedPhase);
            setCalendar(generatePhaseColor(sortedPhase, birthDate));
            // generatePhaseColor(newPhase, birthDate)
        } else if (newPhase && (newPhase.length === 0 || newPhase[0] === undefined || newPhase[0] === null)) {
            setPhases(newPhase.map((phase) => ({ date: phase })));
            setCalendar(Array(82).fill(Array(52).fill({ color: "none" })));
        }
    }, [birthDate, dynamicFields, fields, form]);

    return (
        <>
            <Row justify="space-around" style={{
                marginLeft: '45px'
            }}>
                {
                    months.map((month, monthNumber) => {
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
                    calendar.map((weeks, year) => {
                        let displayAge = year;
                        return (
                            [
                                <p style={{ fontSize: '8px' }}>{birthDate.year() + displayAge}</p>,
                                <p>{displayAge - 9 > 0 ? displayAge : `0${displayAge}`}</p>,
                                weeks.map((block, weekNumber) => {
                                    if (year < age) {
                                        if (year === 0 && weekNumber < Math.floor(birthDate.date() / 7)) {
                                            return <Box key={weekNumber} date={weekNumber + 1} past={true} backgroundColor={block.color === 'none' ? "#434343" : block.color} borderColor="#434343"></Box>
                                        }

                                        // already passed
                                        return <Box key={weekNumber} date={weekNumber + 1} past={true} backgroundColor={block.color === 'none' ? "#874d00" : block.color} borderColor="#874d00"></Box>
                                    }
                                    // future
                                    else {
                                        if (age === year && weekNumber < (fullDate.week() - dayjs(`${fullDate.year()}-${birthDate.month() + 1}-1`).week())) {
                                            return <Box key={weekNumber} date={1 + weekNumber} past={true} backgroundColor={block.color === 'none' ? "#874d00" : block.color} borderColor="#874d00"></Box>
                                        }
                                        return <Box key={weekNumber} date={weekNumber + 1} past={true} backgroundColor={block.color === 'none' ? "#7cb305" : block.color} borderColor="#7cb305"></Box>
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
