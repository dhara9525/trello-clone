import P from 'prop-types';
import {useState} from 'react';

Create.propTypes = {
    handleCreateList: P.func.isRequired
};
export default function Create({handleCreateList}) {
    const [listName, setListName] = useState('');

    const handleSubmit = () => {
        if (listName) {
            setListName('');
            handleCreateList(listName);
        }
    }
    const handleClose = () => {
        setListName('');
        handleCreateList(listName);
    }

    return (
        <div className="list create">
            <input type='text' placeholder='Enter list title...' value={listName}
                   onChange={event => setListName(event.target.value)}/>
            <button onClick={handleSubmit}>Add List</button>
            <button className='secondary' onClick={handleClose}>X</button>
        </div>
    )
}