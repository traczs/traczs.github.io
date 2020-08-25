import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';

function AboutPage(props) {
    return(
        <div>
            <Hero title={props.title} />

            <Content>
                <p>Hello, my name is Samuel. I'm a recent Computer Science graduate with work experience as a Software Developer, DevOps Engineer, Software Development Engineer in Testing, and CloudOps Engineer.</p>

                <p>I am constantly trying to learn new things, and this page is my React learning experience.</p>

                <p>Check out my github to see some of the projects I have worked on in a wide range of languages.</p>

                <p>When I'm not coding, I'm playing video games or enjoying the outdoors.</p>
            </Content>
        </div>
    );
}

export default AboutPage;