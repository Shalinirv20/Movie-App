import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
    console.log('Movie ID:', movie.id);

    return (
        <div className="d-flex flex-wrap justify-content-around mb-3">
            <Card key={movie.id}  style={{ width: '10rem' }} className='Card mb-3'>
                <Card.Img variant="top" src={movie.img} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.genre_name}</Card.Text>
                    <Card.Text>{movie.rating}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MovieCard;
