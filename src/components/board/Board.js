import P from 'prop-types';
import List from '../list/List';
import Create from '../list/Create';
import {useState} from 'react';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

Board.propTypes = {
    board: P.object.isRequired
};

export default function Board({board}) {
    const {lists} = board;
    const [createListOpen, setCreateListOpen] = useState(false);
    const [currentList, setCurrentList] = useState(lists ? lists : []);
    const [menuOpen, setMenuOpen] = useState(false);

    const renderLists = () => {
        const listElements = [];
        currentList.forEach(list => {
            listElements.push(<List key={list?.id} list={list} handleDeleteList={handleDeleteList}/>);
        })
        return listElements;
    }
    const handleAddList = () => {
        setCreateListOpen(!createListOpen);
    }

    const handleCreateList = (name) => {
        if (name) currentList.push({id: new Date(), name, cards: []});
        setCreateListOpen(!createListOpen);
    }

    const handleDeleteList = (list) => {
        let index = currentList.indexOf(list);
        if (index !== -1) {
            currentList.splice(index, 1);
            setCurrentList(() => ([...currentList]));
        }
    }

    const handleMenuToggle = () => {
        setMenuOpen(() => !menuOpen);
    }

    return (
        <>
            <h3>Current Board: {board?.name}
                <button className='menu' onClick={handleMenuToggle}>Show Menu</button>
                <Slider
                    title='Board Menu'
                    footer={
                        <div style={{padding: '15px'}}>
                            <a href='#' onClick={handleMenuToggle}>Close Menu</a>
                        </div>
                    }
                    isOpen={menuOpen}
                    onOutsideClick={handleMenuToggle}>
                    <div style={{padding: '15px'}}>
                        <h3>Some Menu content</h3>
                    </div>
                </Slider>
            </h3>
            <div className="list-container">
                {currentList.length > 0 && renderLists()}
                {!createListOpen && <div className="list add-list" onClick={handleAddList}>+ Add another list</div>}
                {createListOpen && <Create handleCreateList={handleCreateList}/>}
            </div>
        </>
    )
}