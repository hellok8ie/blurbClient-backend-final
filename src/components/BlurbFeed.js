import React from 'react';
import { Card } from 'react-bootstrap';
import BlurpContext from '../contexts/BlurpContext';

const BlurbFeed = () => {

    return (
        <BlurpContext.Consumer>
        {
            ({ blurp }) => {
                return <>
                    <h1>Blurb Feed</h1>
                        {blurp.map((b) => {
                            return (
                                <>
                                <Card border="warning" style={{ width: '18rem' }}>
                                    <Card.Body>
                                    <Card.Text>
                                        {b.blurp}
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>{b.updatedAt}</Card.Footer>
                                </Card>
                                <br />
                                </>
                            )
                        })}
                </>
            }
        }
        </BlurpContext.Consumer>
    )
};

export default BlurbFeed;