import React, { useState } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
    Table,
    Input,
    Button,
} from 'reactstrap';
import PlayerComparision from './PlayerComparision';

const compareDivStyle = {
    'position': 'fixed',
    'top': '0px',
    'paddingTop': '5px',
    'width': '100%',
    'background': 'white'
}

const GET_ALL_PLAYERS = gql`
  query getAllPlayers {
    crickets {
      _id
      name
      stats {
        t20 {
          batting {
            matches
          }
        }
        oneDay {
          batting {
            matches
          }
        }
        test {
          batting {
            matches
          }
        }
      }
    }
  }
`;

function PlayerListing() {
    const onSelectPlayer = (event) => {
        if (event && event.target && event.target.id) {
            if (event.target.checked) {
                if (selectedPlayerIds.indexOf(event.target.id) === -1) {
                    setSelectedPlayerIds([...selectedPlayerIds, event.target.id]);
                }
            }
            else {
                let indexOfId = selectedPlayerIds.indexOf(event.target.id);
                if (indexOfId !== -1) {
                    selectedPlayerIds.splice(indexOfId, 1);
                }
                setSelectedPlayerIds([...selectedPlayerIds]);
            }
        }
    }
    const toggleCompareModal = () => {
        setShowModal(!showModal);
    }

    const resetSelection = () => {
        if (selectedPlayerIds && selectedPlayerIds.length > 0) {
            selectedPlayerIds.forEach(function (id) {
                document.getElementById(id).checked = false;
            });
        }
        setSelectedPlayerIds([]);
        setShowModal(false);
    }

    const { loading, error, data } = useQuery(GET_ALL_PLAYERS);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            {loading && <div>loading</div>}
            {error && <div>{`encountered an error: ${error}`}</div>}
            {data &&
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>t20 (Matches)</th>
                            <th>One Day (Matches)</th>
                            <th>Test (Matches)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.crickets.map(player => (
                            <tr id={'row_' + player._id} key={player._id}>
                                <td>
                                    <Input id={player._id} type="checkbox" onClick={onSelectPlayer} disabled={selectedPlayerIds.length > 1} />
                                </td>
                                <td>
                                    {player.name}
                                </td>
                                <td>
                                    {player.stats.t20.batting.matches}
                                </td>
                                <td>
                                    {player.stats.oneDay.batting.matches}
                                </td>
                                <td>
                                    {player.stats.test.batting.matches}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            {selectedPlayerIds.length > 1
                ?
                <div style={compareDivStyle}>
                    <Button onClick={toggleCompareModal} color="primary">
                        {'Compare'}
                    </Button>
                    <Button onClick={resetSelection} color="link">
                        {'Dismiss'}
                    </Button>
                </div>
                :
                ''}
            {showModal ? <PlayerComparision selectedPlayerIds={selectedPlayerIds} /> : ''}
        </div>
    );
}

export default PlayerListing;