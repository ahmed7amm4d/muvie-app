import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../../config/imgConfig';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = (props) => {
    const [actors, setActors] = useState([]); 

    const fetchActors = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${props.mediaType}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setActors(data.cast);
    };

    const items = actors.map((actor) => (
        <div className="carouselItem">
          <img src={actor.profile_path ? `${img_300}/${actor.profile_path}` : noPicture} alt={actor?.name} onDragStart={handleDragStart} className="carouselItem__img" />
          <span className="carouselItem__txt">{actor?.name}</span>
        </div>
    ));
    
    useEffect(() => {
        fetchActors();
        // eslint-disable-next-line
    }, []);

    const responsive = {
        0: {
          items: 3,
        },
        900: {
          items: 3,
        },
        1024: {
          items: 8,
        },
      };
    
    return (
        <AliceCarousel responsive={responsive} infinite disableButtonsControls disableDotsControls mouseTracking items={items} />
    );
};

export default Carousel;