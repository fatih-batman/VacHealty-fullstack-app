import {DateRangePicker} from "rsuite";
import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {eventService} from "../../firebase/services/event.service";
import {useSelector} from "react-redux";
import {checkinService} from "../../firebase/services/checkin.service";

const EventList = (props) => {
    const [interval, setInterval] = useState('current');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [range, setRange] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [events, setEvents] = useState([]);
    const user = useSelector(state => state.auth.user)

    const onClickInterval = (clickedInterval) => {
        setSelectedEvent(null);
        setInterval(clickedInterval);
    };

    const rangeChanged = (val) => {
        if (!val || (val && val.length !== 2)) {
            setRange(undefined);
            setInterval('current');
            return;
        }
        setRange([val[1], val[0]]);
        setInterval('custom');
    };

    useEffect(() => {
        loadEventList();
    }, [interval, range]);

    useEffect(() => {
        if (props.funcVoucher) props.funcVoucher(selectedEvent);
    }, [selectedEvent]);

    useEffect(() => {
            //setCheckIns(checkIns);
            if (props.funcCheckIn) {
                handle();
            }
    }, [selectedEvent, interval, range]);

    async function handle() {
        const checkIns = await checkinService.findCheckinByVenueId(user.venues[0].venueID, {
            interval,
            range,
            selectedEvent
        }).then((value) => {
            props.funcCheckIn(value);
        })
    }

    const loadEventList = useCallback(() => {
        const handle = async () => {
            const items = (await eventService.getEventList(user.venues[0].venueID, {
                interval,
                range,
                search: searchInput
            })).map(item => {
                return {
                    ...item,
                    date: (new Date(item.date.seconds * 1000).toISOString()),
                    dateEnd: (new Date(item.dateEnd.seconds * 1000).toISOString()),
                }
            });
            console.log("events",items);
            setEvents(items);
            setSearchInput('');
            if (interval === 'current') {
                setSelectedEvent(items[0]?.id);
            }
        };
        handle();
    }, [interval, range, searchInput, selectedEvent]);

    const onSearch = () => {
        loadEventList();
    };

    return (
        <div className="card removeBoxShadow">
            <div className="card-header">
                <div className="row mx-0">
                    <div className="col-md-4 col-12">
                        <div className="eventList-title">Event List</div>
                    </div>
                    <div className="col-md-8 col-12 text-right">
                        <div className="btn-group event-list-buttons">
                            <button type="button"
                                    className={`btn ${interval === 'current' ? 'activeEventList' : ''}`}
                                    onClick={() => onClickInterval('current')}>
                                Current Event
                            </button>
                            <button type="button"
                                    className={`btn ${interval === 'week' ? 'activeEventList' : ''}`}
                                    onClick={() => onClickInterval('week')}>
                                1 Week
                            </button>
                            <button type="button"
                                    className={`btn ${interval === 'month' ? 'activeEventList' : ''}`}
                                    onClick={() => onClickInterval('month')}>
                                1 Month
                            </button>
                            <button type="button"
                                    className={`btn ${interval === 'year' ? 'activeEventList' : ''}`}
                                    onClick={() => onClickInterval('year')}>
                                1 Year
                            </button>
                            <button type="button"
                                    className={`btn ${interval === 'custom' ? 'activeEventList' : ''}`}
                                    onClick={() => onClickInterval('custom')}>
                                Custom
                            </button>
                            <DateRangePicker placement={"leftStart"} style={{zIndex: 900}}
                                             onChange={val => rangeChanged(val)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body table-responsive p-0" style={{height:220 , overflowX: "hidden", overflowY: "scroll"}}>
                <table className="table table-head-fixed text-nowrap">
                    <thead>
                    <tr>
                        <th className="eventList-table" >Name
                            { /*   <div className="input-group input-group-sm">
                                <input type="text" name="table_search" id="searchInput"
                                       className="form-control float-right"
                                       onChange={e => setSearchInput(e.target.value)}
                                       placeholder="Search"/>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-default"
                                            onClick={() => onSearch()}>
                                        Search
                                    </button>
                                </div>
                            </div>*/}
                        </th>
                        <th className="eventList-table">Date Start</th>
                        <th className="eventList-table">Date End</th>
                        <th className="eventList-table">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="event-list">
                    {events.map(event => (
                        <tr id="eventlist" key={event.id}
                            style={{
                                backgroundColor: selectedEvent === event.id ? '#EBE6ED' : undefined,
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedEvent(event.id)}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.dateEnd}</td>
                            <td>
                                <Link
                                    href={{
                                        pathname: '/dashboard/edit-event',
                                        query: {data: event ? JSON.stringify(event) : null}
                                    }}>
                                    <a className="btn btn-event-edit w-65">Edit</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        )
};

export default EventList;
