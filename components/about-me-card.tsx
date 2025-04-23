"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailCheckIcon, MailCheckIconHandle } from "./ui/icons/mail";
import { MapPinIcon, MapPinIconHandle } from "./ui/icons/map-pin";

export default function AboutMeCard() {
  const MailCheckIconRef = useRef<MailCheckIconHandle>(null);
  const MapPinIconRef = useRef<MapPinIconHandle>(null);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border rounded-xl transition-all duration-300 ease-in-out ${isHovered ? "border-2 border-foreground/30 " : "border-background scale-100"
        }  dark:shadow-foreground/15 bg-background dark:shadow-lg `}
    >
      <Card className="border-0">
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
          <p className="lg:pr-12 ">
            Hey there! I'm a
            <span className="font-semibold"> full-stack developer</span> who
            pours
            <span className="font-semibold"> heart</span> into every
            <span className="font-semibold"> line of code</span>, turning
            <span className="font-semibold"> ideas</span> into
            <span className="font-semibold"> web experiences</span> that feel
            <span className="font-semibold"> alive</span> and
            <span className="font-semibold"> connect</span> with people. Let’s
            <span className="font-semibold"> build</span> something
            <span className="font-semibold"> meaningful</span> together!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
