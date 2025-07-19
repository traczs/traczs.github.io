import profileImg from "./assets/images/linkedin.png";

const logotext = "ST";
const meta = {
    title: "Samuel Tracz",
    description: "I'm Samuel, a software engineer who likes to try new things.",
};

const introdata = {
    title: "Hi, I'm Samuel. I work on:",
    animated: [
        "Cybersecurity",
        "Cyber Threat Intelligence",
        "DevOps",
        "Testing",
        "Cloud Technologies",
        "Software Engineering",
        "Full-Stack Development",
    ],
    description: "Always Learning, Always Building",
    your_img_url: profileImg,
};

const dataabout = {
    title: "Who am I?",
    aboutme:
        "Currently advancing my expertise with a Master's in Cybersecurity and Threat Intelligence at the University of Guelph, building on a solid foundation from my Computer Science undergrad. I'm driven by a passion for the ever-evolving tech landscape and enjoy gaining experience across diverse domains of software engineering. Outside of academics, I recharge by connecting with friends and spending time outdoors.",
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
        name: "Malware Development",
    },

    {
        name: "Malware Analysis",
    },

    {
        name: "Vulnerability Scanning",
    },

    {
        name: "Attack Vectors",
    },

    {
        name: "Privacy",
    },

    {
        name: "Machine Learning",
    },

    {
        name: "Artificial Intelligence",
    },

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
        name: "Azure / GCP / AWS cloud environments",
    },
];

const dataportfolio = [
    {
        img: "https://picsum.photos/seed/0/400/300?grayscale",
        description: "ML-Based APT Group Classification Using Opcode Analysis",
        id: "",
        modalContent: {
            type: "markdown",
            src: "opcodes.md", //loaded from public/markdown/
            title: "APT Group Opcode Classification",
        },
        externalLink:
            "https://github.com/ColdenLeng/MCTI_6530_Group_Assignment",
    },
    {
        img: "https://picsum.photos/seed/1/400/400?grayscale",
        description:
            "An Examination of Public Knowledge and Perceptions Regarding Privacy",
        modalContent: {
            type: "pdf",
            src: "privacy_survey.pdf", //loaded from public/pdf/
            title: "Privacy Survey",
        },
        id: "",
    },
    {
        img: "https://picsum.photos/seed/2/400/350?grayscale",
        description:
            "Comaprative Analysis on Deepfake detection tools and their respective papers",
        modalContent: {
            type: "pdf",
            src: "deepfake_forensics.pdf", //loaded from public/pdf/
            title: "Deepfake Detection Tool Comparison",
        },
        id: "",
    },
    {
        img: "https://picsum.photos/seed/2/400/350?grayscale",
        description: "Simple Malware Writeup",
        modalContent: {
            type: "pdf",
            src: "simple_malware.pdf", //loaded from public/pdf/
            title: "Simple Malware",
        },
        id: "",
    },

    // {
    //     img: "https://picsum.photos/seed/3/350/400?grayscale",
    //     description: "Machine Learning food predictor",
    //     modalContent: {
    //         type: "component",
    //         componentName: "FoodPredict",
    //         title: "Machine Learning Food Predictor In-Depth",
    //     },
    //     id: "foodPredict",
    // },
    {
        img: "https://picsum.photos/seed/4/400/500?grayscale",
        description: "The Wiki Game - written in Clojure",
        modalContent: {
            type: "markdown",
            src: "clojure-wiki-game.md", // loaded from public/markdown/clojure-wiki-game.md
            title: "About the Clojure Wiki Game",
        },
        externalLink: "https://github.com/traczs/Clojure-Wiki-Game",
    },
    {
        img: "https://picsum.photos/seed/5/400/400?grayscale",
        description: "DevOps scripts for VM creation",
        modalContent: {
            type: "markdown",
            src: "devops.md",
            title: "DevOps VM Scripts",
        },
        externalLink: "https://github.com/traczs/cloud-vms",
    },
    {
        img: "https://picsum.photos/seed/6/400/600?grayscale",
        description: "Some discrete math written in C",
        modalContent: {
            type: "markdown",
            src: "discrete_math.md",
            title: "Discrete Math in C - View on GitHub",
        },
        externalLink: "https://github.com/traczs/discrete-math-theory",
    },
    {
        img: "https://picsum.photos/seed/7/400/350?grayscale",
        description: "Writeup for CTF challenge 'collision' on pwnable.kr",
        modalContent: {
            type: "pdf",
            src: "ctf_collision.pdf", //loaded from public/pdf/
            title: "Hash Collision CTF Writeup",
        },
    },
    {
        img: "https://picsum.photos/seed/8/400/450?grayscale",
        description:
            "Writeup for crackme challenge 'Simple Crackme' on crackmes.one",
        modalContent: {
            type: "pdf",
            src: "crackme_simple_crackme.pdf", //loaded from public/pdf/
            title: "Simple Crackme Writeup",
        },
    },
    {
        img: "https://picsum.photos/seed/8/400/450?grayscale",
        description:
            "Writeup for crackme challenge 'without fantasy' on crackmes.one",
        modalContent: {
            type: "pdf",
            src: "crackme_without_fantasy.pdf", //loaded from public/pdf/
            title: "Without Fantasy Crackme Writeup",
        },
    },
    {
        img: "https://picsum.photos/seed/9/400/450?grayscale",
        description: "Writeup for TryHackMe CTF 'Industrial Intrustion'",
        modalContent: {
            type: "pdf",
            src: "THM_Industrial_Intrusion_CTF.pdf", //loaded from public/pdf/
            title: "THM 'Industrial Intrusion' CTF",
        },
    },
    {
        img: "https://picsum.photos/seed/10/400/450?grayscale",
        description:
            "Writeup for crackme challenge 'SecureSoftware v1.5' on crackmes.one",
        modalContent: {
            type: "pdf",
            src: "SecureSoftware_v1_5.pdf", //loaded from public/pdf/
            title: "Cracking SecureSoftwarev1.5",
        },
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
