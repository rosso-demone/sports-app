import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

function PlayerComparision(props) {
    console.log(props.selectedPlayerIds);
    const GET_PLAYER1_RECORD = gql`
        query getAllPlayers {
            cricket(query: {_id:"${props.selectedPlayerIds[0]}"}) {
            _id
            name
            stats {
                t20 {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
                oneDay {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
                test {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
            }
            }
        }`;
    const {
        loading: loading1,
        error: error1,
        data: data1
    } = useQuery(GET_PLAYER1_RECORD);
    const GET_PLAYER2_RECORD = gql`
        query getAllPlayers {
            cricket(query: {_id:"${props.selectedPlayerIds[1]}"}) {
            _id
            name
            stats {
                t20 {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
                oneDay {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
                test {
                    batting {
                        matches
                        innings
                        fifties
                        hundreds
                        fours
                        sixes
                    }
                    bowling {
                        matches
                        wickets
                        runs
                        five_wickets
                    }
                }
            }
            }
        }`;
    const {
        loading: loading2,
        error: error2,
        data: data2
    } = useQuery(GET_PLAYER2_RECORD);
    const toggleCompareModal = () => {
        setShowModal(false);
    }
    const [showModal, setShowModal] = useState(true);
    return (
        <Modal isOpen={showModal} toggle={toggleCompareModal}>
            <ModalHeader toggle={toggleCompareModal}>Comparision</ModalHeader>
            <ModalBody>
                {(loading1 && loading2) && <div>loading</div>}
                {(error1 && error2) && <div>{`Something went wrong`}</div>}
                {
                    (data1 && data2) &&
                    <Table>
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>{data1.cricket.name}</th>
                                <th>{data2.cricket.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={3}><b>T 20 (Batting)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.t20.batting.matches}</td>
                                <td>{data2.cricket.stats.t20.batting.matches}</td>
                            </tr>
                            <tr>
                                <td>Fifties</td>
                                <td>{data1.cricket.stats.t20.batting.fifties}</td>
                                <td>{data2.cricket.stats.t20.batting.fifties}</td>
                            </tr>
                            <tr>
                                <td>Hundreds</td>
                                <td>{data1.cricket.stats.t20.batting.hundreds}</td>
                                <td>{data2.cricket.stats.t20.batting.hundreds}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>T-20 (Bowling)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.t20.bowling.matches}</td>
                                <td>{data2.cricket.stats.t20.bowling.matches}</td>
                            </tr>
                            <tr>
                                <td>Wickets</td>
                                <td>{data1.cricket.stats.t20.bowling.wickets}</td>
                                <td>{data2.cricket.stats.t20.bowling.wickets}</td>
                            </tr>
                            <tr>
                                <td>5 wickets</td>
                                <td>{data1.cricket.stats.t20.bowling.five_wickets}</td>
                                <td>{data2.cricket.stats.t20.bowling.five_wickets}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>One-Day (Batting)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.oneDay.batting.matches}</td>
                                <td>{data2.cricket.stats.oneDay.batting.matches}</td>
                            </tr>
                            <tr>
                                <td>Fifties</td>
                                <td>{data1.cricket.stats.oneDay.batting.fifties}</td>
                                <td>{data2.cricket.stats.oneDay.batting.fifties}</td>
                            </tr>
                            <tr>
                                <td>Hundreds</td>
                                <td>{data1.cricket.stats.oneDay.batting.hundreds}</td>
                                <td>{data2.cricket.stats.oneDay.batting.hundreds}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>One-Day (Bowling)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.oneDay.bowling.matches}</td>
                                <td>{data2.cricket.stats.oneDay.bowling.matches}</td>
                            </tr>
                            <tr>
                                <td>Wickets</td>
                                <td>{data1.cricket.stats.oneDay.bowling.wickets}</td>
                                <td>{data2.cricket.stats.oneDay.bowling.wickets}</td>
                            </tr>
                            <tr>
                                <td>5 wickets</td>
                                <td>{data1.cricket.stats.oneDay.bowling.five_wickets}</td>
                                <td>{data2.cricket.stats.oneDay.bowling.five_wickets}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>Test (Batting)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.test.batting.matches}</td>
                                <td>{data2.cricket.stats.test.batting.matches}</td>
                            </tr>
                            <tr>
                                <td>Fifties</td>
                                <td>{data1.cricket.stats.test.batting.fifties}</td>
                                <td>{data2.cricket.stats.test.batting.fifties}</td>
                            </tr>
                            <tr>
                                <td>Hundreds</td>
                                <td>{data1.cricket.stats.test.batting.hundreds}</td>
                                <td>{data2.cricket.stats.test.batting.hundreds}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}><b>Test (Bowling)</b></td>
                            </tr>
                            <tr>
                                <td>Matches</td>
                                <td>{data1.cricket.stats.test.bowling.matches}</td>
                                <td>{data2.cricket.stats.test.bowling.matches}</td>
                            </tr>
                            <tr>
                                <td>Wickets</td>
                                <td>{data1.cricket.stats.test.bowling.wickets}</td>
                                <td>{data2.cricket.stats.test.bowling.wickets}</td>
                            </tr>
                            <tr>
                                <td>5 wickets</td>
                                <td>{data1.cricket.stats.test.bowling.five_wickets}</td>
                                <td>{data2.cricket.stats.test.bowling.five_wickets}</td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleCompareModal}>Ok</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PlayerComparision;