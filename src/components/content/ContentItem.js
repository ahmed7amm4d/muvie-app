import React, { useState } from "react";

import classes from './ContentItem.module.css';
import { img_300, unavailable } from '../../config/imgConfig';
import ModalContent from "./modal/ModalContent";

const ContentItem = (props) => {
    const [modalIsShown, setModalIsShown] = useState(false);

    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const showModalHandler = () => {
        setModalIsShown(true);
    };

    //Date Format
    let date = new Date(props.date);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    //Type Format
    let type = props.mediaType;
    if (type === 'tv') {
        type = 'TV Show';
    } else if (type === 'movie') {
        type = 'Movie';
    } else {
        type = '';
    }

    //Language Format
    let language = props.language;
    switch(language) {
        case 'en':
            language = 'English';
            break;
        case 'ko':
            language = 'Korean';
            break;
        case 'fr':
            language = 'French';
            break;
        case 'nl':
            language = 'Dutch';
            break;
        case 'es':
            language = 'Spanish';
            break;
        case 'pl':
            language = 'Polish';
            break;
        case 'ja':
            language = 'Japanese';
            break;
        case 'de':
            language = 'German';
            break;
        case 'no':
            language = 'Norwegian';
            break;
        case 'pt':
            language = 'Portuguese';
            break;
        case 'tr':
            language = 'Turkish';
            break;
        case 'ru':
            language = 'Russian';
            break;
        case 'zh':
            language = 'Chinese';
            break;
        case 'cn':
            language = 'Chinese';
            break;
        case 'da':
            language = 'Danish';
            break;
        case 'hi':
            language = 'Hindi';
            break;
        case 'el':
            language = 'Greek';
            break;
        case 'sv':
            language = 'Swedish';
            break;
        case 'tl':
            language = 'Tagalog';
            break;
        case 'ar':
            language = 'Arabic';
            break;
        case 'te':
            language = 'Tegulu';
            break;
        case 'sk':
            language = 'Slovak';
            break;
        case 'th':
            language = 'Thai';
            break;
        case 'is':
            language = 'Icelandic';
            break;
        case 'ca':
            language = 'Catalan';
            break;
        case 'ms':
            language = 'Malay';
            break;
        case 'kn':
            language = 'Kannada';
            break;
        case 'he':
            language = 'Hebrew';
            break;
        case 'am':
            language = 'Amharic';
            break;
        case 'ur':
            language = "Urdu";
            break;
        case 'gu':
            language = "Gujarati";
            break;
        case 'sl':
            language = "Slovenian";
            break;
        case 'fa':
            language = "Persian";
            break;
        case 'hu':
            language = "Hungarian";
            break;
        default:
            language = props.language;
    }

    return (
        <React.Fragment>
            {modalIsShown && <ModalContent onClose={hideModalHandler} mediaType={props.mediaType} id={props.id} />}
            <div className={classes.card} onClick={showModalHandler}>
                <div className={classes.poster}>
                    <img className={classes.poster} src={props.poster ? `${img_300}/${props.poster}` : unavailable} alt={props.title} />
                </div>
                <span className={classes.title}>{props.title}</span>
                <span className={classes.badge}>Rating: {props.rating? props.rating : "Not Rated"}</span>
                <span className={classes.badge}>Language: {language}</span>
                <div className={classes.subtitle}>
                    <span>{day+'/' + month + '/'+year}</span>
                    <span className={type === '' ? classes.notype : classes.type}>{type}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ContentItem; 