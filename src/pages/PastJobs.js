import React from 'react';
import Hero from '../components/Hero';

import tech from "../assets/images/tech.jpeg";
import rogers from "../assets/images/rogers.jpg"
import camis from "../assets/images/camis.jpeg";
import { Parallax } from 'react-parallax';

function PastJobs(props) {
    return(
        <div>
            <Hero title={props.title} />

            <h1 style={{textAlign: "center"}}>2017</h1>
            
            <Parallax bgImage={tech} strength={500}>
                <div style={{height:750}} >
                    <div className="parallax-inline-text">
                        <h2><b>Inbox Marketer</b></h2>
                        <h3>Software Developer and Helpdesk</h3>
                        
                        <p>Inbox is/was an email marketing company located in Guleph.</p>
                        <p>This was my first co-op job and it allowed me to experience an agile software development life cycle.</p>
                        <p>I strengthened my PHP, Powershell and SQL skills during my time there.</p>
                        <p>My biggest project was to arbitrarily score emails that would be sent out by the company based on the Canadian Anti Spam Legislation to ensure that the company sends out emails that are within the law.</p>
                        <p>Some other projects were:<br/>
                            -write some Google Apps scripts for Gmail<br/>
                            -decrease the security risk of the public facing domain by automating a filter to delete unwanted files
                        </p>
                        

                    </div>
                </div>
            </Parallax>

            <h1 style={{textAlign: "center"}}>2018</h1>

            <Parallax bgImage={rogers} blur={{min: -1, max: 10}}>
                <div style={{height:750}} >
                    <div className="parallax-inline-text">
                        <h2><b>Rogers Communications</b></h2>
                        <h3>CloudOps</h3>
                        
                        <p>Rogers is a Canadian communications and media company.</p>
                        <p>This co-op taught me how to work effectively between multiple teams and companies.</p>
                        <p>I had the opportunity to develop my Azure skills from Microsoft professionals whom I worked side by side with on at least a weekly basis.</p>
                        <p>Rogers also offered many different workshops related to cloud computing such as Ansible, Kubernetes, and OpenShift classes. I was lucky enough to get the permission to attend any workshop that I wanted to go to.</p>
                        <p>I was able to work alongside a Global Azure Expert to create a monitor for all the Azure VMs that Rogers was running so that they would be able to receive some metrics and adjust resources based on the information given.
                        </p>
                    </div>
                </div>
            </Parallax>

            <h1 style={{textAlign: "center"}}>2019</h1>

            <Parallax bgImage={camis} strength={-300}>
                <div style={{height:750}} >
                    <div className="parallax-inline-text">
                        <h2><b>Camis Inc</b></h2>
                        <h3>DevOps / SDET</h3>
                        
                        <p>Camis is a camping inventory system which allows people to reserve camping spots within a lot of Canadian federal, provincial and municipal parks.</p>
                        <p>This co-op allowed me to experience the impact my work has on others.</p>
                        <p>In my DevOps role I was immediately tasked with making a web app that would help the call center in providing real time information which reduced a lot of questions being directed towards the team and dirrupting them.</p>
                        <p>Soon after I learned the deployment process of the company and was able to assist other teams with their deployment needs.</p>
                        <p>I asked my manager to give me an opportunity to learn more technologies, so I was transferred over to SDET.</p>
                        <p>During my time as a software tester, I wrote some api tests and some end-to-end UI tests.</p>
                    </div>
                </div>
            </Parallax>
        </div>
    );
}

export default PastJobs;