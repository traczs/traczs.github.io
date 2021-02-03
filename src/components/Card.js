import React from 'react';
import CardInfo from './CardInfo';

function Card(props) {
    return(
        <div className="d-inline-block s-card" onMouseEnter={(e) => props.click(props.item)} onMouseLeave={(e) => props.click(props.item)}>
            <a href = {props.item.link}>
                <img className="s-card-image" src={props.item.imgSrc} alt={props.item.imgSrc} />
            </a>
            <CardInfo title={props.item.title} subTitle={props.item.subTitle} link={props.item.link} selected={props.item.selected}/>
        </div>
    );
}

export default Card;