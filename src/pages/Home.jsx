import Projects from "../components/Projects";
import Hero from "../components/Hero";
import About from "../components/About";
import Service from "../components/Service";
import HomePagdData from "../data/HomePagdData.json";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Education from "../components/Education";

export default function Home() {
  const {
    hero,
    socialBtns,
    about,
    education,
    projects,
    service,
    experience,
    contact,
  } = HomePagdData;
  return (
    <>
      <Hero data={hero} socialData={socialBtns} />
      <About data={about} />
      <Education data={education} />
      <Projects data={projects} />
      <Service data={service} />
      <Experience data={experience} />
      <Contact data={contact} socialData={socialBtns} />
    </>
  );
}
