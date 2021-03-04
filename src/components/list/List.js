import P from 'prop-types';
import {useState} from 'react';
import Card from '../card/Cards';

List.propTypes = {
    list: P.object.isRequired,
    handleDeleteList: P.func.isRequired
};

export default function List({list, handleDeleteList}) {
    const [listName, setListName] = useState(list?.name);
    const [cardName, setCardName] = useState('');
    const [editListOpen, setEditListOpen] = useState(false);
    const [addCardOpen, setAddCardOpen] = useState(false);
    const [currentCards, setCurrentCards] = useState(list?.cards ? list?.cards : []);

    const handleEdit = () => {
        if (listName) {
            setEditListOpen(!editListOpen);
            list.name = listName;
        }
    }

    const handleAddCard = () => {
        setAddCardOpen((!addCardOpen));
    }

    const handleSubmitCard = () => {
        if (cardName) {
            currentCards.push({
                id: new Date(),
                name: cardName
            });
            setCardName(() => '');
            setAddCardOpen(() => !addCardOpen);
        }
    }

    const handleDeleteCard = (card) => {
        let index = currentCards.indexOf(card);
        if (index !== -1) {
            currentCards.splice(index, 1);
            setCurrentCards(() => ([...currentCards]));
        }
    }

    const handleClose = () => {
        setCardName(() => '');
        setAddCardOpen(() => !addCardOpen);
    }

    const renderCards = () => {
        const cardElements = [];
        currentCards.forEach(card => {
            cardElements.push(<Card key={card?.id} card={card} handleDeleteCard={handleDeleteCard}/>);
        })
        return cardElements;
    }

    return (
        <div className="list edit">
            {!editListOpen && <h4 onClick={() => setEditListOpen(!editListOpen)}>{listName}</h4>}
            {
                editListOpen &&
                <input type='text' value={listName} onChange={event => setListName(event.target.value)}
                       onBlur={handleEdit}/>
            }
            <span onClick={() => handleDeleteList(list)}>X</span>
            {currentCards.length > 0 && renderCards()}
            {addCardOpen &&
            <div className="card-create">
                <input type='text' placeholder='Enter card title...' value={cardName}
                       onChange={event => setCardName(event.target.value)}/>
                <button onClick={handleSubmitCard}>Add Card</button>
                <button className='secondary' onClick={handleClose}>X</button>
            </div>
            }
            {!addCardOpen && <div className="add-card" onClick={handleAddCard}>+ Add a card</div>}
        </div>
    )
}