
import React, { useEffect, useState } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar'


export function Analytics() {
    const [pomodoro, setPomodoro] = useState([])
    async function verifyPomodoros(token) {
        const collec = await fetch("/user/analytics", {
            method: "GET",
            headers: {
                "authorization": `a ${localStorage.getItem('token')}`
            }
        });
        const res = await collec.json();
        setPomodoro(res);
    }

    useEffect(() => {
        verifyPomodoros()
    }, [])

    if (!pomodoro) {
        return null
    }

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return <div>
        <h1>Analytics</h1>
        <div>
            <ResponsiveTimeRange
                data={pomodoro}
                from={new Date(new Date().valueOf() - 86400000 * 90)}
                to={formatDate(String(new Date(new Date().valueOf() + 86400000)).slice(0, 15))}

                direction='vertical'
                emptyColor="#eeeeee"
                colors={["#eeeeee", '#00FFFF', '#00EFFF', '#00CBFF', '#00B8FF', '#008CFF']}
                margin={{ top: -75, right: 0, bottom: -24, left: 0 }}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                weekdayTicks={[]}
            // legends={[
            //     {
            //         anchor: 'right',
            //         direction: 'column',
            //         justify: true,
            //         itemCount: 4,
            //         itemWidth: 42,
            //         itemHeight: 36,
            //         itemsSpacing: 14,
            //         itemDirection: 'left-to-right',
            //         translateX: -60,
            //         translateY: -60,
            //         symbolSize: 20
            //     }
            // ]}
            />
        </div>
    </div>
}

export default Analytics;