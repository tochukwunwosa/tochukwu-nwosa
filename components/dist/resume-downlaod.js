'use client';
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var file_text_1 = require("./ui/icons/file-text");
function ResumeDownload() {
    var _a = react_1.useState(false), isHovered = _a[0], setIsHovered = _a[1];
    return (React.createElement(framer_motion_1.motion.div, { className: "relative lg:inline-block group mt-10 mx-auto w-fit", onHoverStart: function () { return setIsHovered(true); }, onHoverEnd: function () { return setIsHovered(false); }, initial: "rest", animate: isHovered ? 'hover' : 'rest' },
        React.createElement(framer_motion_1.motion.div, { className: "absolute inset-0 rounded-md bg-foreground opacity-20 z-0", style: { scale: 1 }, animate: {
                scale: [1, 1.4],
                opacity: [0.3, 0]
            }, transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
            } }),
        React.createElement(framer_motion_1.motion.div, { variants: {
                rest: { opacity: 0, y: 0 },
                hover: { opacity: 1, y: 2 }
            }, transition: { type: 'spring', stiffness: 200, damping: 20 }, className: "absolute inset-0 border-2 border-foreground bg-background rounded-md pointer-events-none z-0" }),
        React.createElement(framer_motion_1.motion.a, { href: "/doc/Tochukwu-Nwosa_resume.pdf", download: "Tochukwu-Nwosa_Resume.pdf", variants: {
                rest: { y: 0 },
                hover: { y: -4, x: 4 }
            }, transition: { type: 'spring', stiffness: 300, damping: 15 }, className: "relative z-10 bg-foreground text-background py-2 px-8 flex items-center justify-center gap-2 rounded-md font-medium" },
            React.createElement("span", null, "Download Resume"),
            React.createElement(file_text_1.FileTextIcon, { size: 20 }))));
}
exports["default"] = ResumeDownload;
