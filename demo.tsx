import React from "react";
import { Component as HorizonHeroDemo } from "@/components/ui/horizon-hero-section";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import StoryScrollDemo from "@/components/story-scroll-demo";
import { ShinyButton } from "@/components/ui/shiny-button";

const DemoOne: React.FC = () => {
  return <HorizonHeroDemo />;
};

const DemoStoryScroll: React.FC = () => {
  return <StoryScrollDemo />;
};

export { DemoOne, DemoStoryScroll, FlowArt, FlowSection, ShinyButton };
export default DemoStoryScroll;

