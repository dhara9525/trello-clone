import P from 'prop-types';

Card.propTypes = {
    card: P.object.isRequired,
    handleDeleteCard: P.func.isRequired
};

export default function Card({card, handleDeleteCard}) {
    return (
        <div className="card">{card?.name}<span onClick={() => handleDeleteCard(card)}>X</span></div>
    );
}