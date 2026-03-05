import { useEffect, useRef, useState } from "react";
import adithyaImg from "../pics/team/adithya.jpeg";
import bharathImg from "../pics/team/bharath.jpeg";
import sujayImg from "../pics/team/sujay.jpeg";
import ahmedImg from "../pics/team/ahmed.jpeg";
import shravaniImg from "../pics/team/shravani.jpeg";
import bhaveshImg from "../pics/team/bhavesh.jpeg";
import achyuthImg from "../pics/team/achyuth.jpeg";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "CJ Sujay",
      role: "Club President",
      image: sujayImg,
    },
    {
      id: 2,
      name: "Ahmed Syed",
      role: "Vice President",
      image: ahmedImg,
    },
    {
      id: 3,
      name: "Achyuth Hebbar",
      role: "Tech Lead",
      image: achyuthImg,
    },
    {
      id: 4,
      name: "Adithya M",
      role: "Web Dev/Social Media Lead",
      image: adithyaImg,
    },
    {
      id: 5,
      name: "Bharath Raj",
      role: "Marketing Lead",
      image: bharathImg,
    },
    {
      id: 6,
      name: "Bhavesh Manur",
      role: "Events Coordinator",
      image: bhaveshImg,
    },
    {
      id: 7,
      name: "Shravani K",
      role: "Design Lead",
      image: shravaniImg,
    },
  ];

  const itemsPerSlide = 4;
  const maxSlides = Math.ceil(teamMembers.length / itemsPerSlide);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
      setIsTransitioning(false);
    }, 300);
  };

  const visibleMembers = teamMembers.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );

  return (
    <section id="team" ref={ref} className={`team-section ${isVisible ? "visible" : ""}`}>
      <h2 className="section-title">Our Team</h2>
      <p className="section-subtitle">Meet the leaders driving our cybersecurity community</p>

      <div className="team-carousel">
        <button className="carousel-btn carousel-btn-prev" onClick={handlePrev} title="Previous">
          &#10094;
        </button>

        <div className={`team-container ${isTransitioning ? "transitioning" : ""}`}>
          {visibleMembers.map((member, index) => (
            <div
              key={member.id}
              className={`team-card ${isVisible && !isTransitioning ? `pop-in-delay-${(index % 4) + 1}` : ""} ${
                isTransitioning ? "fade-out" : "fade-in"
              }`}
            >
              <div className="team-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn carousel-btn-next" onClick={handleNext} title="Next">
          &#10095;
        </button>
      </div>

      <div className="carousel-indicators">
        {Array.from({ length: maxSlides }).map((_, index) => (
          <div
            key={index}
            className={`indicator ${currentSlide === index ? "active" : ""}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 300);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
