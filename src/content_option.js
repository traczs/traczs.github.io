import profileImg from "./assets/images/linkedin.png";

const logotext = "ST";
const meta = {
    title: "Samuel Tracz",
    description: "I'm Samuel, a software engineer who likes to try new things.",
};

const introdata = {
    title: "Hi, I'm Samuel. I work on:",
    animated: [
        "Programming",
        "DevOps",
        "Testing",
        "Cloud Technologies",
        "Software Engineering",
        "Full-Stack",
    ],
    description: "I turn coffee into code, and sometimes it even works!",
    your_img_url: profileImg,
};

const dataabout = {
    title: "Who am I?",
    aboutme:
        "I am a University of Guelph graduate who studied Computer Science. I am passionate about learning new technologies and like to dip my toes in all areas of software engineering. I like to spend my free time with friends and outdoors. This page has been made to practice and showcase my reactjs",
};
const worktimeline = [
    {
        jobtitle: "Cloud Automation Engineer",
        where: "Geotab",
        date: "2021-2023",
    },
    {
        jobtitle: "DevOps & SDET",
        where: "Camis",
        date: "2019",
    },
    {
        jobtitle: "CloudOps",
        where: "Rogers Communications",
        date: "2018",
    },
    {
        jobtitle: "Software Developer",
        where: "Inbox Marketer",
        date: "2017",
    },
];

const skills = [
    {
        name: "Python",
    },

    {
        name: "C",
    },

    {
        name: "Java",
    },

    {
        name: "Bash",
    },

    {
        name: "Powershell",
    },

    {
        name: "CI / CD",
    },

    {
        name: "JavaScript",
    },

    {
        name: "Azure / GCE / AWS",
    },
];

const dataportfolio = [
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "Machine Learning food predictor",
        id: "foodPredict",
    },
    {
        img: "https://picsum.photos/400/800/?grayscale",
        description: "The Wiki Game - written in Clojure",
        link: "https://github.com/traczs/Clojure-Wiki-Game",
    },
    {
        img: "https://picsum.photos/400/400/?grayscale",
        description: "DevOps scripts for vm creation",
        link: "https://github.com/traczs/cloud-vms",
    },
    {
        img: "https://picsum.photos/400/600/?grayscale",
        description: "Some discrete math written in C",
        link: "https://github.com/traczs/discrete-math-theory",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "Transfer your Spotify playlist to YouTube [deprecated]",
    },
];

const contactConfig = {
    YOUR_EMAIL: "test@test.com",
    description: "Looking forward to hearing from you!",
    // creat an emailjs.com account
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "SERVICE_ID",
    YOUR_TEMPLATE_ID: "TEMPLATE_ID",
    YOUR_USER_ID: "USER_ID (PUBLIC_KEY)",
};

const socialprofiles = {
    github: "https://github.com/traczs",
    linkedin: "https://linkedin.com/in/samuel-tracz",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    introdata,
    contactConfig,
    socialprofiles,
    logotext,
};
