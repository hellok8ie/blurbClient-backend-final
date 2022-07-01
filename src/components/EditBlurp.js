import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlurpContext from '../contexts/BlurpContext';
import UserContext from '../contexts/UserContext';


const EditBlurp = () => {

    let {id} = useParams();
    let navigate = useNavigate();
    let { getBlurp, editBlurp } = useContext(BlurpContext);
    let { user } = useContext(UserContext);

    let [editedBlurp, setEditedBlurp] = useState({
        blurp: "",
        user: user.userId
    })

    useEffect(() => {
        async function fetchData() {
            await getBlurp(id)
            .then((blurp) => setEditedBlurp(blurp))
        }
        fetchData()
    }, [getBlurp, id]);

    function handleChange (event) {
        setEditedBlurp((preValue) => {
            return {...preValue, [event.target.name]: event.target.value}
        })
    };

    function handleSubmit (event) {
        event.preventDefault()
        editBlurp(editedBlurp).then(() => {
            navigate('/');
            alert('Blurp updated!');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <div>
        <h1>Edit Blurp</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <textarea id='blurpInput' placeholder="New Blurp" type="text" name="blurp" value={editedBlurp.blurp} onChange={handleChange} />
                <br></br><br></br>
                <button id='blurpBtn'>Update!</button>
            </form>
        </div>

    )
};

export default EditBlurp;