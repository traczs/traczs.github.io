import React from 'react';

import Card from '../components/Card';

import github from "../assets/images/github.png";
import linkedin from "../assets/images/linkedin.png";
import cloud from "../assets/images/cloud.png";
import { Container, Row } from 'react-bootstrap';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: 0,
                    title: 'github',
                    subTitle: 'see all my projects',
                    imgSrc: github,
                    link: 'https://github.com/traczs',
                    selected: false
                },
                {
                    id: 1,
                    title: 'LinkedIn',
                    subTitle: 'connect with me',
                    imgSrc: linkedin,
                    link: 'https://www.linkedin.com/in/samuel-tracz/',
                    selected: false
                },
                {
                    id: 2,
                    title: 'Cloud scripts',
                    subTitle: 'Azure and AWS scripts on github',
                    imgSrc: cloud,
                    link: 'https://github.com/traczs/cloud-vms',
                    selected: false
                }
            ]
        }
    }

    handleCardClick = (id) => {
        let items = [...this.state.items];

        items[id].selected = items[id].selected ? false : true;

        items.forEach(item => {
            if (item.id !== id) {
                item.selected = false;
            }
        });

        this.setState({
            items
        });
    }

    makeItems = (items) => {
        return items.map(item => {
            return <Card item={item} click={(e => this.handleCardClick(item.id, e))} key={item.id} />
        })
    }

    render() {
        return(
            <Container fluid={true}>
                <Row className="justify-content-around">
                    {this.makeItems(this.state.items)}
                </Row>
            </Container>
        );
    }
}

export default Carousel;