import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "./Modal";
import classes from './ModalContent.module.css';
import { img_500, unavailable, unavailableLandscape } from "../../../config/imgConfig";
import { AiOutlineYoutube } from "react-icons/ai";
import { Button } from "@material-ui/core";
import Carousel from "./Carousel";
import { IoClose } from "react-icons/io5";

const ModalContent = (props) => {
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState();

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${props.mediaType}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${props.mediaType}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    const timeConvert = (n) => {
        let num = n;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return rhours + " Hr " + rminutes + " Min";
    };

    let date = new Date(content.first_air_date || content.release_date);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    switch (month) {
        case 1: 
            month = 'January';
            break;
        case 2: 
            month = 'February';
            break;
        case 3: 
            month = 'March';
            break;
        case 4: 
            month = 'April';
            break;
        case 5: 
            month = 'May';
            break;
        case 6: 
            month = 'June';
            break;
        case 7: 
            month = 'July';
            break;
        case 8: 
            month = 'August';
            break;
        case 9: 
            month = 'September';
            break;
        case 10: 
            month = 'October';
            break;
        case 11: 
            month = 'November';
            break;
        case 12: 
            month = 'December';
            break;
        default:
            break;
    }

    return (
        <React.Fragment>
            {content && (
            <Modal onClose={props.onClose}>
                <div className={classes['modal-container']}>
                    <IoClose className={classes.close} onClick={props.onClose} />
                    <img className={classes['portrait-image']} src={content.poster_path? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />
                    <img className={classes['landscape-image']} src={content.backdrop_path? `${img_500}/${content.backdrop_path}` : unavailableLandscape} 
                    alt={content.name || content.title} />
                    <div className={classes['modal-about']}>
                        <span className={classes.title}>{content.name || content.title}</span>
                        <span>{content.tagline && (<i className={classes.tagline}>{content.tagline}</i>)}</span>
                        <div className={classes.labels}>
                            <div className={classes.group}>
                                <span className={classes.label}>Release Date</span>
                                <span className={classes.info}>{month + ' ' + day + ', '+year}</span>
                            </div>
                            <div className={classes.group}>
                                <span className={classes.label}>{content.runtime? "Running Time" : "Number of Seasons"}</span>
                                <span className={classes.info}>{content.runtime? timeConvert(content.runtime) : content.number_of_seasons}</span>
                            </div>
                            <div className={classes.group}>
                                <span className={classes.label}>Genres</span>
                                <span className={classes.info}>{content.genres? content.genres.map((item, index) => content.genres[index+1] ? item['name']  + ' / ' : item['name']) : "N/A"}</span>
                            </div>
                        </div>
                        <span className={classes.description}>{content.overview}</span>
                        <div className={classes.carousel}>
                            <Carousel mediaType={props.mediaType} id={props.id} />
                        </div>
                        <Button variant="contained" startIcon={<AiOutlineYoutube />} target="_blank" href={`https://www.youtube.com/watch?v=${video}`} 
                        style={{backgroundColor: '#f9002b', color: 'white'}} className={classes.trailer}>
                            Watch the Trailer
                        </Button>
                    </div>
                </div>
            </Modal>
            )}
        </React.Fragment>
    );
};

export default ModalContent;