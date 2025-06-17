"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheckIcon, MailCheckIconHandle } from "./icons/mail";
import { MapPinIcon, MapPinIconHandle } from "./icons/map-pin";

export default function AboutMeCard() {
  const MailCheckIconRef = useRef<MailCheckIconHandle>(null);
  const MapPinIconRef = useRef<MapPinIconHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border max-w-lg rounded-xl transition-all duration-300 ease-in-out ${isHovered ? "border-2 border-foreground/20 " : "border-foreground/50 scale-100"
        }  dark:shadow-foreground/10 bg-background dark:shadow-md `}>
      <CardHeader>
        <CardTitle className="text-xl md:text-3xl font-bold dark:text-foreground/80 tracking-wide">
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent className="-mt-6">
        <div className="my-5">
          <a
            href="mailto:tochukwunwosa28@gmail.com"
            className="group w-fit flex items-center gap-px cursor-pointer"
            onMouseEnter={() => MailCheckIconRef.current?.startAnimation()}
            onMouseLeave={() => MailCheckIconRef.current?.stopAnimation()}
          >
            <MailCheckIcon
              ref={MailCheckIconRef}
              size={20}
              className="transition-transform duration-200 group-hover:scale-105"
            />

            <span className="group-hover:underline">
              tochukwunwosa28@gmail.com
            </span>
          </a>

          <div
            className="group w-fit flex items-center gap-px cursor-pointer"
            onMouseEnter={() => MapPinIconRef.current?.startAnimation()}
            onMouseLeave={() => MapPinIconRef.current?.stopAnimation()}
          >
            <MapPinIcon
              ref={MapPinIconRef}
              size={20}
              className="transition-transform duration-200 group-hover:scale-105"
            />

            <span className="group-hover:underline">Lagos, Nigeria.</span>
          </div>
        </div>
        <p className="">
          I translate <span className="font-medium">Figma</span> and <span className="font-medium">PSD designs</span> into clean, scalable <span className="font-medium">Next.js</span> and <span className="font-medium">React</span> code; transforming concepts into <span className="font-medium">beautiful, responsive web pages</span> that drive <span className="font-medium">traffic</span> and boost <span className="font-medium">revenue</span>.
          <br />
          <br />
          Let’s build something that brings your <span className="font-medium">vision to life</span> and helps your <span className="font-medium">business grow</span>.
        </p>

      </CardContent>
    </Card>
  );
}
