// ============================================================
// SHARED PROJECT DATA – used by both script.js and detail.js
// ============================================================
// ============================================================
// SHARED PROJECT DATA – used by both script.js and detail.js
// ============================================================

// Add this at the top of data.js
const CONFIG = {
    substackUrl: 'https://vindara08.substack.com', // Replace with your Substack URL
    substackFeed: 'https://vindara08.substack.com/feed',
    substackName: 'Your Substack Name', // Optional
};
const projectData = [
    {
        id: 1,
        title: 'VINDARA',
        subtitle: 'An IoT-driven agritech platform combining edge-computing sensors and cloud analytics to automate resource management and empower remote farming.',
        image: 'https://drive.google.com/thumbnail?id=1XjTB3tefu948Y5n2TrXplIlMuWMbCfr9&sz=w800',
        tags: ['IoT', 'Hardware',],
        tagClasses: ['hardware', 'hardware', 'software'],
        progress: 100,
        description: 'VINDARA is an advanced agritech solution engineered to optimize modern agriculture through data-driven automation and real-time environmental insights. The system integrates low-power embedded IoT sensors with localized edge computing to monitor critical field telemetry, including soil moisture and ambient temperature. By transforming raw sensor data into actionable insights on a centralized cloud dashboard, VINDARA allows growers to transition from reactive to predictive operations. Featuring dynamic automation and global remote control capabilities, the platform enables farmers to seamlessly manage drip irrigation networks and take corrective actions from anywhere in the world.',
        features: [
            'Real-time environmental & soil telemetry',
            'Remote asset & irrigation control',
            'Centralized cloud analytics dashboard',
            'Mobile-friendly alerts & reports',
            // 'Remote asset & irrigation control',
            'Edge-processed automated field triggers'

        ],
        liveLink: 'https://drive.google.com/file/d/1LGfgXdWqKhZkscPGqpaJG8hfKnf5jaKR/view?usp=sharing',
        codeLink: '',
        liveEnabled: true,   // ← Live Demo button disabled
        codeEnabled: false,    // ← View Code button enabled
    },
    {
        id: 2,
        title: 'Collision Detection and Respond System',
        subtitle: 'An automated emergency communication system designed to pinpoint vehicle accidents and instantly alert first responders to save lives.',
        image: 'https://drive.google.com/thumbnail?id=1SeVXH8pE2OJ2TXQY6taWSegLFthtaG8_&sz=w800',
        tags: ['IoT', 'Hardware',],
        tagClasses: ['hardware', 'hardware', 'software'],
        progress: 100,
        description: 'Collision Detection and Response System is an IoT-based safety solution engineered to dramatically minimize emergency response times following a vehicle accident. Built as a proof-of-concept prototype, the system combines impact and environmental sensors with real-time location tracking. Upon detecting a crash or secondary hazard (such as a fire), the system bypasses manual reporting to immediately transmit precise GPS coordinates to the nearest hospital, fire station, and police department via automated SMS. This proactive approach ensures immediate situational awareness, significantly reducing rescue delays during the critical "golden hour.',
        features: [
            'Real-time impact & collision detection telemetry',
            'Integrated GPS pinpoint location tracking',
            'Secondary hazard & fire sensing capabilities',
            'Automated multi-agency emergency SMS alerts'
        ],
        liveLink: 'https://youtu.be/gVnbLchU59E',
        codeLink: '#',
        liveEnabled: true,   // ← Live Demo button disabled
        codeEnabled: false,    // ← View Code button enabled
    },
    {
        id: 3,
        title: 'NIVAARAN',
        subtitle: 'An automated, low-cost smart farming solution utilizing edge computing and multi-modal deterrents to protect crops from wildlife encroachment',
        image: 'https://drive.google.com/thumbnail?id=1HltqIT3Jk_ovtqNj4Tt8sCBjGD-KEjSz&sz=w800',
        tags: ['IoT', 'Hardware', 'electronic'],
        tagClasses: ['hardware', 'hardware', 'software'],
        progress: 20,
        description: 'NIVAARAN (meaning The Solution or Prevention) is an open-field agritech initiative designed to tackle one of the most persistent threats to sustainable farming: crop destruction by wildlife. Built with a focus on affordability, scalability, and high reliability, NIVAARAN serves as an automated guardian for farmland. The project bridges the gap between complex industrial automation and grassroots agricultural needs.Utilizing efficient microcontrollers(ESP32 / ESP8266) running on sustainable solar power, the system detects encroaching wildlife and deploys targeted, non - harmful acoustic and visual countermeasures.Moving beyond standard high - sensitivity radar to specialized camera module integration, NIVAARAN minimizes false positives in chaotic outdoor environments, ensuring that farmers can secure their livelihoods without expensive infrastructure or continuous manual monitoring. [woking with heartitude foundaion]',
        features: [
            'Intelligent Environmental Monitoring & Detection',
            'Solar-Powered Autonomy:',
            'Vision-Based Tracking',
            'High-Output Acoustic Output',
        ],
        liveLink: '',
        codeLink: '',
        liveEnabled: false,   // ← Live Demo button disabled
        codeEnabled: false,    // ← View Code button enabled
    },
    {
        id: 4,
        title: 'ARJUNA',
        subtitle: 'A app for focus on study without distraction in this distracted world',
        image: 'https://drive.google.com/thumbnail?id=1_TnmMs39ZFBhV0aF88rQVA0HnYNsw14k&sz=w800',
        tags: ['App', 'Software',],
        tagClasses: ['software', 'software'],
        progress: 0,
        description: 'still in not desied, working',
        features: [
            '',
        ],
        liveLink: '',
        codeLink: '',
        liveEnabled: false,   // ← Live Demo button disabled
        codeEnabled: false,    // ← View Code button enabled
    }
];