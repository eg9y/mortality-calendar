import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs'
import * as weekOfYear from 'dayjs/plugin/weekOfYear'
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import Box from "../components/Box";

dayjs.extend(weekOfYear)
dayjs().format()

const generatePhaseColor = (phases, birthDate) => {
    let calendarBlocks = Array(phases[0][0].diff(birthDate, "week")).fill({ color: "none" });
    let last = null;

    phases.forEach((phase, index) => {
        if (!phase) {
            return;
        }

        let phaseLength = phase[1].diff(phase[0], "week");

        let nextEmptyBlocksLength = 0;

        if (phases.length > index + 1 && (phases[index + 1] !== undefined && phases[index + 1] !== null)) {
            console.log('phases[index + 1]', phases[index + 1]);
            nextEmptyBlocksLength = phase[1].diff(phases[index + 1][0], "week");
        }

        calendarBlocks = [
            ...calendarBlocks,
            ...Array(phaseLength).fill({ color: 'blue' }),
            ...Array(nextEmptyBlocksLength).fill({ color: 'none', }),
        ];

        last = index;
    });

    const lastPhase = birthDate.add(81, 'year').diff(phases[last][1], "week")
    calendarBlocks = [...calendarBlocks, ...Array(lastPhase).fill({ color: 'none', })]

    let finalCalendarBlocks = []
    for (let i = 0; i < calendarBlocks.length; i += 52) {
        finalCalendarBlocks.push(calendarBlocks.slice(i, i + 52));
    }

    console.log('len(calendarBlocks)', calendarBlocks.length);
    console.log('finalCalendarBlocks', finalCalendarBlocks);

    return finalCalendarBlocks;
}

/*
    ASSUMPTIONS:
    - phase happens earlier than next phase
    - phases don't intersect
*/

function Calendar(props) {
    const { fields, form } = props;

    const [age, setAge] = useState(18);
    const [birthDate, setBirthDate] = useState(dayjs('1998-08-09'));
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
        } else if (newPhase && newPhase.length > 0 && newPhase[0] !== undefined) {
            setPhases(newPhase);

            setCalendar(generatePhaseColor(newPhase, birthDate));
            // generatePhaseColor(newPhase, birthDate)

        } else if (newPhase && (newPhase.length === 0 || newPhase[0] === undefined || newPhase[0] === null)) {
            setPhases(newPhase);
            setCalendar(Array(82).fill(Array(52).fill({ color: "none" })));
            console.log('deleted everything');
        } else {
            console.log('all values', form.getFieldsValue());
        }
    }, [birthDate, fields, form]);

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
