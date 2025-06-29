import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import OurProductsAndServices from "@/components/OurProductsAndServices";
import OurMission from "@/components/OurMission";
import ResearchReport from "@/components/ResearchReport";
import OurCourses from "@/components/OurCourses";
import OurPartners from "@/components/OurPartners";
import SuccessStories from "@/components/SuccessStories";
import Testimonial from "@/components/Testimonial";
import Watchlist from "@/components/Watchlist";
import UpcomingWebinar from "@/components/UpcomingWebinar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <OurMission />
      <OurProductsAndServices />
      <Watchlist />
      <ResearchReport />
      {/* <OurCourses /> */}
      {/* <UpcomingWebinar /> */}
      <OurPartners />
      <SuccessStories />
      <Testimonial />
    </div>
  );
}
