'use client';
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var github_1 = require("./ui/icons/github");
var linkedin_1 = require("./ui/icons/linkedin");
var about_me_card_1 = require("./ui/about-me-card");
var resume_downlaod_1 = require("./resume-downlaod");
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
function HeroSection() {
    return (React.createElement(framer_motion_1.AnimatePresence, null,
        React.createElement(framer_motion_1.motion.section, { initial: "hidden", animate: "visible", id: 'about', "aria-label": 'About Tochukwu Nwosa.', className: " pb-5 pt-40 lg:px-14 overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b !from-foreground/90 !to-foreground/97 dark:!from-background/90  dark:!to-background/97" }),
            React.createElement("main", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row space-y-20 lg:space-y-0 lg:justify-between" },
                React.createElement(framer_motion_1.motion.div, { className: "relative flex flex-col items-center lg:items-start space-y-5", variants: fadeUp, custom: 1 },
                    React.createElement(framer_motion_1.motion.h1, { className: "hero-title text-center lg:text-left text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold", variants: fadeUp, custom: 1 }, "Tochukwu Nwosa"),
                    React.createElement(framer_motion_1.motion.span, { className: 'dark:text-foreground/70 text-center lg:text-left text-xl sm:text-2xl tracking-[0.015em] pl-4', variants: fadeUp, custom: 2 }, "Full-stack Developer"),
                    React.createElement(framer_motion_1.motion.div, { className: "dark:text-foreground/70 text-center lg:text-left text-base sm:text-lg max-w-2xl sm:mx-0 pl-4", variants: fadeUp, custom: 3 },
                        "Currently building",
                        React.createElement(framer_motion_1.motion.a, { href: "https://claimmate.vercel.app", target: "_blank", rel: "noreferrer noopener", whileHover: { scale: 1.03 }, whileTap: { scale: 0.95 }, className: "underline text-blue-500 mx-1 inline-block " }, "ClaimMate")),
                    React.createElement(framer_motion_1.motion.div, { className: 'grid grid-cols-2 gap-5 w-fit', variants: fadeUp, custom: 4 },
                        React.createElement(framer_motion_1.motion.a, { href: "https://www.github.com/obere4u", target: "_blank", rel: "noopener noreferrer", className: 'flex items-center justify-center cursor-pointer size-12 bg-foreground text-background dark:bg-background dark:text-foreground rounded-full shadow-lg dark:shadow-sm shadow-foreground', whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } },
                            React.createElement(github_1.GithubIcon, null)),
                        React.createElement(framer_motion_1.motion.a, { href: "https://www.linkedin.com/in/nwosa-tochukwu", target: "_blank", rel: "noopener noreferrer", className: 'flex items-center justify-center cursor-pointer size-12 bg-foreground text-background dark:bg-background dark:text-foreground rounded-full shadow-lg dark:shadow-sm shadow-foreground', whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } },
                            React.createElement(linkedin_1.LinkedinIcon, null)))),
                React.createElement(framer_motion_1.motion.div, { className: 'lg:flex-1 lg:ml-10' },
                    React.createElement(framer_motion_1.motion.div, { variants: fadeUp, custom: 5, className: 'w-full' },
                        React.createElement(about_me_card_1["default"], null)),
                    React.createElement(framer_motion_1.motion.div, { variants: fadeUp, custom: 6 },
                        React.createElement(resume_downlaod_1["default"], null)))))));
}
exports["default"] = HeroSection;
