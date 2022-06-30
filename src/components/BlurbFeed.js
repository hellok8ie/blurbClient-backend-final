import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import BlurpContext from '../contexts/BlurpContext';
import UserContext from '../contexts/UserContext';

const BlurbFeed = () => {

    let { user } = useContext(UserContext);
    let {newBlurp, deleteBlurp} = useContext(BlurpContext);
    let navigate = useNavigate();

    let [ newBlurpPost, setNewBlurpPost] = useState({
        blurp: "",
        userId: user.userId
    });

    function handleChange(event) {
        setNewBlurpPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        // event.preventDefault();
        newBlurp(newBlurpPost).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    function handleDelete(id) {

        deleteBlurp(id).then(() => {
            alert('Blurp Gone!')
            navigate('/')
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <BlurpContext.Consumer>
        {
            ({ blurps }) => {

                return <>
                    <h1>Blurb Feed</h1>
                        {user.userId && 
                            <form onSubmit={handleSubmit}>
                                <textarea placeholder="New Blurp" type="text" name="blurp" value={newBlurpPost.blurp} onChange={handleChange} />
                                <br></br><br></br>
                                <button>Blurp!</button>
                            </form>
                        } 
                        <br></br>
                        {blurps.map((b) => {
                            return (
                                <>
                                <Card border="warning" style={{ width: '18rem' }} key={b.blurpId}>
                                    <Card.Body>
                                    <Card.Text>
                                        {b.blurp}
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        {user && user.userId === b.userId && <Link to={`/edit/${b.blurpId}`}>Edit</Link>}
                                        {user && user.userId === b.userId && <Button onClick={handleDelete.bind(this, b.blurpId)}>Delete</Button>}
                                        <Link to={`/profile/${b.User.userId}`}>{b.User.username}</Link>{', '}
                                        {(b.updatedAt)}
                                    </Card.Footer>
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