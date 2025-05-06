'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var experiencesData_1 = require("../constants/experiencesData");
var experience_card_1 = require("./ui/experience-card");
var fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: function (i) {
        if (i === void 0) { i = 1; }
        return ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
        });
    }
};
var containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};
function ProfessionalExperience() {
    var sectionRef = react_1.useRef(null);
    var isInView = framer_motion_1.useInView(sectionRef, { once: true, margin: '-100px' });
    return (React.createElement(framer_motion_1.motion.section, { ref: sectionRef, initial: "hidden", animate: isInView ? "visible" : "hidden", id: "experience", "aria-label": "Tochukwu Nwosa's experience.", className: "snap-start relative py-24 bg-transparent" },
        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b !from-foreground/98 !to-foreground/98 dark:!from-background/80 dark:!to-background/90" }),
        React.createElement("main", { className: 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' },
            React.createElement("div", { className: " text-center mb-20" },
                React.createElement(framer_motion_1.motion.h2, { variants: fadeUp, custom: 1, className: "font-display text-4xl md:text-5xl font-medium tracking-tight text-primary-900 mb-4" }, "Professional Experience"),
                React.createElement(framer_motion_1.motion.p, { variants: fadeUp, custom: 2, className: "font-sans text-lg md:text-xl font-normal text-primary-600 tracking-normal leading-relaxed max-w-2xl mx-auto" }, "My journey in the industry")),
            React.createElement("div", { className: 'relative' },
                React.createElement(framer_motion_1.motion.div, { variants: fadeUp, custom: 3, className: "absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-foreground/30 transform md:-translate-x-px\r\n             before:content-[''] before:absolute before:top-0 before:w-full before:h-8 before:bg-gradient-to-b before:from-background before:to-transparent\r\n             after:content-[''] after:absolute after:bottom-0 after:w-full after:h-8 after:bg-gradient-to-t after:from-background after:to-transparent" }),
                React.createElement(framer_motion_1.motion.div, { variants: containerVariants, initial: "hidden", animate: isInView ? "visible" : "hidden" }, experiencesData_1.experiencesData.map(function (exp, idx) {
                    var isLeft = exp.align === "left";
                    var cardPosition = isLeft
                        ? "md:mr-[calc(50%+2rem)]"
                        : "md:ml-[calc(50%+2rem)]";
                    var circlePosition = isLeft
                        ? "right-0 translate-x-[calc(100%+1rem+5px)]"
                        : "left-0 -translate-x-[calc(100%+1rem+6px)]";
                    return (React.createElement(experience_card_1["default"], { key: idx, exp: exp, cardPosition: cardPosition, circlePosition: circlePosition }));
                }))))));
}
exports["default"] = ProfessionalExperience;
